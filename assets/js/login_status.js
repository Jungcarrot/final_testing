document.addEventListener("DOMContentLoaded", () => {
    const loggedInUI = document.getElementById("logged-in-ui");
    const loggedOutUI = document.getElementById("logged-out-ui");

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedInUI && loggedOutUI) {
        if (isLoggedIn) {
            loggedInUI.style.display = "block";
            loggedOutUI.style.display = "none";
        } else {
            loggedInUI.style.display = "none";
            loggedOutUI.style.display = "block";
        }
    }
});

// 로그아웃 이벤트 추가
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // 로그인 상태 제거
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loginID");

            // 로그아웃 후 메인 페이지로 리다이렉트
            window.location.href = "index.html";
        });
    }
});
