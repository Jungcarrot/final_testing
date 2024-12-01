// 중복 검사 상태를 저장하는 변수
let isUsernameChecked = false;
let isNicknameChecked = false;

function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('password-check-message');

    if (password !== confirmPassword || password === '') {
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
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('password').addEventListener('input', validatePasswordMatch);
    document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);

    // 아이디 중복 검사
    document.querySelector('.input-container button').addEventListener('click', function () {
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

    // 닉네임 중복 검사
    document.querySelectorAll('.input-container button')[1].addEventListener('click', function () {
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
});

