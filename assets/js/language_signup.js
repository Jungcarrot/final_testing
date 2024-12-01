function changeLanguage(language) {
    if (language === 'ko') {
        document.getElementById('languageKo').classList.add('active');
        document.getElementById('languageEn').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.querySelector('h2').innerText = "회원가입";
        document.querySelectorAll('.formGroup label')[0].innerText = "아이디";
        document.querySelectorAll('.formGroup label')[1].innerText = "닉네임";
        document.querySelectorAll('.formGroup label')[2].innerText = "비밀번호";
        document.querySelectorAll('.formGroup label')[3].innerText = "비밀번호 재입력";
        document.getElementById('signupButton').innerText = "회원가입 완료";
        document.querySelectorAll('.duplicateCheck')[0].innerText = "중복 검사";
        document.querySelectorAll('.duplicateCheck')[1].innerText = "중복 검사";

        // placeholder 변경
        document.getElementById('signupUsername').placeholder = "아이디를 입력하세요";
        document.getElementById('signupNickname').placeholder = "닉네임을 입력하세요";
        document.getElementById('signupPassword').placeholder = "비밀번호를 입력하세요";
        document.getElementById('signupConfirmPassword').placeholder = "비밀번호를 다시 입력하세요";
    }
    else if (language === 'en') {
        document.getElementById('languageEn').classList.add('active');
        document.getElementById('languageKo').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.querySelector('h2').innerText = "SIGNUP";
        document.querySelectorAll('.formGroup label')[0].innerText = "loginID";
        document.querySelectorAll('.formGroup label')[1].innerText = "NickName";
        document.querySelectorAll('.formGroup label')[2].innerText = "Password";
        document.querySelectorAll('.formGroup label')[3].innerText = "Confirm Password";
        document.getElementById('signupButton').innerText = "Complete Sign Up";
        document.querySelectorAll('.duplicateCheck')[0].innerText = "Check";
        document.querySelectorAll('.duplicateCheck')[1].innerText = "Check";

        // placeholder 변경
        document.getElementById('signupUsername').placeholder = "Enter your username";
        document.getElementById('signupNickname').placeholder = "Enter your nickname";
        document.getElementById('signupPassword').placeholder = "Enter your password";
        document.getElementById('signupConfirmPassword').placeholder = "Re-enter your password";
    }
}
