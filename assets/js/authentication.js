document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const loginID = document.getElementById("loginID").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                // Firebase Authentication을 사용한 로그인 예제
                const auth = firebase.auth();
                const userCredential = await auth.signInWithEmailAndPassword(loginID, password);

                if (userCredential.user) {
                    localStorage.setItem("userLoggedIn", "true");
                    alert("로그인 성공!");
                    window.location.href = "index.html";
                }
            } catch (error) {
                console.error("로그인 중 오류 발생:", error);
                alert("로그인 실패: " + error.message);
            }
        });
    }
});
