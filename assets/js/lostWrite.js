import { database } from './DB.js'; // DB.js에서 Firebase 연결 정보 가져오기
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    // URL에서 postId와 edit 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid');
    const isEditMode = urlParams.get('edit') === 'true';

    if (isEditMode && postId) {
        // 수정 모드인 경우, 기존 데이터 로드
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);
            if (snapshot.exists()) {
                const post = snapshot.val();

                // 기존 데이터로 폼 채우기
                document.querySelector('.title-section input').value = post.title || '';
                document.querySelector('.detail-section textarea').value = post.details.replace(/<br>/g, '\n') || '';
            } else {
                alert('수정할 게시물을 찾을 수 없습니다.');
                window.location.href = 'lostList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 불러오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 게시물 작성 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', handleSubmit);
});

async function handleSubmit() {
    const title = document.querySelector('.title-section input').value.trim();
    const details = document.querySelector('.detail-section textarea').value.trim().replace(/\n/g, '<br>'); // 줄바꿈 적용
    const authorId = localStorage.getItem('uid'); // 사용자 ID 가져오기
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

    if (!authorId) {
        alert('로그인이 필요합니다.');
        return;
    }

    try {
        // 작성자 닉네임 가져오기
        const authorSnapshot = await get(ref(database, `UserData/${authorId}`));
        if (!authorSnapshot.exists()) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }

        const nickName = authorSnapshot.val().nickName;

        if (urlParams.get('edit') === 'true' && postId) {
            // 수정 모드인 경우, 기존 게시물 업데이트
            const postRef = ref(database, `Post/${postId}`);
            await set(postRef, {
                pid: postId,
                title,
                category: '실종',
                postStatus: '작성됨',
                details,
                authorId,
                nickName,
                date,
                image: '', // 이미지 추가 부분은 빈 값으로 설정 (추후 구현 가능)
            });

            alert('게시물이 수정되었습니다!');
            // 수정 후 해당 게시물 보기 페이지로 이동
            window.location.href = `lostPost.html?pid=${postId}`;
        } else {
            // 새 게시물 작성
            const newPostRef = push(ref(database, 'Post')); // push를 사용하여 고유 ID 생성
            const pid = newPostRef.key; // 자동 생성된 키를 pid로 사용

            const postData = {
                pid,
                title,
                category: '실종',
                postStatus: '작성됨',
                details,
                authorId,
                nickName,
                date,
                image: '', // 이미지 추가 부분은 빈 값으로 설정 (추후 구현 가능)
            };

            // 게시물 데이터 저장
            await set(newPostRef, postData);

            alert('게시물이 저장되었습니다!');
            // 게시물 작성 후 해당 게시물 보기 페이지로 이동 (pid 포함)
            window.location.href = `lostPost.html?pid=${pid}`;
        }
    } catch (error) {
        console.error("게시물을 저장하는 중 오류가 발생했습니다:", error);
        alert('게시물을 저장하는 중 오류가 발생했습니다.');
    }
}

// 번역 데이터
const translations = {
    ko: {
        'page-title': '실종 게시물 작성',
        'header-lost': '실종',
        'header-find': '발견',
        'header-protect': '임시보호',
        'header-vet': '동물병원',
        'titlePlaceholder': '제목을 입력해 주세요.',
        'photoLabel': '사진 첨부',
        'detailPlaceholder': '실종된 동물의 이름, 특징, 성별, 종, 실종 위치, 실종 시간 등을 상세하게 적어 주세요.',
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
        'page-title': 'Write Lost Post',
        'header-lost': 'Lost',
        'header-find': 'Found',
        'header-protect': 'Temporary Protection',
        'header-vet': 'Vet',
        'titlePlaceholder': 'Enter a title.',
        'photoLabel': 'Attach Photo',
        'detailPlaceholder': 'Please write detailed information about the lost animal (e.g., name, characteristics, gender, species, location, time lost, etc.)',
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

// 언어 버튼 이벤트
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

// 초기 언어 설정
updateLanguage('ko');
document.getElementById('lang-ko').classList.add('active');
