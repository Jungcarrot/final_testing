document.addEventListener("DOMContentLoaded", () => {
    const notLoggedInUI = document.getElementById("not-logged-in-ui");
    const loggedInUI = document.getElementById("logged-in-ui");

    // 로그인 상태 확인 (임시: 로컬 스토리지 활용)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // 로그인 상태에 따라 UI 전환
    if (isLoggedIn) {
        notLoggedInUI.style.display = "none"; // 비로그인 UI 숨김
        loggedInUI.style.display = "block"; // 로그인 UI 표시
    } else {
        notLoggedInUI.style.display = "block"; // 비로그인 UI 표시
        loggedInUI.style.display = "none"; // 로그인 UI 숨김
    }

    // 로그아웃 버튼 클릭 이벤트
    const logoutButton = document.querySelector("#logged-in-ui .auth-text a[href='logout.html']");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("isLoggedIn", "false");
            alert("로그아웃되었습니다.");
            window.location.reload(); // 페이지 새로고침
        });
    }
});
