import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { database } from "./DB.js"; // Firebase 설정을 가져오는 경로 (assets/js 폴더 기준)

async function validateLogin() {
    const loginID = document.getElementById('login-loginID').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!loginID || !password) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
    }

    try {
        const userRef = ref(database, 'UserData');
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            alert("데이터베이스에 유저 정보가 없습니다.");
            return;
        }

        const users = snapshot.val();
        const userEntry = Object.entries(users).find(([uid, user]) => user.loginID === loginID);

        if (!userEntry) {
            alert("아이디가 존재하지 않습니다.");
            return;
        }

        const [uid, user] = userEntry;

        if (user.password !== password) {
            alert("비밀번호가 잘못되었습니다.");
            return;
        }

        // 로그인 상태 저장
        storeLoginData(uid, user);
        alert("로그인 성공!");

        // 리다이렉트 지연으로 localStorage 저장 시간 확보
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
}

function storeLoginData(uid, user) {
    localStorage.setItem("userLoggedIn", "true");
    localStorage.setItem("uid", uid);
    localStorage.setItem("loginID", user.loginID);
    localStorage.setItem("nickName", user.nickName);
}

// DOMContentLoaded 이벤트 사용
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#login-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            validateLogin();
        });
    } else {
        console.error('로그인 폼을 찾을 수 없습니다. 폼이 존재하는지 확인하세요.');
    }
});
