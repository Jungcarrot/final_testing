// 중복 검사 상태를 저장하는 변수
let isUsernameChecked = false;
let isNicknameChecked = false;

function checkPasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const messageElement = document.getElementById('password-check-message');

    if (password === confirmPassword && password.length >= 8) {
        messageElement.style.color = "green";
        messageElement.innerText = "비밀번호가 일치합니다.";
        messageElement.style.display = "block";
    } else {
        messageElement.style.color = "red";
        if (password.length < 8) {
            messageElement.innerText = "비밀번호는 8자 이상이어야 합니다.";
        } else {
            messageElement.innerText = "비밀번호가 일치하지 않습니다.";
        }
        messageElement.style.display = "block";
    }
    toggleSignupButton(); // 버튼 상태 업데이트
}

function validateSignup(event) {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const username = document.getElementById('signup-username').value;
    const nickname = document.getElementById('signup-nickname').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // 중복 검사 확인
    if (!isUsernameChecked) {
        alert("아이디 중복 검사를 진행해주세요.");
        return false;
    }
    if (!isNicknameChecked) {
        alert("닉네임 중복 검사를 진행해주세요.");
        return false;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }
    if (password.length < 8) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return false;
    }

    // 모든 필드 입력 확인
    if (!username || !nickname || !password || !confirmPassword) {
        alert("모든 필드를 입력해주세요.");
        return false;
    }

    // 회원가입 성공
    alert("회원가입이 완료되었습니다!");
    window.location.href = "login.html"; // 로그인 화면으로 리다이렉트
    return true;
}

function toggleSignupButton() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const signupButton = document.getElementById('signup-button');

    if (
        isUsernameChecked &&
        isNicknameChecked &&
        password === confirmPassword &&
        password.length >= 8
    ) {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
}

document.getElementById('signup-password').addEventListener('input', checkPasswordMatch);
document.getElementById('signup-confirm-password').addEventListener('input', checkPasswordMatch);

// 아이디 중복 검사
document.querySelector('.input-container button').addEventListener('click', function () {
    const username = document.getElementById('signup-username').value;
    if (username) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("아이디 중복 확인 완료!");
        isUsernameChecked = true;
        toggleSignupButton();
    } else {
        alert("아이디를 입력해주세요.");
    }
});

// 닉네임 중복 검사
document.querySelectorAll('.input-container button')[1].addEventListener('click', function () {
    const nickname = document.getElementById('signup-nickname').value;
    if (nickname) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("닉네임 중복 확인 완료!");
        isNicknameChecked = true;
        toggleSignupButton();
    } else {
        alert("닉네임을 입력해주세요.");
    }
});
