import { database } from "./DB.js";
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getLoggedInUsername, checkLoginStatus } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid');

    if (!postId) {
        alert('게시물 PID가 존재하지 않습니다.');
        window.location.href = 'protectList.html';
        return;
    }

    const loggedUserId = localStorage.getItem('uid');

    async function fetchPostDetails(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                const postTitleElement = document.getElementById('post-title');
                postTitleElement.textContent = post.title || '제목 없음';

                const postImageElement = document.getElementById('post-image');
                if (post.image) {
                    postImageElement.src = `assets/images/${post.image}`;
                    postImageElement.style.display = 'block';
                } else {
                    postImageElement.style.display = 'none';
                }

                const postDetailsElement = document.getElementById('post-details');
                postDetailsElement.innerHTML = post.details ? post.details.replace(/\n/g, '<br>') : '내용이 없습니다.';

                if (post.authorId) {
                    const authorRef = ref(database, `UserData/${post.authorId}`);
                    const authorSnapshot = await get(authorRef);
                    if (authorSnapshot.exists()) {
                        const authorNickName = authorSnapshot.val().nickName;
                        const authorElement = document.getElementById('post-author');
                        authorElement.textContent = authorNickName || '작성자 정보 없음';
                    } else {
                        document.getElementById('post-author').textContent = '작성자 정보 없음';
                    }
                } else {
                    document.getElementById('post-author').textContent = '작성자 정보 없음';
                }

                const dateElement = document.getElementById('post-date');
                dateElement.textContent = post.date || '작성일 없음';

                if (loggedUserId && post.authorId === loggedUserId) {
                    const editButtons = document.getElementById('edit-buttons');
                    editButtons.style.display = 'block';
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

    async function fetchComments(postId) {
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
                        const commentContent = comment.comment || '내용 없음';
                        let commentHTML = `<strong>${commenterName}:</strong> ${commentContent}`;

                        if (loggedUserId && comment.commenter !== loggedUserId) {
                            commentHTML += `
                                <button class="report-button" onclick="reportComment('${childSnapshot.key}')">
                                    신고하기
                                </button>`;
                        }

                        commentElement.innerHTML = commentHTML;
                        commentContainer.appendChild(commentElement);
                    }
                });

                const style = document.createElement('style');
                style.textContent = `
                    .report-button {
                        background-color: red;
                        color: white;
                        border: none;
                        padding: 5px;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
            }
        } catch (error) {
            console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
            alert('댓글 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

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
                postID: postId,
                commenter: commenterId,
                commenterNickname,
                comment: commentContent,
                time: new Date().toLocaleString(),
            };

            await set(newCommentRef, newComment);
            commentInput.value = '';
            alert('댓글이 작성되었습니다.');
            await fetchComments(postId);
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);
            alert('댓글 작성 중 오류가 발생했습니다.');
        }
    }

    async function deletePost() {
        if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const postRef = ref(database, `Post/${postId}`);
            await remove(postRef);
            alert('게시물이 삭제되었습니다.');
            window.location.href = 'protectList.html';
        } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    }

    function editPost() {
        window.location.href = `protectWrite.html?pid=${postId}&edit=true`;
    }

    async function reportComment(commentId) {
        if (!confirm('정말로 이 댓글을 신고하시겠습니까?')) {
            return;
        }

        const reportReason = prompt('신고 사유를 입력해주세요:');
        if (!reportReason) {
            alert('신고 사유를 입력해주세요.');
            return;
        }

        try {
            const commentRef = ref(database, `Comment/${commentId}`);
            await remove(commentRef);

            const newReportRef = push(ref(database, 'CommentReport'));
            const reportData = {
                commentID: commentId,
                reporterID: loggedUserId,
                reportReason,
                reportDate: new Date().toLocaleString()
            };

            await set(newReportRef, reportData);
            alert('댓글이 신고되었습니다.');
            await fetchComments(postId);
        } catch (error) {
            console.error('댓글 신고 중 오류 발생:', error);
            alert('댓글 신고 중 오류가 발생했습니다.');
        }
    }

    document.getElementById('add-comment').addEventListener('click', addComment);
    document.getElementById('edit-post').addEventListener('click', editPost);
    document.getElementById('delete-post').addEventListener('click', deletePost);

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

