// 로그인 유효성 검사 및 처리
async function validateLogin() {
    const loginID = document.getElementById('login-loginID').value;
    const password = document.getElementById('login-password').value;
    // 간단한 유효성 검사
    if (!loginID || !password) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return false;
    }
    try {
        // Firebase Realtime Database에서 loginID를 검색
        const snapshot = await database
            .ref('UserData')
            .orderByChild('loginID')
            .equalTo(loginID)
            .once('value');
        if (snapshot.exists()) {
            const userData = Object.values(snapshot.val())[0];
            // 비밀번호 확인
            if (userData.password === password) {
                // 로그인 상태 저장
                localStorage.setItem("userLoggedIn", "true"); // 'loggedIn'을 'userLoggedIn'으로 변경하여 근본과 맞춤
                localStorage.setItem("nickName", userData.nickName); // 'username'을 'nickName'으로 변경하여 근본과 맞춤
                // index.html로 리다이렉트
                alert("로그인 성공!");
                window.location.href = "index.html";
                return false;
            } else {
                alert("비밀번호가 잘못되었습니다.");
                return false;
            }
        } else {
            alert("아이디가 존재하지 않습니다.");
            return false;
        }
    } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        return false;
    }
}

// DOMContentLoaded 이벤트 사용
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        // 표준 addEventListener 사용
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // 기본 동작 방지
            validateLogin(); // 로그인 유효성 검사 및 처리
        });
    } else {
        console.error('로그인 폼을 찾을 수 없습니다. 폼이 존재하는지 확인하세요.');
    }
});
