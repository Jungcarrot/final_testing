document.getElementById('submit-button').addEventListener('click', async () => {
    const title = document.querySelector('.title-section input').value;
    const details = document.querySelector('.detail-section textarea').value;
    const uid = localStorage.getItem('uid'); // 사용자 ID 가져오기
    const date = new Date().toLocaleString(); // 작성일

    if (!title) {
        alert('제목을 입력해주세요!');
        return;
    }

    try {
        // 작성자 닉네임 가져오기
        if (!uid) {
            alert('로그인이 필요합니다.');
            return;
        }
        const authorSnapshot = await get(ref(db, `UserData/${uid}`));
        if (!authorSnapshot.exists()) {
            alert('사용자 정보를 찾을 수 없습니다.');
            return;
        }
        const nickName = authorSnapshot.val().nickName;

        const postData = {
            title,
            category: '실종',
            postStatus: '작성됨',
            details,
            authorId: uid,
            nickName,
            date,
            image: '', // 이미지 추가 부분은 빈 값으로 설정 (추후 구현 가능)
        };

        // 게시물 데이터 저장
        await push(ref(db, 'Post'), postData);
        window.location.href = 'lostList.html'; // 게시물 목록으로 이동
    } catch (error) {
        console.error("Error saving post: ", error);
        alert('게시물을 저장하는 중 오류가 발생했습니다.');
    }
});
