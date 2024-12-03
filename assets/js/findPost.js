import { database } from "./DB.js";
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    // URL에서 게시물 PID 가져오기 (한 번만 가져옴)
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid');
    
    if (!postId) {
        alert('게시물 PID가 존재하지 않습니다.');
        window.location.href = 'findList.html';
        return;
    }

    const loggedUserId = localStorage.getItem('uid'); // 로그인한 사용자 ID 가져오기

    // Firebase에서 게시물 데이터를 가져와 표시
    async function fetchPostDetails() {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                // 게시물 제목, 이미지, 내용 설정
                document.getElementById('post-title').textContent = post.title || '제목 없음';
                const postImageElement = document.getElementById('post-image');
                postImageElement.style.display = post.image ? 'block' : 'none';
                postImageElement.src = post.image ? `assets/images/${post.image}` : '';
                document.getElementById('post-details').innerHTML = (post.details || '내용이 없습니다.').replace(/\n/g, '<br>');

                // 작성자 정보 추가
                if (post.authorId) {
                    const authorSnapshot = await get(ref(database, `UserData/${post.authorId}`));
                    document.getElementById('post-author').textContent = authorSnapshot.exists() ? authorSnapshot.val().nickName : '작성자 정보 없음';
                } else {
                    document.getElementById('post-author').textContent = '작성자 정보 없음';
                }

                // 작성일 설정
                document.getElementById('post-date').textContent = post.date || '작성일 없음';

                // 수정/삭제 버튼 표시
                if (loggedUserId && post.authorId === loggedUserId) {
                    document.getElementById('edit-buttons').style.display = 'block';
                }
            } else {
                alert('해당 게시물이 존재하지 않습니다.');
                window.location.href = 'findList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    async function fetchComments() {
    try {
        const commentsRef = ref(database, 'Comment');
        const snapshot = await get(commentsRef);
        const commentContainer = document.getElementById('comments');
        commentContainer.innerHTML = '';

        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const comment = childSnapshot.val();
                if (comment.postID === postId) {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment';

                    const commenterName = comment.commenterNickname || '익명';
                    const commentContent = comment.comment.replace(/\n/g, '<br>') || '내용 없음';
                    const isOwnComment = loggedUserId === comment.commenter;
                    const commentHTML = `<strong>${commenterName}:</strong> ${commentContent}`;

                    // 신고 버튼 추가 (자신의 댓글에는 버튼을 표시하지 않음)
                    if (!isOwnComment) {
                        const reportButton = document.createElement('button');
                        reportButton.textContent = '신고하기';
                        reportButton.className = 'report-button';
                        reportButton.addEventListener('click', async () => {
                            try {
                                const reason = prompt('신고 사유를 입력해주세요:');
                                if (reason) {
                                    await handleReport(childSnapshot.key, reason);  // 신고 처리
                                }
                            } catch (error) {
                                console.error('신고 처리 중 오류 발생:', error);
                                alert('신고 처리 중 오류가 발생했습니다.');
                            }
                        });
                        commentElement.innerHTML = commentHTML;
                        commentElement.appendChild(reportButton);
                    } else {
                        commentElement.innerHTML = commentHTML;
                    }

                    commentContainer.appendChild(commentElement);
                }
            });
        }
    } catch (error) {
        console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
        alert('댓글 데이터를 불러오는 중 오류가 발생했습니다.');
    }
}


    // 신고 처리 함수
    async function handleReport(commentId, reason) {
        try {
            const reportRef = ref(database, `ReportedComments/${commentId}`);
            await set(reportRef, { reported: true, reason, time: new Date().toLocaleString() });

            await remove(ref(database, `Comment/${commentId}`));

            alert('댓글이 신고되어 삭제되었습니다.');
            await fetchComments(); // 댓글 목록 업데이트
        } catch (error) {
            console.error('댓글 신고 중 오류 발생:', error);
            alert('댓글 신고 중 오류가 발생했습니다.');
        }
    }

    // 댓글 작성 처리 함수
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
            await set(newCommentRef, {
                postID: postId,
                commenter: commenterId,
                commenterNickname,
                comment: commentContent,
                time: new Date().toLocaleString(),
            });

            commentInput.value = ''; // 입력 필드 초기화
            alert('댓글이 작성되었습니다.');
            await fetchComments(); // 댓글 목록 업데이트
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);
            alert('댓글 작성 중 오류가 발생했습니다.');
        }
    }

    // 게시물 삭제 및 수정 처리 함수
    async function deletePost() {
        if (confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            try {
                await remove(ref(database, `Post/${postId}`));
                alert('게시물이 삭제되었습니다.');
                window.location.href = 'findList.html';
            } catch (error) {
                console.error('게시물 삭제 중 오류 발생:', error);
                alert('게시물 삭제 중 오류가 발생했습니다.');
            }
        }
    }

    function editPost() {
        window.location.href = `findWrite.html?pid=${postId}&edit=true`;
    }

    // 초기 게시물 및 댓글 로드
    await fetchPostDetails();
    await fetchComments();

    // 댓글 작성 버튼 클릭 이벤트 추가
    document.getElementById('add-comment').addEventListener('click', addComment);
    document.getElementById('edit-post').addEventListener('click', editPost);
    document.getElementById('delete-post').addEventListener('click', deletePost);

    // 언어 설정 및 번역 (불필요한 부분은 생략)
    function updateLanguage(lang) {
        const translations = {
            ko: {
                'page-title': '발견 게시물 보기',
                'comment-section-title': '댓글',
                'add-comment-button': '댓글 작성 완료',
                'edit-post-button': '수정',
                'delete-post-button': '삭제',
            },
            en: {
                'page-title': 'View Found Post',
                'comment-section-title': 'Comments',
                'add-comment-button': 'Add Comment',
                'edit-post-button': 'Edit',
                'delete-post-button': 'Delete',
            }
        };

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        document.querySelector('title').textContent = translations[lang]['page-title'];
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
