import { ref, get, onValue, push, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { database } from "./DB.js";

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pid = parseInt(urlParams.get('id'), 10);

    if (isNaN(pid)) {
        alert('게시물을 찾을 수 없습니다.');
        window.location.href = 'lostList.html';
        return;
    }

    // 게시물 가져오기
    const postRef = ref(database, `Post/${pid}`);
    get(postRef).then(async (snapshot) => {
        if (!snapshot.exists()) {
            alert('게시물이 존재하지 않습니다.');
            window.location.href = 'lostList.html';
            return;
        }

        const post = snapshot.val();
        document.getElementById('post-title').textContent = post.title || '제목이 없습니다.';
        document.getElementById('post-image').src = post.image || 'assets/img/default-image.png';
        document.getElementById('post-details').textContent = post.details || '상세 내용이 없습니다.';

        const authorSnapshot = await get(ref(database, `UserData/${post.authorId}`));
        const authorNickName = authorSnapshot.exists() ? authorSnapshot.val().nickName : '알 수 없음';
        document.getElementById('post-author').textContent = authorNickName;

        // 댓글 가져오기
        const commentsRef = ref(database, `Comment`);
        onValue(commentsRef, async (commentsSnapshot) => {
            const comments = [];
            const userPromises = [];

            commentsSnapshot.forEach((childSnapshot) => {
                const comment = childSnapshot.val();
                if (comment.postId === pid) {
                    comments.push(comment);
                    userPromises.push(get(ref(database, `UserData/${comment.commenter}`))); // 댓글 작성자 정보 가져오기
                }
            });

            const userSnapshots = await Promise.all(userPromises);
            const commentContainer = document.getElementById('comments');
            commentContainer.innerHTML = '';

            comments.forEach((commentObj, index) => {
                const userSnapshot = userSnapshots[index];
                const nickName = userSnapshot.exists() ? userSnapshot.val().nickName : '알 수 없음';
                const { comment } = commentObj;

                // 댓글 요소 추가
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment-item');
                commentElement.innerHTML = `
                    <strong>${nickName}</strong>: ${comment}
                    <button class="report-button" data-index="${index}" data-translate="report-button">${translations['ko']['report-button']}</button>
                `;
                commentContainer.appendChild(commentElement);
            });

            // 신고 버튼 이벤트 추가
            document.querySelectorAll('.report-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const commentIndex = event.target.dataset.index;
                    alert(`댓글 "${comments[commentIndex].comment}"을(를) 신고했습니다.`);
                });
            });
        });
    }).catch((error) => {
        console.error("Error fetching post data: ", error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    });

    // 댓글 작성 처리
    const commentInput = document.getElementById('comment-input');
    document.getElementById('add-comment').addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        const commenterId = localStorage.getItem('uid');
        const nickName = localStorage.getItem('nickName') || '익명'; // 로그인된 사용자 이름 가져오기

        if (!commenterId) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }

        if (commentText) {
            const newCommentRef = push(ref(database, 'Comment'));
            set(newCommentRef, {
                postId: pid,
                commenter: commenterId,
                comment: commentText,
                time: new Date().toLocaleString(),
            }).then(() => {
                commentInput.value = ''; // 입력 필드 초기화
                alert('댓글이 작성되었습니다.');
            }).catch((error) => {
                console.error('댓글 작성 중 오류 발생:', error);
                alert('댓글 작성 중 오류가 발생했습니다.');
            });
        }
    });

    // 언어 설정 관련 코드
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[lang][key] || el.textContent;
        });

        document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    }

    document.getElementById('lang-ko').addEventListener('click', () => changeLanguage('ko'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));

    changeLanguage('ko'); // 기본 언어 설정

    // 언어 번역 데이터
    const translations = {
        ko: {
            'page-title': '실종 게시물 보기',
            'report-button': '신고하기',
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
            'page-title': 'View Lost Post',
            'report-button': 'Report',
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
});

