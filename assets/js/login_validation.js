document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            const loginIDElement = document.getElementById("login-loginID");
            const passwordElement = document.getElementById("login-password");

            // loginID와 password 엘리먼트가 있는지 확인
            if (!loginIDElement || !passwordElement) {
                console.error("로그인 입력 필드를 찾을 수 없습니다. HTML을 확인하세요.");
                return;
            }

            const loginID = loginIDElement.value.trim();
            const password = passwordElement.value.trim();

            if (!loginID || !password) {
                event.preventDefault();
                alert("아이디와 비밀번호를 모두 입력해주세요.");
            }
        });
    } else {
        console.error("로그인 폼을 찾을 수 없습니다.");
    }
});
