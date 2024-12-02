import { database } from "./DB.js";
import { ref, set, get, update, push } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    let isEditing = false;

    if (postId) {
        isEditing = true;
        await loadExistingPost(postId);
    }

    // 게시물 작성 또는 수정 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', async () => {
        const title = document.getElementById('post-title').value; // Post.title
        const details = document.getElementById('post-details').value; // Post.details
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
        const userSnapshot = await get(userRef);
        if (!userSnapshot.exists()) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }

        const { nickName } = userSnapshot.val(); // UserData.nickName 사용

        // 게시물 데이터 객체 생성
        const postData = {
            title, // Post.title
            category: "발견", // 카테고리 설정 (발견 게시물)
            postStatus: "active", // 상태 설정 (임시로 "active" 설정)
            details, // Post.details
            authorId, // 작성자 ID (UserData.uid)
            authorNickname: nickName, // 작성자 닉네임 (UserData.nickName)
            date // 작성일 저장
        };

        try {
            if (isEditing) {
                // 기존 게시물 수정
                const postRef = ref(database, `Post/${postId}`);
                await update(postRef, postData);
                alert('게시물이 수정되었습니다!');
            } else {
                // 새 게시물 작성
                const newPostRef = push(ref(database, 'Post')); // Post 테이블에 데이터 추가
                await set(newPostRef, { pid: newPostRef.key, ...postData }); // `pid`로 고유값 저장
                alert('게시물이 저장되었습니다!');
            }
            window.location.href = 'findList.html'; // 게시물 목록으로 이동
        } catch (error) {
            console.error("게시물을 저장하는 중 오류가 발생했습니다:", error);
            alert('게시물을 저장하는 중 오류가 발생했습니다.');
        }
    });

    // 기존 게시물 불러오기
    async function loadExistingPost(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                // 기존 게시물 데이터를 입력 필드에 채워넣기
                document.getElementById('post-title').value = post.title || '';
                document.getElementById('post-details').value = post.details || '';

                // 버튼 텍스트를 수정으로 변경
                document.getElementById('submit-button').textContent = '수정 완료';
            } else {
                alert('해당 게시물을 찾을 수 없습니다.');
                window.location.href = 'findList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 불러오는 중 오류가 발생했습니다:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 언어 변경 및 번역 데이터
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
            'submitButton': isEditing ? '수정 완료' : '작성 완료',
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
            'submitButton': isEditing ? 'Update' : 'Submit',
        }
    };

    // 언어 변경 함수 (기존 코드 유지)
    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelector('title').textContent = translations[lang]['page-title'];
        document.getElementById('post-title').placeholder = translations[lang]['titlePlaceholder'];
        document.querySelector('.photo-section label').textContent = translations[lang]['photoLabel'];
        document.getElementById('post-details').placeholder = translations[lang]['detailPlaceholder'];
        document.getElementById('submit-button').textContent = translations[lang]['submitButton'];
    }

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

    updateLanguage('ko');
    document.getElementById('lang-ko').classList.add('active');
});
