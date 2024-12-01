document.addEventListener('DOMContentLoaded', () => {
    // 게시물 작성 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', () => {
        const title = document.querySelector('.title-section input').value; // Post.title
        const details = document.querySelector('.detail-section textarea').value; // Post.details
        const authorId = localStorage.getItem('uid'); // UserData.uid로 사용자 ID 가져오기
        const date = new Date().toLocaleString(); // 작성일 (Post에 별도 추가 없음)

        if (!title) {
            alert('제목을 입력해주세요!');
            return;
        }

        // 작성자 닉네임 가져오기
        const userRef = ref(db, `UserData/${authorId}`); // UserData 테이블 참조
        get(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
                const { nickName } = userSnapshot.val(); // UserData.nickName 사용
                const postData = { 
                    title, // Post.title
                    details, // Post.details
                    authorId, // 작성자 ID 저장 (UserData.uid)
                    authorNickname: nickName, // UserData.nickName
                    date // 작성일 저장
                };
                
                // 게시물 데이터 저장
                const newPostRef = push(ref(db, 'Post')); // Post 테이블에 데이터 추가
                newPostRef.set(postData).then(() => {
                    window.location.href = 'findList.html'; // 게시물 목록으로 이동
                }).catch((error) => {
                    console.error("Error saving post: ", error);
                    alert('게시물을 저장하는 중 오류가 발생했습니다.');
                });
            } else {
                alert('사용자 정보를 찾을 수 없습니다.');
            }
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
            alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        });
    });
});
