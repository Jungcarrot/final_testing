document.addEventListener("DOMContentLoaded", () => {
    const loggedInUI = document.getElementById("logged-in-ui");
    const loggedOutUI = document.getElementById("logged-out-ui");

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        loggedInUI.style.display = "block";
        loggedOutUI.style.display = "none";
    } else {
        loggedInUI.style.display = "none";
        loggedOutUI.style.display = "block";
    }
});

document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("loggedIn"); // 로그인 상태 제거
    window.location.href = "index.html"; // index.html로 리다이렉트
});
