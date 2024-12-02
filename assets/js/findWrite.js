import { database } from "./DB.js";
import { ref, get, push, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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
                document.getElementById('post-title').value = post.title || '';
                document.getElementById('post-details').value = post.details.replace(/<br>/g, '\n') || '';

                const postImageElement = document.getElementById('photo-upload');
                if (post.image) {
                    // 이미지 미리보기 추가 (이미지가 있을 경우)
                    const imagePreview = document.createElement('img');
                    imagePreview.src = `assets/images/${post.image}`;
                    imagePreview.style.maxWidth = '200px';
                    imagePreview.style.marginTop = '10px';
                    postImageElement.insertAdjacentElement('afterend', imagePreview);
                }
            } else {
                alert('수정할 게시물을 찾을 수 없습니다.');
                window.location.href = 'findList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 불러오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 작성 완료 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', async () => {
        const title = document.getElementById('post-title').value.trim();
        const details = document.getElementById('post-details').value.trim().replace(/\n/g, '<br>');
        const uid = localStorage.getItem('uid');
        const date = new Date().toLocaleString();

        if (!title || !details) {
            alert('제목과 상세 내용을 모두 입력해주세요.');
            return;
        }

        if (!uid) {
            alert('로그인 후 게시물을 작성할 수 있습니다.');
            return;
        }

        try {
            if (isEditMode && postId) {
                // 수정 모드인 경우, 기존 게시물 업데이트
                const postRef = ref(database, `Post/${postId}`);
                await set(postRef, {
                    pid: postId,
                    title,
                    details,
                    category: '발견', // 카테고리를 반드시 설정해야 함
                    postStatus: '작성됨', // 기본 상태 설정
                    authorId: uid,
                    date,
                    image: '' // 이미지 추가 부분은 향후 구현 가능
                });
                alert('게시물이 수정되었습니다.');
                window.location.href = `findPost.html?pid=${postId}`; // 수정 후 해당 게시물 보기 페이지로 이동
            } else {
                // 새 게시물 작성
                const newPostRef = push(ref(database, 'Post'));
                const pid = newPostRef.key;

                await set(newPostRef, {
                    pid,
                    title,
                    details,
                    category: '발견', // 카테고리를 반드시 설정해야 함
                    postStatus: '작성됨', // 기본 상태 설정
                    authorId: uid,
                    date,
                    image: '' // 이미지 부분은 향후 구현 가능
                });
                alert('게시물이 저장되었습니다.');
                window.location.href = `findPost.html?pid=${pid}`; // 작성 후 해당 게시물 보기 페이지로 이동
            }

        } catch (error) {
            console.error('게시물 저장 중 오류 발생:', error);
            alert('게시물 저장 중 오류가 발생했습니다.');
        }
    });
});
