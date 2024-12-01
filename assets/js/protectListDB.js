document.addEventListener('DOMContentLoaded', () => {
    // 게시물 관련 로직
    const tableBody = document.querySelector('.post-table tbody'); // 게시물 테이블
    const noPostsMessage = document.querySelector('.no-posts'); // "게시물이 없습니다" 메시지

    const postsRef = ref(db, 'Post');
    onValue(postsRef, async (snapshot) => {
        const posts = [];
        const userPromises = [];
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.category === '임시보호') { // 특정 카테고리 필터링 (임시보호)
                posts.push(post);
                userPromises.push(get(ref(db, `UserData/${post.authorId}`))); // 작성자 정보 가져오기
            }
        });

        const userSnapshots = await Promise.all(userPromises);

        if (posts.length === 0) {
            noPostsMessage.style.display = 'block'; // 게시물이 없으면 메시지 표시
        } else {
            noPostsMessage.style.display = 'none'; // 게시물이 있으면 메시지 숨김
            tableBody.innerHTML = ''; // 기존 내용 초기화
            posts.forEach((post, index) => {
                const userSnapshot = userSnapshots[index];
                const authorNickname = userSnapshot.exists() ? userSnapshot.val().nickName : '알 수 없음';
                const row = `
                    <tr>
                        <td>${index + 1}</td> <!-- 번호 -->
                        <td><a href="protectPost.html">${post.title}</a></td> <!-- 제목 -->
                        <td>${authorNickname}</td> <!-- 작성자 닉네임 -->
                        <td>${post.date || 'N/A'}</td> <!-- 작성일 -->
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    });
});
