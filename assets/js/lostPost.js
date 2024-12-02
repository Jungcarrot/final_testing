import { database } from "./DB.js";
import { ref, get, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid');

    if (!postId) {
        alert('게시물 PID가 존재하지 않습니다.');
        window.location.href = 'lostList.html';
        return;
    }

    // 게시물 데이터 가져오기
    async function fetchPostDetails(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                document.getElementById('post-title').textContent = post.title || '제목 없음';
                document.getElementById('post-details').textContent = post.details || '내용이 없습니다.';
                document.getElementById('post-image').src = post.image ? `assets/images/${post.image}` : 'assets/img/default-image.png';
                document.getElementById('post-date').textContent = post.date || '작성일 없음';

                if (post.authorId) {
                    const authorRef = ref(database, `UserData/${post.authorId}`);
                    const authorSnapshot = await get(authorRef);
                    if (authorSnapshot.exists()) {
                        const authorNickName = authorSnapshot.val().nickName;
                        const authorElement = document.getElementById('post-author');
                        authorElement.textContent = authorNickName || '작성자 정보 없음';
                        authorElement.setAttribute('data-author-id', post.authorId);
                    }
                }

                // 수정/삭제 버튼 표시 (본인 게시물일 경우만)
                const loggedInUserId = localStorage.getItem('uid');
                if (loggedInUserId && post.authorId === loggedInUserId) {
                    document.getElementById('edit-buttons').style.display = 'block';
                }
            } else {
                alert('해당 게시물이 존재하지 않습니다.');
                window.location.href = 'lostList.html';
            }
        } catch (error) {
            console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
            alert('게시물 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 게시물 삭제 처리
    function deletePost(postId) {
        if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            return;
        }

        const postRef = ref(database, `Post/${postId}`);
        remove(postRef)
            .then(() => {
                alert('게시물이 삭제되었습니다.');
                window.location.href = 'lostList.html';
            })
            .catch((error) => {
                console.error('게시물 삭제 중 오류 발생:', error);
                alert('게시물 삭제 중 오류가 발생했습니다.');
            });
    }

    // 삭제 버튼 클릭 이벤트 등록
    document.getElementById('delete-post').addEventListener('click', () => deletePost(postId));

    // 수정 버튼 클릭 이벤트 등록
    document.getElementById('edit-post').addEventListener('click', () => {
        window.location.href = `lostWrite.html?pid=${postId}&edit=true`;
    });

    // 게시물 및 댓글 로드
    await fetchPostDetails(postId);
});
