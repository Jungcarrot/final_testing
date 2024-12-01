document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loginID = document.getElementById("login-loginID").value.trim(); // UserData.loginID로 변경
        const password = document.getElementById("login-password").value.trim(); // UserData.password로 변경

        // Firebase Realtime Database에서 loginID 검색
        try {
            const snapshot = await get(query(ref(db, 'UserData'), orderByChild('loginID'), equalTo(loginID))); // UserData.loginID로 변경

            if (snapshot.exists()) {
                const userData = Object.values(snapshot.val())[0]; // UserData 구조로 가져오기
                
                // 비밀번호 확인
                if (userData.password === password) { // UserData.password와 비교
                    // 로그인 상태 저장
                    localStorage.setItem("userLoggedIn", "true");
                    localStorage.setItem("nickname", userData.nickName); // UserData.nickName 저장
                    localStorage.setItem("uid", userData.uid); // UserData.uid 저장

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
            alert("서버 오류로 인해 로그인에 실패했습니다.");
        }
    });
});
