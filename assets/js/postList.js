document.addEventListener("DOMContentLoaded", () => {
    const postCreateButton = document.getElementById("post-create");

    // 로그인 상태 확인 (예: localStorage에 'loggedIn' 값 사용)
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (!isLoggedIn) {
        // 로그인하지 않았으면 게시글 작성 버튼 숨김
        postCreateButton.style.display = "none";
    } else {
        // 로그인했으면 게시글 작성 버튼 표시
        postCreateButton.style.display = "block";
    }
});
