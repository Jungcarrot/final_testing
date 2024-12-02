import { database } from "./DB.js"; // Firebase 데이터베이스 객체 import
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"; // Firebase에서 제공하는 메서드들 import

document.addEventListener('DOMContentLoaded', () => {
    // 게시물 관련 변수
    const tableBody = document.querySelector('.post-table tbody'); // 게시물 테이블 tbody 요소
    const noPostsMessage = document.querySelector('.no-posts'); // 게시물이 없을 경우 보여주는 메시지
    const searchInput = document.querySelector('.search-bar input'); // 검색창의 input 요소
    const searchButton = document.querySelector('.search-bar button'); // 검색 버튼 요소

    // Firebase에서 게시물 가져오기
    const postsRef = ref(database, 'Post');
    onValue(postsRef, async (snapshot) => {
        let posts = [];
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.category === '실종') { // "실종" 카테고리의 게시물만 필터링
                posts.push({ ...post, id: childSnapshot.key }); // 게시물 데이터에 고유 ID 추가
            }
        });

        // 작성일을 기준으로 게시물을 내림차순 정렬
        posts.sort((a, b) => {
            const dateA = parseKoreanDate(a.date);
            const dateB = parseKoreanDate(b.date);
            return dateB - dateA; // 최신순으로 정렬 (내림차순)
        });

        // 작성자 정보를 비동기적으로 가져오고 posts 배열에 추가
        const userSnapshots = await Promise.all(posts.map(post => get(ref(database, `UserData/${post.authorId}`))));
        userSnapshots.forEach((snapshot, index) => {
            if (snapshot.exists()) {
                posts[index].authorNickname = snapshot.val().nickName || 'Unknown';
            } else {
                posts[index].authorNickname = 'Unknown';
            }
        });

        // 게시물 렌더링 함수
        function renderPosts(filteredPosts) {
            tableBody.innerHTML = ''; // 기존 목록 초기화
            if (filteredPosts.length === 0) {
                noPostsMessage.style.display = 'block'; // 게시물이 없을 경우 메시지 표시
            } else {
                noPostsMessage.style.display = 'none'; // 게시물이 있을 경우 메시지 숨김
                filteredPosts.forEach((post, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td> <!-- 번호 -->
                            <td><a href="findPost.html?pid=${post.id}">${post.title}</a></td> <!-- 제목 -->
                            <td>${post.authorNickname}</td> <!-- 작성자 닉네임 -->
                            <td>${post.date}</td> <!-- 작성일 -->
                        </tr>
                    `;
                    tableBody.innerHTML += row; // 게시물 테이블에 새로운 행 추가
                });
            }
        }

        // 게시물 렌더링 호출
        renderPosts(posts);

        // 검색 이벤트
        function filterPosts() {
            const query = searchInput.value.trim().toLowerCase(); // 검색어를 소문자로 변환하여 비교
            const filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(query) // 제목에 검색어가 포함된 게시물만 필터링
            );
            renderPosts(filteredPosts); // 필터링된 게시물 렌더링
        }

        searchButton.addEventListener('click', filterPosts); // 검색 버튼 클릭 시 필터링
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                filterPosts(); // Enter 키 입력 시 필터링
            }
        });
    });

    // 언어 선택과 관련된 부분
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
            'manual-title': '매뉴얼',
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
                    element.placeholder = translations[lang][key]; // 입력 필드의 placeholder 업데이트
                } else {
                    element.textContent = translations[lang][key]; // 텍스트 콘텐츠 업데이트
                }
            }
        });

        // 페이지 제목 업데이트
        document.querySelector('title').textContent = translations[lang]['page-title'];
    }

    document.querySelectorAll('.post-language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id === 'lang-ko' ? 'ko' : 'en'; // 언어 선택
            updateLanguage(lang);
            document.querySelectorAll('.post-language-selector button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    updateLanguage('ko'); // 초기 언어 설정
    document.getElementById('lang-ko').classList.add('active');

    // 작성일 파싱 함수
    function parseKoreanDate(koreanDateStr) {
        // 예: "2024. 12. 3. 오전 2:13:12"
        const regex = /(\d{4})\.\s(\d{1,2})\.\s(\d{1,2})\.\s(오전|오후)\s(\d{1,2}):(\d{2}):(\d{2})/;
        const match = koreanDateStr.match(regex);
        if (!match) return new Date(0); // 매칭되지 않으면 아주 이전 날짜로 반환하여 정렬에서 밀리게 함

        let [_, year, month, day, meridiem, hour, minute, second] = match;
        year = parseInt(year);
        month = parseInt(month) - 1; // 월은 0부터 시작 (0 = 1월)
        day = parseInt(day);
        hour = parseInt(hour);
        minute = parseInt(minute);
        second = parseInt(second);

        // 오전/오후 처리
        if (meridiem === '오후' && hour !== 12) {
            hour += 12;
        } else if (meridiem === '오전' && hour === 12) {
            hour = 0;
        }

        return new Date(year, month, day, hour, minute, second);
    }
});
