import { database } from "assets/js/DB.js";
import { ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 ID 가져오기 (예시용)
const userId = "abcd1234"; // 실제 로그인된 사용자 ID로 변경해야 함

// Firebase에서 사용자 닉네임 가져오기
document.addEventListener("DOMContentLoaded", async () => {
    if (userId) {
        try {
            const userRef = ref(database, `UserData/${userId}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                document.getElementById("mypage-username").value = userData.loginID || '';
                document.getElementById("mypage-nickname").value = userData.nickName || '';
            } else {
                console.error("사용자 데이터가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("사용자 데이터 가져오기 오류:", error);
        }
    } else {
        console.error("로그인된 사용자 ID가 필요합니다.");
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
    const userRef = ref(database, `UserData/${userId}`);

    update(userRef, {
        nickName: newNickname
    }).then(() => {
        alert("닉네임이 성공적으로 변경되었습니다!");
        document.getElementById("mypage-nickname").value = newNickname; // 마이페이지에 변경된 닉네임 반영
    }).catch((error) => {
        console.error("닉네임 저장 오류:", error);
        alert("닉네임 변경에 실패했습니다.");
    });
}

// 닉네임 변경 버튼에 이벤트 추가
document.getElementById('save-nickname-button').addEventListener('click', saveNickname);
