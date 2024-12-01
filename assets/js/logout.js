document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // 서버에서 세션 종료 요청 (필요 시)
            // fetch("/api/logout", { method: "POST" }); 
            // 주석 처리하여 실제 서버 호출 방지 (필요 시 활성화)

            // 로컬 로그인 상태 제거
            localStorage.removeItem("loginID"); // 사용자 loginID 삭제
            localStorage.removeItem("nickName"); // 사용자 닉네임 삭제
            localStorage.removeItem("uid"); // 사용자 uid 삭제

            alert("로그아웃되었습니다.");
            window.location.href = "index.html"; // 로그아웃 후 메인 페이지로 리디렉션
        });
    }
});
