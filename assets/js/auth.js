// 로그인한 사용자의 이름을 로컬 스토리지에서 가져오는 함수
function getLoggedInUsername() {
    const username = localStorage.getItem("nickname");

    if (!username) {
        console.log("로그인된 사용자 이름이 없습니다.");
        return null;  // 로그인된 사용자 이름이 없으면 null 반환
    }

    return username;  // 로그인된 사용자 이름을 반환
}

// 로그인 처리 함수 (Authentication.js에서 호출)
function setLoginState(userData) {
    // 로그인 상태를 localStorage에 저장
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("nickname", userData.nickName);  // 사용자 닉네임 저장
    localStorage.setItem("uid", userData.uid);  // 사용자 UID 저장

    console.log("로그인 성공:", userData.nickName);
}

// 로그아웃 처리 함수
function logout() {
    // localStorage에서 로그인 정보 삭제
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("nickname");
    localStorage.removeItem("uid");

    console.log("로그아웃되었습니다.");
}

// 로그인 상태 확인 함수
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    return isLoggedIn;
}

export { getLoggedInUsername, setLoginState, logout, checkLoginStatus };
