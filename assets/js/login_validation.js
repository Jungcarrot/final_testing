// Firebase 관련 객체에 접근
document.addEventListener("DOMContentLoaded", () => {
    const database = firebase.database(); // DB 객체 가져오기

    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const loginID = document.getElementById("login-loginID").value.trim();
            const password = document.getElementById("login-password").value.trim();

            if (!loginID || !password) {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            try {
                const userRef = database.ref(`UserData/${loginID}`);
                const snapshot = await userRef.get();

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    if (userData.password === password) {
                        // 로그인 상태 저장
                        localStorage.setItem("loggedIn", "true");
                        localStorage.setItem("username", userData.nickName);

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
                alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        });
    } else {
        console.error("로그인 폼을 찾을 수 없습니다.");
    }
});
