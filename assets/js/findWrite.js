import { database } from "./DB.js";
import { ref, push, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    // 게시물 작성 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', () => {
        const title = document.querySelector('.title-section input').value; // Post.title
        const details = document.querySelector('.detail-section textarea').value; // Post.details
        const photo = document.querySelector('.photo-section input[type="file"]').files[0];
        const authorId = localStorage.getItem('uid'); // UserData.uid로 사용자 ID 가져오기
        const date = new Date().toLocaleString(); // 작성일

        if (!title) {
            alert('제목을 입력해주세요!');
            return;
        }

        if (!details) {
            alert('상세 내용을 입력해주세요!');
            return;
        }

        if (!authorId) {
            alert('로그인된 사용자 정보가 없습니다. 다시 로그인 해주세요.');
            return;
        }

        // 작성자 닉네임 가져오기
        const userRef = ref(database, `UserData/${authorId}`); // UserData 테이블 참조
        get(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
                const { nickName } = userSnapshot.val(); // UserData.nickName 사용

                // postData에서 'author'를 'nickName'으로 수정
                const postData = {
                    title, // Post.title
                    details, // Post.details
                    photo: photo?.name || '', // 첨부된 파일 이름
                    authorId, // 작성자 ID 저장 (UserData.uid)
                    authorNickname: nickName, // UserData.nickName
                    date // 작성일 저장
                };

                // 게시물 데이터 저장
                const newPostRef = push(ref(database, 'Post')); // Post 테이블에 데이터 추가
                set(newPostRef, postData).then(() => {
                    alert('게시물이 저장되었습니다!');
                    window.location.href = 'findList.html'; // 게시물 목록으로 이동
                }).catch((error) => {
                    console.error("게시물을 저장하는 중 오류가 발생했습니다:", error);
                    alert('게시물을 저장하는 중 오류가 발생했습니다.');
                });
            } else {
                alert('사용자 정보를 찾을 수 없습니다.');
            }
        }).catch((error) => {
            console.error("사용자 정보를 불러오는 중 오류가 발생했습니다:", error);
            alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        });
    });

    // 번역 데이터
    const translations = {
        ko: {
            'page-title': '발견 게시물 작성',
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'titlePlaceholder': '제목을 입력해 주세요.',
            'photoLabel': '사진 첨부',
            'detailPlaceholder': '발견한 동물의 이름, 특징, 성별, 종, 발견 위치, 발견 시간 등을 상세하게 적어 주세요.',
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
            'page-title': 'Write Found Post',
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Vet',
            'titlePlaceholder': 'Enter a title.',
            'photoLabel': 'Attach Photo',
            'detailPlaceholder': 'Please write detailed information about the found animal (e.g., name, characteristics, gender, species, location, time found, etc.)',
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
});
