document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);  // URL에서 쿼리 매개변수 파싱
    const postId = parseInt(urlParams.get('id'), 10);  // id 파라미터를 숫자로 변환
    const posts = JSON.parse(localStorage.getItem('findPosts')) || [];  // 로컬 스토리지에서 게시물 목록 가져오기
    const post = posts[postId];  // 해당 id에 맞는 게시물 가져오기

    if (!post) {
        alert('게시물을 찾을 수 없습니다.');
        window.location.href = 'findList.html';  // 게시물이 없다면 목록 페이지로 리디렉션
        return;
    }

    // 번역 데이터
    const translations = {
        ko: {
            'page-title': '발견 게시물 보기',
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'comment-section-title': '댓글',
            'add-comment-button': '댓글 작성 완료',
            'edit-post-button': '수정',
            'delete-post-button': '삭제',
            'report-button': '신고하기',
            'login': '로그인',
            'signup': '회원가입',
            'manual-title': '매뉴얼',
            'manual-item-1': '매뉴얼 내용',
            'mypage': '마이페이지',
            'logout': '로그아웃',
            'chat-list-title': '채팅 목록',
            'chat-room-title': '채팅방',
            'chat-send-button': '전송',
            'manual-title': '매뉴얼',
            'manual-item1': '발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.',
            'manual-item2': '주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.',
            'manual-item3': '이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.',
            'manual-item4': '여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!'
        },

        en: {
            'page-title': 'View Found Post',
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Vet',
            'comment-section-title': 'Comments',
            'add-comment-button': 'Add Comment',
            'edit-post-button': 'Edit',
            'delete-post-button': 'Delete',
            'report-button': 'Report',
            'login': 'Login',
            'signup': 'Sign Up',
            'manual-title': 'Manual',
            'manual-item-1': 'Manual Content',
            'mypage': 'My Page',
            'logout': 'Logout',
            'chat-list-title': 'Chat List',
            'chat-room-title': 'Chat Room',
            'chat-send-button': 'Send',
            'manual-title': 'MANUAL',
            'manual-item1': 'Footprint Detective is a board-based website where users can share and manage information about lost and found animals, mainly in Daegu.',
            'manual-item2': 'Its primary purpose is to help find lost animals, protect found animals, share veterinary information, and manage temporarily sheltered animals.',
            'manual-item3': 'The site is composed of four main boards: Lost, Found, Vet, and Temporary Shelter.',
            'manual-item4': 'Feel free to write posts about your questions regarding Footprint and share information with other users!'
        }
    };

    // 언어 변경 함수
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]'); // data-translate 속성을 가진 요소들
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[lang][key] || el.textContent;  // 언어에 맞는 텍스트로 변경
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
    changeLanguage('ko');  // 기본 언어 설정

    // 게시물 데이터 로드
    document.getElementById('post-title').textContent = post.title || '제목이 없습니다.';  // 게시물 제목
    document.getElementById('post-image').src = post.image || 'assets/img/default-image.png';  // 게시물 이미지
    document.getElementById('post-details').textContent = post.details || '상세 내용이 없습니다.';  // 게시물 상세 내용

    // 댓글 섹션 처리
    const comments = post.comments || [];  // 댓글 배열
    const commentContainer = document.getElementById('comments');  // 댓글을 출력할 컨테이너
    const commentInput = document.getElementById('comment-input');  // 댓글 입력 필드

    function renderComments() {
        commentContainer.innerHTML = '';  // 기존 댓글 초기화
        comments.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-item');
            commentDiv.innerHTML = `
                <strong>${comment.author}</strong>: ${comment.text}
                <button class="report-button" data-index="${index}" data-translate="report-button">${translations['ko']['report-button']}</button>
            `;
            commentContainer.appendChild(commentDiv);  // 댓글을 컨테이너에 추가
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
        const commentText = commentInput.value.trim();  // 입력한 댓글 텍스트
        const currentUser = localStorage.getItem('loggedInUser') || '익명';  // 로그인된 사용자 이름 가져오기
        if (commentText) {
            comments.push({ text: commentText, author: currentUser });  // 댓글 추가
            post.comments = comments;  // 게시물에 댓글 저장
            localStorage.setItem('findPosts', JSON.stringify(posts));  // 로컬 스토리지 업데이트
            renderComments();  // 댓글 다시 렌더링
            commentInput.value = '';  // 댓글 입력 필드 초기화
        }
    });

    renderComments();  // 댓글 처음 렌더링
});
