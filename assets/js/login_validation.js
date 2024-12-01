import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { database } from "./DB.js"; // Firebase 설정을 가져오는 경로 (assets/js 폴더 기준)

// DOMContentLoaded 이벤트 리스너
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // 입력 필드 값 가져오기
            const loginID = document.getElementById("login-loginID").value.trim();
            const password = document.getElementById("login-password").value.trim();

            if (!loginID || !password) {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            try {
                // Firebase 데이터베이스에서 해당 로그인 ID 조회
                const userRef = ref(database, `UserData/${loginID}`);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    if (userData.password === password) {
                        // 로그인 상태 저장
                        localStorage.setItem("loggedIn", "true");
                        localStorage.setItem("username", userData.nickName);

                        // 로그인 성공 메시지 및 페이지 이동
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
