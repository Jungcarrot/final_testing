import { database } from "./DB.js";
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
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

    // 댓글 작성 처리 함수 추가
    async function addComment() {
        const commentInput = document.getElementById('comment-input');
        const commentContent = commentInput.value.trim();

        if (!commentContent) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        const commenterId = localStorage.getItem('uid');
        const commenterNickname = localStorage.getItem('nickName') || '익명';

        if (!commenterId) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }

        try {
            const newCommentRef = push(ref(database, 'Comment'));
            const newComment = {
                pid: postId, // postID 대신 pid로 수정
                commenter: commenterId,
                commenterNickname,
                comment: commentContent,
                time: new Date().toLocaleString(),
            };

            await set(newCommentRef, newComment);
            commentInput.value = ''; // 입력 필드 초기화
            alert('댓글이 작성되었습니다.');
            await fetchComments(postId); // 댓글 목록 업데이트
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);
            alert('댓글 작성 중 오류가 발생했습니다.');
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
            }
        } catch (error) {
            console.error('댓글 신고 중 오류 발생:', error);
            alert('댓글 신고 중 오류가 발생했습니다.');
        }
    };

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
                commentsSnapshot.forEach(async (childSnapshot) => {
                    const comment = childSnapshot.val();
                    if (comment.pid === postId) {
                        const commentKey = childSnapshot.key;
                        await remove(ref(database, `Comment/${commentKey}`));
                    }
                });
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

