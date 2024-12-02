import { database } from "./DB.js";
import { ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 UID 가져오기 (localStorage에서 가져옴)
const uid = localStorage.getItem("uid"); // 로그인 시 저장된 사용자 UID 가져오기

document.addEventListener("DOMContentLoaded", async () => {
    if (!uid || localStorage.getItem("userLoggedIn") !== "true") {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    // Firebase에서 사용자 닉네임 가져오기
    try {
        const userRef = ref(database, `UserData/${uid}`); // Firebase 경로 참조
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("mypage-loginID").value = userData.loginID || '';
            document.getElementById("mypage-nickName").value = userData.nickName || '';
        } else {
            console.error("사용자 데이터가 존재하지 않습니다.");
        }
    } catch (error) {
        console.error("사용자 데이터 가져오기 오류:", error);
    }

    // 닉네임 변경 버튼 이벤트 리스너 추가
    const saveButton = document.getElementById('save-nickname-button');
    if (saveButton) {
        saveButton.addEventListener('click', saveNickname);
    } else {
        console.error("닉네임 저장 버튼이 존재하지 않습니다.");
    }
});

// 닉네임 변경 처리 함수
function saveNickname() {
    const newNickname = document.getElementById("edit-nickname").value.trim();

    if (newNickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
    }

    // Firebase의 데이터베이스에 닉네임 저장
    if (uid) {
        const userRef = ref(database, `UserData/${uid}`);

        update(userRef, {
            nickName: newNickname
        }).then(() => {
            alert("닉네임이 성공적으로 변경되었습니다!");
            document.getElementById("mypage-nickName").value = newNickname; // 마이페이지에 변경된 닉네임 반영
        }).catch((error) => {
            console.error("닉네임 저장 오류:", error);
            alert("닉네임 변경에 실패했습니다.");
        });
    } else {
        console.error("로그인된 사용자 UID가 필요합니다.");
    }
}
