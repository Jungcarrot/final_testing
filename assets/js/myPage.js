// Firebase에서 현재 로그인한 사용자의 닉네임을 가져오고, 변경된 닉네임을 저장하는 기능

// 닉네임 변경 처리 함수
function saveNickname() {
    const newNickname = document.getElementById("edit-nickname").value;

    // Firebase의 데이터베이스에 닉네임 저장
    const userId = "abcd1234"; // 로그인한 사용자의 ID로 대체
    const userRef = database.ref('users/' + userId); // 사용자 데이터 경로

    userRef.update({
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
document.querySelector('button[onclick="saveNickname()"]').addEventListener('click', saveNickname);
