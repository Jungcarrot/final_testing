// 로그인 유효성 검사 및 처리
import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { database } from "./DB.js"; // Firebase 설정을 가져오는 경로 (assets/js 폴더 기준)

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
        const userRef = ref(database, 'UserData');
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            const user = Object.values(users).find(user => user.loginID === loginID);

            if (user) {
                // 비밀번호 확인
                if (user.password === password) {
                    // 로그인 상태 저장
                    localStorage.setItem("userLoggedIn", "true");
                    localStorage.setItem("nickName", user.nickName);

                    // 데이터 저장 확인 및 페이지 리다이렉트
                    alert("로그인 성공!");

                    // 리다이렉트를 지연시켜 localStorage가 제대로 저장될 시간을 줌
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 500); // 500ms 지연 후 리다이렉트

                    return false;
                } else {
                    alert("비밀번호가 잘못되었습니다.");
                    return false;
                }
            } else {
                alert("아이디가 존재하지 않습니다.");
                return false;
            }
        } else {
            alert("데이터베이스에 유저 정보가 없습니다.");
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
    const form = document.querySelector('#login-form');
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

