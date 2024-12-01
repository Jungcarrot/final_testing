document.addEventListener('DOMContentLoaded', () => {
    const posts = JSON.parse(localStorage.getItem('lostPosts')) || [];
    const tableBody = document.querySelector('.post-table tbody');
    const noPostsMessage = document.querySelector('.no-posts');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const manualContent = document.querySelector('.manual p');

    function renderPosts(filteredPosts) {
        tableBody.innerHTML = ''; // 기존 목록 초기화
        if (filteredPosts.length === 0) {
            noPostsMessage.style.display = 'block';
        } else {
            noPostsMessage.style.display = 'none';
            filteredPosts.forEach((post, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td><a href="lostPost.html?id=${posts.indexOf(post)}">${post.title}</a></td>
                        <td>${post.author}</td>
                        <td>${post.date}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }

    // 초기 렌더링
    renderPosts(posts);

    // 검색 이벤트
    function filterPosts() {
        const query = searchInput.value.trim().toLowerCase();
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(query)
        );
        renderPosts(filteredPosts);
    }

    searchButton.addEventListener('click', filterPosts);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterPosts();
        }
    });

    const translations = {
        ko: {
            'page-title': '실종 게시물',
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'post-create-button': '게시글 작성',
            'search-placeholder': '게시물을 검색하세요...',
            'search-icon-alt': '돋보기',
            'table-header-number': '번호',
            'table-header-title': '제목',
            'table-header-author': '작성자',
            'table-header-date': '작성일',
            'no-posts-message': '작성된 게시물이 없습니다.',
            'login': '로그인',
            'signup': '회원가입',
            'manual-title': 'MANUAL',
            'manual-item1': '매뉴얼 내용',
            'chat-list-title': '채팅 목록',
            'mypage': '마이페이지',
            'logout': '로그아웃',
            'manual-title': '매뉴얼',
            'manual-item1': '발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.',
            'manual-item2': '주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.',
            'manual-item3': '이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.',
            'manual-item4': '여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!'
        },
        en: {
            'page-title': 'Lost Posts',
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Vet',
            'post-create-button': 'Create Post',
            'search-placeholder': 'Search for posts...',
            'search-icon-alt': 'Magnifier',
            'table-header-number': 'No.',
            'table-header-title': 'Title',
            'table-header-author': 'Author',
            'table-header-date': 'Date',
            'no-posts-message': 'No posts available.',
            'login': 'Login',
            'signup': 'Sign Up',
            'manual-title': 'MANUAL',
            'manual-item1': 'Manual Content',
            'chat-list-title': 'Chat List',
            'mypage': 'My Page',
            'logout': 'Logout',
            'manual-title': 'MANUAL',
            'manual-item1': 'Footprint Detective is a board-based website where users can share and manage information about lost and found animals, mainly in Daegu.',
            'manual-item2': 'Its primary purpose is to help find lost animals, protect found animals, share veterinary information, and manage temporarily sheltered animals.',
            'manual-item3': 'The site is composed of four main boards: Lost, Found, Vet, and Temporary Shelter.',
            'manual-item4': 'Feel free to write posts about your questions regarding Footprint and share information with other users!'
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
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

    updateLanguage('ko');
});
