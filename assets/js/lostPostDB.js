document.addEventListener('DOMContentLoaded', () => {
    // 게시물 및 댓글 가져오기
    const postRef = ref(db, `Post/${postId}`);
    get(postRef).then(async (snapshot) => {
        if (!snapshot.exists()) {
            alert('게시물이 존재하지 않습니다.');
            window.location.href = 'lostList.html';
            return;
        }

        const post = snapshot.val();
        const authorSnapshot = await get(ref(db, `UserData/${post.authorId}`));
        const authorNickName = authorSnapshot.exists() ? authorSnapshot.val().nickName : 'Unknown';

        // 댓글 가져오기
        const commentsRef = ref(db, `Comment`);
        onValue(commentsRef, async (commentsSnapshot) => {
            const comments = [];
            const userPromises = [];

            commentsSnapshot.forEach((childSnapshot) => {
                const comment = childSnapshot.val();
                if (comment.postId === postId) {
                    comments.push(comment);
                    userPromises.push(get(ref(db, `UserData/${comment.commenter}`))); // 댓글 작성자 정보 가져오기
                }
            });

            const userSnapshots = await Promise.all(userPromises);

            // 댓글 표시
            const commentContainer = document.getElementById('comments');
            commentContainer.innerHTML = '';
            comments.forEach((commentObj, index) => {
                const userSnapshot = userSnapshots[index];
                const nickName = userSnapshot.exists() ? userSnapshot.val().nickName : 'Unknown';
                const { comment } = commentObj;

                // 댓글 요소 추가 로직
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment-item');
                commentElement.innerHTML = `
                    <strong>${nickName}</strong>: ${comment}
                `;
                commentContainer.appendChild(commentElement);
            });
        });
    }).catch((error) => {
        console.error("Error fetching post data: ", error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    });
});
