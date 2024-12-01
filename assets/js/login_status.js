document.addEventListener("DOMContentLoaded", () => {
    const loggedInUI = document.getElementById("logged-in-ui");
    const loggedOutUI = document.getElementById("logged-out-ui");

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true"; // 'loggedIn'을 'userLoggedIn'으로 변경하여 근본과 맞춤

    if (isLoggedIn) {
        loggedInUI.style.display = "block";
        loggedOutUI.style.display = "none";
    } else {
        loggedInUI.style.display = "none";
        loggedOutUI.style.display = "block";
    }
});

document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("userLoggedIn"); // 로그인 상태 제거 (변수명 'loggedIn'을 'userLoggedIn'으로 변경하여 근본과 맞춤)
    window.location.href = "index.html"; // index.html로 리다이렉트
});
