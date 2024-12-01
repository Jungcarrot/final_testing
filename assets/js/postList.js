document.addEventListener("DOMContentLoaded", () => {
    const postCreateButton = document.getElementById("post-create");

    if (postCreateButton) { // null 체크 추가
        // 로그인 상태 확인 (localStorage에 'userLoggedIn' 값 사용)
        const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

        if (!isLoggedIn) {
            // 로그인하지 않았으면 게시글 작성 버튼 숨김
            postCreateButton.style.display = "none";
        } else {
            // 로그인했으면 게시글 작성 버튼 표시
            postCreateButton.style.display = "block";
        }
    } else {
        console.error("게시글 작성 버튼 요소를 찾을 수 없습니다. HTML에 'post-create' ID를 가진 요소가 있는지 확인하세요.");
    }
});
