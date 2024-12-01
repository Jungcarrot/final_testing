import { database } from "./DB.js";
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    // 게시물 테이블 관련 요소
    const tableBody = document.querySelector('.post-table tbody');
    const noPostsMessage = document.querySelector('.no-posts');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // 게시물 데이터를 Firebase에서 불러오기
    async function fetchPosts() {
        try {
            const postsRef = ref(database, 'Post');
            const snapshot = await get(postsRef);

            if (snapshot.exists()) {
                const posts = [];
                snapshot.forEach(childSnapshot => {
                    const post = childSnapshot.val();
                    if (post.category === '발견') { // 특정 카테고리 필터링 (발견 게시물)
                        posts.push({
                            ...post,
                            id: childSnapshot.key // 게시물의 고유 ID 추가
                        });
                    }
                });

                renderPosts(posts);
                return posts;
            } else {
                noPostsMessage.style.display = 'block';
                return [];
            }
        } catch (error) {
            console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
            return [];
        }
    }

    // 게시물 렌더링 함수
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
                        <td><a href="findPost.html?id=${post.id}">${post.title}</a></td>
                        <td>${post.author || '알 수 없음'}</td>
                        <td>${post.date || '날짜 없음'}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }

    // 검색 이벤트 처리
    function filterPosts(posts) {
        const query = searchInput.value.trim().toLowerCase();
        const filteredPosts = posts.filter(post =>
            post.title && post.title.toLowerCase().includes(query)
        );
        renderPosts(filteredPosts);
    }

    // 검색 버튼 클릭 및 입력 필드에서 Enter 키 이벤트 처리
    searchButton.addEventListener('click', async () => {
        const posts = await fetchPosts();
        filterPosts(posts);
    });

    searchInput.addEventListener('keyup', async (event) => {
        if (event.key === 'Enter') {
            const posts = await fetchPosts();
            filterPosts(posts);
        }
    });

    // 초기 게시물 로드
    const posts = await fetchPosts();

    // 언어 설정 및 번역
    const translations = {
        ko: {
            'page-title': '발견 게시물',
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
            'manual-item1': '발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.',
            'manual-item2': '주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.',
            'manual-item3': '이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.',
            'manual-item4': '여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!'
        },
        en: {
            'page-title': 'Found Posts',
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
    document.getElementById('lang-ko').classList.add('active');
});

