document.addEventListener("DOMContentLoaded", () => {
    // UI 요소 선택
    const loggedInUI = document.getElementById("logged-in-ui");
    const loggedOutUI = document.getElementById("logged-out-ui");

    if (!loggedInUI || !loggedOutUI) {
        console.error("로그인 UI 요소를 찾을 수 없습니다.");
        return;
    }

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("uid") !== null; // uid가 존재하면 로그인 상태로 간주

    // 로그인 상태에 따라 UI 표시
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

            // 로컬 스토리지에서 모든 로그인 관련 정보 제거
            localStorage.removeItem("userLoggedIn");
            localStorage.removeItem("uid");
            localStorage.removeItem("nickName");
            localStorage.removeItem("loginID");

            console.log("로컬 스토리지에서 로그인 관련 정보가 제거되었습니다.");

            // index.html로 리다이렉트
            window.location.href = "index.html";
        });
    } else {
        console.error("로그아웃 버튼을 찾을 수 없습니다.");
    }
});
