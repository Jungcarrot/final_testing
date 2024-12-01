document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pid = parseInt(urlParams.get('id'), 10);
    const posts = JSON.parse(localStorage.getItem('lostPosts')) || [];
    const post = posts[pid];

    if (!post) {
        alert('게시물을 찾을 수 없습니다.');
        window.location.href = 'lostList.html';
        return;
    }

    // 언어 변경 함수
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[lang][key] || el.textContent;
        });

        // 신고하기 버튼 번역
        document.querySelectorAll('.report-button').forEach(button => {
            button.textContent = translations[lang]['report-button'];
        });

        // 버튼 상태 업데이트
        document.getElementById('lang-ko').classList.toggle('active', lang === 'ko');
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    }

    // 언어 버튼 이벤트 리스너 추가
    document.getElementById('lang-ko').addEventListener('click', () => changeLanguage('ko'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));

    // 초기화
    changeLanguage('ko'); // 기본 언어 설정

    // 게시물 데이터 로드
    document.getElementById('post-title').textContent = post.title || '제목이 없습니다.';
    document.getElementById('post-image').src = post.image || 'assets/img/default-image.png';
    document.getElementById('post-details').textContent = post.details || '상세 내용이 없습니다.';

    // 댓글 섹션 처리
    const comments = post.comments || [];
    const commentContainer = document.getElementById('comments');
    const commentInput = document.getElementById('comment-input');

    function renderComments() {
        commentContainer.innerHTML = '';
        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-item');
            commentDiv.innerHTML = `
                <strong>${comment.author}</strong>: ${comment.text}
                <button class="report-button" data-index="${index}" data-translate="report-button">${translations['ko']['report-button']}</button>
            `;
            commentContainer.appendChild(commentDiv);
        });

        // 신고하기 버튼 이벤트 추가
        document.querySelectorAll('.report-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const commentIndex = event.target.dataset.index;
                alert(`댓글 "${comments[commentIndex].text}"을(를) 신고했습니다.`);
            });
        });
    }

    document.getElementById('add-comment').addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        const nickName = localStorage.getItem('loggedInUser') || '익명'; // 로그인된 사용자 이름 가져오기
        if (commentText) {
            comments.push({ text: commentText, nickName });
            post.comments = comments; // 게시물에 댓글 저장
            localStorage.setItem('lostPosts', JSON.stringify(posts)); // 로컬 스토리지 업데이트
            renderComments();
            commentInput.value = '';
        }
    });

    renderComments();
});
