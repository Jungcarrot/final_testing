import { database } from './DB.js';
import { ref, push, set, get } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    // 게시물 작성 버튼 클릭 이벤트
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', handleSubmit);

    // 초기 언어 설정 및 번역 처리
    updateLanguage('ko');
    document.getElementById('lang-ko').classList.add('active');

    // 언어 변경 이벤트 리스너 설정
    document.getElementById('lang-ko').addEventListener('click', () => {
        updateLanguage('ko');
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
    });
    document.getElementById('lang-en').addEventListener('click', () => {
        updateLanguage('en');
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
    });
});

// 게시물 작성 처리 함수
async function handleSubmit() {
    const title = document.querySelector('.title-section input').value.trim();
    const details = document.querySelector('.detail-section textarea').value.trim();
    const uid = localStorage.getItem('uid'); // 작성자 ID 가져오기
    const date = new Date().toLocaleString(); // 작성일

    // 데이터 검증
    if (!title) {
        alert('제목을 입력해주세요!');
        return;
    }
    if (!details) {
        alert('상세 내용을 입력해주세요!');
        return;
    }
    if (!uid) {
        alert('로그인 후 게시물을 작성할 수 있습니다.');
        return;
    }

    try {
        // 작성자 닉네임 가져오기
        const authorSnapshot = await get(ref(database, `UserData/${uid}`));
        if (!authorSnapshot.exists()) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }
        const nickName = authorSnapshot.val().nickName;

        // Firebase에 게시물 데이터 저장
        const newPostRef = push(ref(database, 'Post')); // push를 사용하여 고유 ID 생성
        const pid = newPostRef.key; // 고유 ID를 pid로 사용
        const postData = {
            pid,
            title,
            details,
            category: '임시보호',
            postStatus: '작성됨',
            authorId: uid,
            nickName,
            date,
            image: '' // 이미지 부분은 향후 구현 가능
        };

        await set(newPostRef, postData);

        alert('게시물이 저장되었습니다!');
        // 게시물 작성 후 해당 게시물 보기 페이지로 이동 (pid 포함)
        window.location.href = `protectPost.html?pid=${pid}`;
    } catch (error) {
        console.error('게시물 저장 중 오류 발생:', error);
        alert('게시물 저장 중 오류가 발생했습니다.');
    }
}

// 언어 번역 데이터
const translations = {
    ko: {
        'page-title': '임시보호 게시물 작성',
        'header-lost': '실종',
        'header-find': '발견',
        'header-protect': '임시보호',
        'header-vet': '동물병원',
        'titlePlaceholder': '제목을 입력해 주세요.',
        'photoLabel': '사진 첨부',
        'detailPlaceholder': '임시보호 중인 특징, 성별, 종 등을 상세하게 적어 주세요.',
        'submitButton': '작성 완료',
        'login': '로그인',
        'signup': '회원가입',
        'mypage': '마이페이지',
        'logout': '로그아웃',
        'chat-list-title': '채팅 목록',
        'chat-room-title': '채팅방',
        'chat-send-button': '전송',
    },
    en: {
        'page-title': 'Write Temporary Protection Post',
        'header-lost': 'Lost',
        'header-find': 'Found',
        'header-protect': 'Temporary Protection',
        'header-vet': 'Vet',
        'titlePlaceholder': 'Enter a title.',
        'photoLabel': 'Attach Photo',
        'detailPlaceholder': 'Please write detailed information about the temporary protected animal (e.g., characteristics, gender, species, etc.)',
        'submitButton': 'Submit',
        'login': 'Login',
        'signup': 'Sign Up',
        'mypage': 'My Page',
        'logout': 'Logout',
        'chat-list-title': 'Chat List',
        'chat-room-title': 'Chat Room',
        'chat-send-button': 'Send',
    }
};

// 언어 변경 함수
function updateLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 페이지 제목 번역
    document.querySelector('title').textContent = translations[lang]['page-title'];

    // 입력 필드와 버튼 번역
    document.querySelector('.title-section input').placeholder = translations[lang]['titlePlaceholder'];
    document.querySelector('.photo-section label').textContent = translations[lang]['photoLabel'];
    document.querySelector('.detail-section textarea').placeholder = translations[lang]['detailPlaceholder'];
    document.getElementById('submit-button').textContent = translations[lang]['submitButton'];
}
