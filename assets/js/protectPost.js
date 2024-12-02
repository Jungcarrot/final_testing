import { database } from "./DB.js";
import { ref, get, push, set, remove, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getLoggedInUsername, checkLoginStatus } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    // URL에서 게시물 PID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid');

    if (!postId) {
        alert('게시물 PID가 존재하지 않습니다.');
        window.location.href = 'protectList.html';
        return;
    }

    const loggedUserId = localStorage.getItem('uid');

    // Firebase에서 게시물 데이터를 가져와 표시
    async function fetchPostDetails(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                // 게시물 제목 설정
                document.getElementById('post-title').textContent = post.title || '제목 없음';

                // 게시물 이미지 설정 (이미지가 있을 경우만 표시)
                const postImageElement = document.getElementById('post-image');
                if (post.image) {
                    postImageElement.src = `assets/images/${post.image}`;
                    postImageElement.style.display = 'block';
                } else {
                    postImageElement.style.display = 'none';
                }

                // 게시물 상세 내용 설정 (줄바꿈 처리를 위해 innerHTML 사용)
                document.getElementById('post-details').innerHTML = post.details ? post.details.replace(/\n/g, '<br>') : '내용이 없습니다.';

                // 작성자 정보 추가
                if (post.authorId) {
                    const authorRef = ref(database, `UserData/${post.authorId}`);
                    const authorSnapshot = await get(authorRef);
                    if (authorSnapshot.exists()) {
                        document.getElementById('post-author').textContent = authorSnapshot.val().nickName || '작성자 정보 없음';
                    } else {
                        document.getElementById('post-author').textContent = '작성자 정보 없음';
                    }
                } else {
                    document.getElementById('post-author').textContent = '작성자 정보 없음';
                }

                // 작성일 설정
                document.getElementById('post-date').textContent = post.date || '작성일 없음';

                // 게시물 작성자와 로그인한 사용자가 일치하면 수정/삭제 버튼 표시
                if (loggedUserId && post.authorId === loggedUserId) {
                    document.getElementById('edit-buttons').style.display = 'block';
                }
            } else {
                alert('해당 게시물이 존재하지 않습니다.');
                window.location.href = 'protectList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 댓글 데이터를 가져와 표시
    async function fetchComments(postId) {
        try {
            const commentsRef = ref(database, 'Comment');
            const snapshot = await get(commentsRef);
            const commentContainer = document.getElementById('comments');
            commentContainer.innerHTML = '';

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const comment = childSnapshot.val();
                    if (comment.pid === postId) {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';

                        const commenterName = comment.commenterNickname || '익명';
                        const commentContent = comment.comment || '내용 없음';
                        const isAuthor = comment.commenter === loggedUserId;

                        let commentHTML = `<strong>${commenterName}:</strong> ${commentContent}`;

                        // 신고하기 버튼 추가 (본인이 작성한 댓글이 아닌 경우에만 표시)
                        if (!isAuthor && loggedUserId) {
                            commentHTML += `<button class="report-button" onclick="reportComment('${childSnapshot.key}')">신고하기</button>`;
                        }

                        commentElement.innerHTML = commentHTML;
                        commentContainer.appendChild(commentElement);
                    }
                });
            }
        } catch (error) {
            console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
            alert('댓글 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 댓글 신고 처리 함수
    window.reportComment = async function (commentId) {
        if (!confirm('정말로 이 댓글을 신고하시겠습니까?')) {
            return;
        }

        const reportReason = prompt('신고 사유를 입력해주세요:');
        if (!reportReason) {
            alert('신고 사유를 입력하지 않았습니다.');
            return;
        }

        try {
            // 신고 데이터를 CommentReport에 저장
            const newReportRef = push(ref(database, 'CommentReport'));
            const commentRef = ref(database, `Comment/${commentId}`);
            const commentSnapshot = await get(commentRef);

            if (commentSnapshot.exists()) {
                const commentData = commentSnapshot.val();
                const reportedUserID = commentData.commenter;

                const reportData = {
                    commentID: commentId,
                    reporterID: loggedUserId,
                    reportedUserID,
                    reportReason,
                    reportDate: new Date().toLocaleString(),
                    status: 0, // 신고 상태 (0: 미처리)
                    systemAction: '', // 시스템 조치 내용 (향후 추가 가능)
                    reportCount: 1
                };

                await set(newReportRef, reportData);
                await remove(commentRef); // 신고된 댓글 삭제
                alert('댓글이 신고되었습니다.');
                await fetchComments(postId); // 댓글 목록 업데이트

                // 피신고자 제재 처리
                await penalizeReportedUser(reportedUserID);
            }
        } catch (error) {
            console.error('댓글 신고 중 오류 발생:', error);
            alert('댓글 신고 중 오류가 발생했습니다.');
        }
    };

    // 피신고자에 대한 제재 조치 함수
    async function penalizeReportedUser(reportedUserID) {
        try {
            // 피신고자의 신고 횟수를 가져오기 위해 신고 데이터 조회
            const reportsRef = ref(database, "CommentReport");
            const reportsSnapshot = await get(reportsRef);

            let reportCount = 0;

            if (reportsSnapshot.exists()) {
                reportsSnapshot.forEach((childSnapshot) => {
                    const report = childSnapshot.val();
                    if (report.reportedUserID === reportedUserID) {
                        reportCount++;
                    }
                });
            }

            // 피신고자에 대한 제재 단계 설정
            let actionMessage = "";
            let suspensionDuration = null;

            if (reportCount === 1) {
                actionMessage = "신고로 인한 경고를 받았습니다. 한 번 더 신고 당할 시 정지됩니다.";
            } else if (reportCount === 2) {
                actionMessage = "신고 2회 누적으로 인해 1개월 정지되었습니다.";
                suspensionDuration = 1; // 1개월 정지
            } else if (reportCount === 3) {
                actionMessage = "신고 3회 누적으로 인해 3개월 정지되었습니다.";
                suspensionDuration = 3; // 3개월 정지
            } else if (reportCount === 4) {
                actionMessage = "신고 4회 누적으로 인해 6개월 정지되었습니다.";
                suspensionDuration = 6; // 6개월 정지
            } else if (reportCount >= 5) {
                actionMessage = "신고 5회 누적으로 인해 영구 정지되었습니다.";
                suspensionDuration = "permanent"; // 영구 정지
            }

            // 제재 조치 업데이트
            if (actionMessage) {
                // 관리자 채팅으로 경고 메시지 전송
                const newMessageRef = push(ref(database, "Message"));
                const adminChatID = "admin_chat"; // 관리자 채팅 ID
                const messageContent = {
                    chatID: adminChatID,
                    senderID: "admin", // 관리자 ID
                    receiverID: reportedUserID,
                    messageContent: actionMessage,
                    timeStamp: new Date().toISOString(),
                };
                await set(newMessageRef, messageContent);
            }

            if (suspensionDuration) {
                // 피신고자에 대한 정지 조치 업데이트
                const userRef = ref(database, `UserData/${reportedUserID}`);
                const updateData = {};

                if (suspensionDuration === "permanent") {
                    updateData.accountStatus = "suspended_permanently";
                } else {
                    const currentDate = new Date();
                    currentDate.setMonth(currentDate.getMonth() + suspensionDuration);
                    updateData.suspensionEndDate = currentDate.toISOString(); // 정지 종료일 설정
                    updateData.accountStatus = "suspended";
                }

                await update(userRef, updateData);
            }

        } catch (error) {
            console.error("피신고자 제재 처리 중 오류 발생:", error);
        }
    }

    // 게시물 삭제 처리 함수
    async function deletePost() {
        if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            return;
        }

        try {
            // 게시물에 달린 모든 댓글 삭제
            const commentsRef = ref(database, 'Comment');
            const commentsSnapshot = await get(commentsRef);
            if (commentsSnapshot.exists()) {
                const deletePromises = []; // 모든 댓글 삭제 요청을 저장할 배열
                commentsSnapshot.forEach((childSnapshot) => {
                    const comment = childSnapshot.val();
                    if (comment.pid === postId) {
                        const commentKey = childSnapshot.key;
                        deletePromises.push(remove(ref(database, `Comment/${commentKey}`)));
                    }
                });
                // 모든 댓글 삭제가 완료될 때까지 대기
                await Promise.all(deletePromises);
            }

            // 게시물 삭제
            const postRef = ref(database, `Post/${postId}`);
            await remove(postRef);

            alert('게시물이 삭제되었습니다.');
            window.location.href = 'protectList.html';
        } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    }

    // 게시물 수정 처리 함수 (새로운 폼으로 이동시키기)
    function editPost() {
        window.location.href = `protectWrite.html?pid=${postId}&edit=true`;
    }

    // 댓글 작성 버튼 클릭 이벤트 추가
    document.getElementById('add-comment').addEventListener('click', addComment);

    // 수정/삭제 버튼 클릭 이벤트 추가
    document.getElementById('edit-post').addEventListener('click', editPost);
    document.getElementById('delete-post').addEventListener('click', deletePost);

    // 초기 게시물 및 댓글 로드
    await fetchPostDetails(postId);
    await fetchComments(postId);

    // 언어 설정 및 번역
    const translations = {
        ko: {
            'page-title': '임시보호 게시물 보기',
            'comment-section-title': '댓글',
            'add-comment-button': '댓글 작성 완료',
            'edit-post-button': '수정',
            'delete-post-button': '삭제',
            'report-button': '신고하기',
            'login': '로그인',
            'signup': '회원가입',
            'mypage': '마이페이지',
            'logout': '로그아웃',
            'chat-list-title': '채팅 목록',
            'chat-room-title': '채팅방',
            'chat-send-button': '전송',
        },
        en: {
            'page-title': 'View Temporary Protection Post',
            'comment-section-title': 'Comments',
            'add-comment-button': 'Add Comment',
            'edit-post-button': 'Edit',
            'delete-post-button': 'Delete',
            'report-button': 'Report',
            'login': 'Login',
            'signup': 'Sign Up',
            'mypage': 'My Page',
            'logout': 'Logout',
            'chat-list-title': 'Chat List',
            'chat-room-title': 'Chat Room',
            'chat-send-button': 'Send',
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // 페이지 제목 번역
        document.querySelector('title').textContent = translations[lang]['page-title'];

        // 신고 버튼 번역
        document.querySelectorAll('.report-button').forEach(button => {
            button.textContent = translations[lang]['report-button'];
        });
    }

    document.querySelectorAll('.post-language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id === 'lang-ko' ? 'ko' : 'en';
            updateLanguage(lang);
            document.querySelectorAll('.post-language-selector button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // 초기 언어 설정
    updateLanguage('ko');
    document.getElementById('lang-ko').classList.add('active');
});
