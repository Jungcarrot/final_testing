// 중복 검사 상태를 저장하는 변수
let isUsernameChecked = false;
let isNicknameChecked = false;

function validatePasswordMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const messageElement = document.getElementById('password-check-message');

    if (!password || !confirmPassword || !messageElement) {
        return; // 필요한 요소가 없을 경우 아무 작업도 하지 않음
    }

    if (password.value !== confirmPassword.value || password.value === '') {
        messageElement.style.color = 'red';
        messageElement.textContent = '비밀번호가 일치하지 않습니다.';
        messageElement.style.display = 'block';
        return false;
    } else {
        messageElement.style.color = 'green';
        messageElement.textContent = '비밀번호가 일치합니다.';
        messageElement.style.display = 'block';
        return true;
    }
}

function toggleSignupButton() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const signupButton = document.getElementById('signup-button');

    if (!password || !confirmPassword || !signupButton) {
        return; // 필요한 요소가 없을 경우 아무 작업도 하지 않음
    }

    if (
        isUsernameChecked &&
        isNicknameChecked &&
        password.value === confirmPassword.value &&
        password.value.length >= 8
    ) {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
}

function validateSignup(event) {
    const loginID = document.getElementById('loginID').value;
    const nickName = document.getElementById('nickName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

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
    if (!loginID || !nickName || !password || !confirmPassword) {
        alert("모든 필드를 입력해주세요.");
        return false;
    }

    alert("회원가입이 완료되었습니다!");
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
    const usernameButton = document.querySelector('.input-container button');
    const nicknameButton = document.querySelectorAll('.input-container button')[1];
    const signupForm = document.getElementById('signup-form');

    if (passwordField && confirmPasswordField) {
        passwordField.addEventListener('input', validatePasswordMatch);
        confirmPasswordField.addEventListener('input', validatePasswordMatch);
    }

    // 아이디 중복 검사
    if (usernameButton) {
        usernameButton.addEventListener('click', function () {
            const loginID = document.getElementById('loginID').value;
            if (loginID) {
                const dbRef = firebase.database().ref('UserData');
                dbRef.orderByChild('loginID').equalTo(loginID).once('value', snapshot => {
                    if (snapshot.exists()) {
                        alert("아이디가 중복되었습니다. 다른 아이디를 사용해주세요.");
                        isUsernameChecked = false;
                    } else {
                        alert("아이디 중복 확인 완료!");
                        isUsernameChecked = true;
                        toggleSignupButton();
                    }
                });
            } else {
                alert("아이디를 입력해주세요.");
            }
        });
    }

    // 닉네임 중복 검사
    if (nicknameButton) {
        nicknameButton.addEventListener('click', function () {
            const nickName = document.getElementById('nickName').value;
            if (nickName) {
                const dbRef = firebase.database().ref('UserData');
                dbRef.orderByChild('nickName').equalTo(nickName).once('value', snapshot => {
                    if (snapshot.exists()) {
                        alert("닉네임이 중복되었습니다. 다른 닉네임을 사용해주세요.");
                        isNicknameChecked = false;
                    } else {
                        alert("닉네임 중복 확인 완료!");
                        isNicknameChecked = true;
                        toggleSignupButton();
                    }
                });
            } else {
                alert("닉네임을 입력해주세요.");
            }
        });
    }

    // 폼 제출 처리
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            validateSignup(event);
        });
    }
});

