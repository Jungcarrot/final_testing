import { setLoginState } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loginID = document.getElementById("login-loginID").value.trim();
        const password = document.getElementById("login-password").value.trim();

        try {
            const snapshot = await get(query(ref(db, 'UserData'), orderByChild('loginID'), equalTo(loginID)));

            if (snapshot.exists()) {
                const userData = Object.values(snapshot.val())[0];

                if (userData.password === password) {
                    setLoginState(userData);  // 로그인 상태 설정

                    alert("로그인 성공!");
                    window.location.href = "index.html";
                } else {
                    alert("비밀번호가 잘못되었습니다.");
                }
            } else {
                alert("아이디가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("로그인 중 오류 발생:", error);
            alert("서버 오류로 인해 로그인에 실패했습니다.");
        }
    });
});
