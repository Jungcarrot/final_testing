import { database } from './DB.js';
import { ref, push, set } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', handleSubmit);
});

async function handleSubmit() {
    const title = document.getElementById('post-title').value.trim();
    const details = document.getElementById('post-details').value.trim();
    const authorId = localStorage.getItem('uid'); // 작성자 ID 가져오기
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
        alert('로그인 후 게시물을 작성할 수 있습니다.');
        return;
    }

    // 작성자 닉네임 가져오기
    const nickName = localStorage.getItem('nickName') || '익명';

    try {
        // Firebase에 게시물 데이터 저장
        const newPostRef = push(ref(database, 'Post')); // push를 사용하여 고유 ID 생성
        const pid = newPostRef.key; // 고유 ID를 pid로 사용
        const postData = {
            pid, // pid 추가
            title,
            details,
            category: '발견',
            postStatus: '작성됨',
            authorId,
            nickName,
            date,
            image: '' // 이미지 부분은 향후 구현 가능
        };

        await set(newPostRef, postData);

        alert('게시물이 저장되었습니다!');
        // 게시물 작성 후 해당 게시물 보기 페이지로 이동 (pid 포함)
        window.location.href = `findPost.html?pid=${pid}`;
    } catch (error) {
        console.error('게시물 저장 중 오류 발생:', error);
        alert('게시물 저장 중 오류가 발생했습니다.');
    }
}
