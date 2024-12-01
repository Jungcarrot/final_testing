document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", () => {
        // 서버에서 세션 종료 요청 (필요 시)
        fetch("/api/logout", { method: "POST" });

        // 로컬 로그인 상태 제거
        localStorage.removeItem("loggedIn"); // 'userLoggedIn'을 'loggedIn'으로 변경하여 근본과 맞춤
        localStorage.removeItem("nickName"); // 'username'을 'nickName'으로 변경하여 근본과 맞춤
        alert("로그아웃되었습니다.");
        window.location.href = "index.html";
    });
});
