import { database } from "assets/js/DB.js"; // 필요시 사용하기 위해 import
// 이미 로그인한 상태인지 확인하는 로직 추가

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

// 로그아웃 이벤트 추가
document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("loggedIn"); // 로그인 상태 제거
    window.location.href = "index.html"; // index.html로 리다이렉트
});
