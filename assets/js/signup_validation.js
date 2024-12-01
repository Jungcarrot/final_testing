// 중복 검사 상태를 저장하는 변수
let isLoginIDChecked = false;
let isNickNameChecked = false;

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
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

    const loginID = document.getElementById('loginID').value;
    const nickName = document.getElementById('nickName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 중복 검사 확인
    if (!isLoginIDChecked) {
        alert("아이디 중복 검사를 진행해주세요.");
        return false;
    }
    if (!isNickNameChecked) {
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
    if (!loginID || !nickName || !password || !confirmPassword) {
        alert("모든 필드를 입력해주세요.");
        return false;
    }

    // 회원가입 성공
    alert("회원가입이 완료되었습니다!");
    window.location.href = "login.html"; // 로그인 화면으로 리다이렉트
    return true;
}

function toggleSignupButton() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const signupButton = document.getElementById('signup-button');

    if (
        isLoginIDChecked &&
        isNickNameChecked &&
        password === confirmPassword &&
        password.length >= 8
    ) {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
}

document.getElementById('password').addEventListener('input', checkPasswordMatch);
document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);

// 아이디 중복 검사
document.querySelector('.input-container button').addEventListener('click', function () {
    const loginID = document.getElementById('loginID').value;
    if (loginID) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("아이디 중복 확인 완료!");
        isLoginIDChecked = true;
        toggleSignupButton();
    } else {
        alert("아이디를 입력해주세요.");
    }
});

// 닉네임 중복 검사
document.querySelectorAll('.input-container button')[1].addEventListener('click', function () {
    const nickName = document.getElementById('nickName').value;
    if (nickName) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("닉네임 중복 확인 완료!");
        isNickNameChecked = true;
        toggleSignupButton();
    } else {
        alert("닉네임을 입력해주세요.");
    }
});
