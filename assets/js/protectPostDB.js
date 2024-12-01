document.addEventListener('DOMContentLoaded', () => {
    // 게시물 및 댓글 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const pid = parseInt(urlParams.get('id'), 10) || 0;

    const postRef = ref(db, `Post/${pid}`);
    get(postRef).then(async (snapshot) => {
        if (!snapshot.exists()) {
            alert('게시물이 존재하지 않습니다.');
            window.location.href = 'protectList.html';
            return;
        }

        const post = snapshot.val();
        const authorSnapshot = await get(ref(db, `UserData/${post.authorId}`));
        const nickName = authorSnapshot.exists() ? authorSnapshot.val().nickName : '알 수 없음';

        // 댓글 가져오기
        const commentsRef = ref(db, `Comment`);
        onValue(commentsRef, (commentsSnapshot) => {
            const comments = [];
            commentsSnapshot.forEach((childSnapshot) => {
                const comment = childSnapshot.val();
                if (comment.pid === pid) {
                    comments.push(comment);
                }
            });

            // 댓글 표시 로직...
        });
    }).catch((error) => {
        console.error("Error fetching post data: ", error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    });
});
