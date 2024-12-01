document.addEventListener("DOMContentLoaded", () => {
    // UI 요소 선택
    const loggedInUI = document.getElementById("logged-in-ui");
    const loggedOutUI = document.getElementById("logged-out-ui");

    if (!loggedInUI || !loggedOutUI) {
        console.error("로그인 UI 요소를 찾을 수 없습니다.");
        return;
    }



    if (isLoggedIn) {
        loggedInUI.style.display = "block";
        loggedOutUI.style.display = "none";
    } else {
        loggedInUI.style.display = "none";
        loggedOutUI.style.display = "block";
    }

    // 로그아웃 이벤트 리스너 등록
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            console.log("로그아웃 버튼 클릭됨");
            localStorage.removeItem("userLoggedIn"); // 로그인 상태 제거
            localStorage.removeItem("loginID"); // 로그인된 사용자 ID 제거
            localStorage.removeItem("nickName"); // 닉네임 제거
            window.location.href = "index.html"; // index.html로 리다이렉트
        });
    } else {
        console.error("로그아웃 버튼을 찾을 수 없습니다.");
    }
});
