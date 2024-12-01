document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loginID = document.getElementById("loginID").value.trim();
        const password = document.getElementById("password").value.trim();

        // 서버로 요청 보내기 (Mock API 사용 예시)
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ loginID, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("userLoggedIn", "true");
                alert("로그인 성공!");
                window.location.href = "index.html";
            } else {
                alert("로그인 실패: " + data.message);
            }
        } catch (error) {
            console.error("로그인 중 오류 발생:", error);
            alert("서버 오류로 인해 로그인에 실패했습니다.");
        }
    });
});
