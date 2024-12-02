import { database } from "./DB.js";
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', async () => {
    // URL에서 게시물 PID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('pid'); // 'id' 대신 'pid'로 수정

    if (!postId) {
        alert('게시물 PID가 존재하지 않습니다.');
        window.location.href = 'lostList.html';
        return;
    }

    const loggedUserId = localStorage.getItem('uid'); // 로그인한 사용자 ID 가져오기

    // Firebase에서 게시물 데이터를 가져와 표시
    async function fetchPostDetails(postId) {
        try {
            const postRef = ref(database, `Post/${postId}`);
            const snapshot = await get(postRef);

            if (snapshot.exists()) {
                const post = snapshot.val();

                // 게시물 제목 설정
                const postTitleElement = document.getElementById('post-title');
                postTitleElement.textContent = post.title || '제목 없음';

                // 게시물 이미지 설정 (이미지가 있을 경우만 표시)
                const postImageElement = document.getElementById('post-image');
                if (post.image) {
                    postImageElement.src = `assets/images/${post.image}`;
                    postImageElement.style.display = 'block';
                } else {
                    postImageElement.style.display = 'none';
                }

                // 게시물 상세 내용 설정 (줄바꿈 반영)
                const postDetailsElement = document.getElementById('post-details');
                postDetailsElement.innerHTML = post.details.replace(/<br>/g, '\n') || '내용이 없습니다.';

                // 작성자 정보 추가
                const authorElement = document.getElementById('post-author');
                authorElement.textContent = post.authorNickname || '작성자 정보 없음';

                // 작성일 설정
                const dateElement = document.getElementById('post-date');
                dateElement.textContent = post.date || '작성일 없음';

                // 게시물 작성자와 로그인한 사용자가 일치하면 수정/삭제 버튼 표시
                if (loggedUserId && post.authorId === loggedUserId) {
                    const editButtons = document.getElementById('edit-buttons');
                    editButtons.style.display = 'block';
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

    // 댓글 데이터를 가져와 표시
    async function fetchComments(postId) {
        try {
            const commentsRef = ref(database, 'Comment');
            const snapshot = await get(commentsRef);
            const commentContainer = document.getElementById('comments');
            commentContainer.innerHTML = '';

            if (snapshot.exists()) {
                snapshot.forEach(childSnapshot => {
                    const comment = childSnapshot.val();
                    if (comment.postID === postId) {
                        const commentElement = document.createElement('div');
                        commentElement.className = 'comment';

                        const commenterName = comment.commenterNickname || '익명';
                        const commentContent = comment.comment || '내용 없음';
                        const commentHTML = `<strong>${commenterName}:</strong> ${commentContent}`;

                        commentElement.innerHTML = commentHTML;
                        commentContainer.appendChild(commentElement);
                    }
                });
            }
        } catch (error) {
            console.error('댓글 데이터를 가져오는 중 오류 발생:', error);
            alert('댓글 데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    // 댓글 작성 처리 함수
    let isSubmitting = false; // 중복 제출 방지 플래그

    async function addComment() {
        if (isSubmitting) return; // 중복 호출 방지
        isSubmitting = true;

        const commentInput = document.getElementById('comment-input');
        const commentContent = commentInput.value.trim();

        if (!commentContent) {
            alert('댓글 내용을 입력해주세요.');
            isSubmitting = false;
            return;
        }

        const commenterId = localStorage.getItem('uid');
        const commenterNickname = localStorage.getItem('nickName') || '익명';

        if (!commenterId) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            isSubmitting = false;
            return;
        }

        try {
            const newCommentRef = push(ref(database, 'Comment'));
            const newComment = {
                postID: postId,
                commenter: commenterId,
                commenterNickname,
                comment: commentContent.replace(/\n/g, '<br>'), // 줄바꿈 처리
                time: new Date().toLocaleString(),
            };

            await set(newCommentRef, newComment);
            commentInput.value = ''; // 입력 필드 초기화
            alert('댓글이 작성되었습니다.');
            await fetchComments(postId); // 댓글 목록 업데이트
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);
            alert('댓글 작성 중 오류가 발생했습니다.');
        } finally {
            isSubmitting = false;
        }
    }

    // 게시물 삭제 처리 함수
    async function deletePost() {
        if (!confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const postRef = ref(database, `Post/${postId}`);
            await remove(postRef);
            alert('게시물이 삭제되었습니다.');
            window.location.href = 'lostList.html';
        } catch (error) {
            console.error('게시물 삭제 중 오류 발생:', error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    }

    // 게시물 수정 처리 함수 (새로운 폼으로 이동시키기)
    function editPost() {
        window.location.href = `lostWrite.html?pid=${postId}&edit=true`; // id 대신 pid 사용
    }

    // 댓글 작성 버튼 클릭 이벤트 추가
    document.getElementById('add-comment').addEventListener('click', addComment);

    // 수정/삭제 버튼 클릭 이벤트 추가
    document.getElementById('edit-post').addEventListener('click', editPost);
    document.getElementById('delete-post').addEventListener('click', deletePost);

    // 초기 게시물 및 댓글 로드
    await fetchPostDetails(postId);
    await fetchComments(postId);
});
