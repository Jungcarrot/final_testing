import { database } from "./DB.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
import { ref, push, set, get, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    const storage = getStorage(); // Firebase Storage 초기화
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const isEditMode = postId ? true : false;

    if (isEditMode) {
        // 수정 모드인 경우 기존 데이터 로드
        await loadPostData(postId);
    }

    document.getElementById('submit-button').addEventListener('click', async () => {
        const title = document.getElementById('post-title').value; // Post.title
        const details = document.getElementById('post-details').value; // Post.details
        const photo = document.getElementById('photo-upload').files[0]; // 첨부 이미지
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

        let imageUrl = "";

        // Firebase Storage에 사진 업로드
        if (photo) {
            try {
                const photoRef = storageRef(storage, `images/${Date.now()}_${photo.name}`);
                await uploadBytes(photoRef, photo);
                imageUrl = await getDownloadURL(photoRef);
            } catch (error) {
                console.error("이미지를 업로드하는 중 오류가 발생했습니다:", error);
                alert('이미지를 업로드하는 중 오류가 발생했습니다.');
                return;
            }
        }

        try {
            if (isEditMode) {
                // 수정 모드일 경우 기존 게시물 업데이트
                const postRef = ref(database, `Post/${postId}`);
                const updatedPostData = {
                    title,
                    details,
                    date // 수정된 작성일로 업데이트
                };
                if (imageUrl) {
                    updatedPostData.image = imageUrl; // 새로운 이미지가 업로드된 경우에만 업데이트
                }
                await update(postRef, updatedPostData);
                alert('게시물이 수정되었습니다!');
            } else {
                // 작성자 닉네임 가져오기
                const userRef = ref(database, `UserData/${authorId}`); // UserData 테이블 참조
                const userSnapshot = await get(userRef);
                if (userSnapshot.exists()) {
                    const { nickName } = userSnapshot.val(); // UserData.nickName 사용

                    // 게시물 데이터 객체 생성
                    const postData = {
                        title, // Post.title
                        category: "발견", // 카테고리 설정 (발견 게시물)
                        postStatus: "active", // 상태 설정 (임시로 "active" 설정)
                        image: imageUrl, // Firebase Storage에 저장된 이미지의 URL
                        details, // Post.details
                        authorId, // 작성자 ID (UserData.uid)
                        authorNickname: nickName, // 작성자 닉네임 (UserData.nickName)
                        date // 작성일 저장
                    };

                    // 게시물 데이터 저장
                    const newPostRef = push(ref(database, 'Post')); // Post 테이블에 데이터 추가
                    await set(newPostRef, postData);
                    alert('게시물이 저장되었습니다!');
                } else {
                    alert('사용자 정보를 찾을 수 없습니다.');
                    return;
                }
            }

            window.location.href = 'findList.html'; // 게시물 목록으로 이동
        } catch (error) {
            console.error("게시물 작성 중 오류 발생:", error);
            alert('게시물 작성 또는 수정 중 오류가 발생했습니다.');
        }
    });

    // 기존 게시물 데이터를 로드하는 함수
    async function loadPostData(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                // 제목, 상세 내용, 이미지를 기존 데이터로 설정
                document.querySelector('#post-title').value = post.title || '';
                document.querySelector('#post-details').value = post.details || '';

                // 이미지는 직접적으로 보여줄 수 없으므로 이미 업로드된 파일 이름을 표시하거나 이를 참조하도록 메시지 제공
                if (post.image) {
                    const photoLabel = document.querySelector('.photo-section label');
                    photoLabel.textContent = `기존 이미지: ${post.image} (이미지 변경 시 파일을 선택해주세요.)`;
                }
            } else {
                alert('해당 게시물을 불러오는 중 오류가 발생했습니다.');
                window.location.href = 'findList.html';
            }
        } catch (error) {
            console.error('기존 게시물을 불러오는 중 오류 발생:', error);
            alert('기존 게시물을 불러오는 중 오류가 발생했습니다.');
        }
    }

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
