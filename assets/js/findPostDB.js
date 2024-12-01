// 게시물 및 댓글 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        alert('게시물이 존재하지 않습니다.');
        window.location.href = 'findList.html';
        return;
    }

    try {
        // Realtime Database에서 게시물 가져오기
        const postRef = ref(db, `Post/${postId}`);
        get(postRef).then((snapshot) => {
            if (!snapshot.exists()) {
                alert('게시물이 존재하지 않습니다.');
                window.location.href = 'findList.html';
                return;
            }

            const post = snapshot.val();
            
            // 게시물 제목 표시
            const postTitleElement = document.getElementById('post-title');
            postTitleElement.textContent = post.title || '제목 없음';

            // 게시물 내용 설정
            const postDetailsElement = document.getElementById('post-details');
            postDetailsElement.textContent = post.details || '내용이 없습니다.';
        });

        // Realtime Database에서 댓글 가져오기
        const commentsRef = ref(db, `Comment`);
        onValue(commentsRef, (snapshot) => {
            const comments = [];
            snapshot.forEach((childSnapshot) => {
                const commentData = childSnapshot.val();
                if (commentData.postId === postId) {
                    comments.push(commentData);
                }
            });

            // 댓글 표시
            const commentContainer = document.getElementById('comments');

            const renderComments = () => {
                commentContainer.innerHTML = '';
                comments.forEach((commentObj, index) => {
                    const { nickname, comment } = commentObj;

                    const commentElement = document.createElement('div');
                    commentElement.style.display = "flex";
                    commentElement.style.alignItems = "center";

                    // 닉네임과 댓글 내용
                    const commentText = document.createElement('span');
                    commentText.textContent = `${index + 1}. [${nickName}] ${comment}`;
                    commentText.style.flexGrow = "1";

                    // 신고하기 버튼
                    const reportButton = document.createElement('button');
                    reportButton.textContent = translations[defaultLang]['report']; // 초기 텍스트 설정
                    reportButton.className = 'comment-report-btn'; // 번역용 클래스 추가
                    reportButton.style.marginLeft = '10px';
                    reportButton.style.backgroundColor = '#ffa500';
                    reportButton.style.color = 'white';
                    reportButton.style.border = 'none';
                    reportButton.style.borderRadius = '4px';
                    reportButton.style.cursor = 'pointer';

                    reportButton.addEventListener('click', () => showReportPopup(nickname));

                    // 댓글과 버튼 추가
                    commentElement.appendChild(commentText);
                    commentElement.appendChild(reportButton);
                    commentContainer.appendChild(commentElement);
                });
            };

            renderComments();
        });
    } catch (error) {
        console.error("Error fetching post or comments: ", error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
    }
});
