function changeLanguage(lang) {
    if (lang === 'ko') {
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.querySelector('h2').innerText = "회원가입";
        document.querySelectorAll('.form-group label')[0].innerText = "아이디";
        document.querySelectorAll('.form-group label')[1].innerText = "닉네임";
        document.querySelectorAll('.form-group label')[2].innerText = "비밀번호";
        document.querySelectorAll('.form-group label')[3].innerText = "비밀번호 재입력";
        document.getElementById('signup-button').innerText = "회원가입 완료";
        document.querySelectorAll('.duplicate-check')[0].innerText = "중복 검사";
        document.querySelectorAll('.duplicate-check')[1].innerText = "중복 검사";

        // placeholder 변경
        document.getElementById('signup-loginID').placeholder = "아이디를 입력하세요";
        document.getElementById('signup-nickName').placeholder = "닉네임을 입력하세요";
        document.getElementById('signup-password').placeholder = "비밀번호를 입력하세요";
        document.getElementById('signup-confirm-password').placeholder = "비밀번호를 다시 입력하세요";
    }
    else if (lang === 'en') {
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.querySelector('h2').innerText = "SIGNUP";
        document.querySelectorAll('.form-group label')[0].innerText = "loginID";
        document.querySelectorAll('.form-group label')[1].innerText = "NickName";
        document.querySelectorAll('.form-group label')[2].innerText = "Password";
        document.querySelectorAll('.form-group label')[3].innerText = "Confirm Password";
        document.getElementById('signup-button').innerText = "Complete Sign Up";
        document.querySelectorAll('.duplicate-check')[0].innerText = "Check";
        document.querySelectorAll('.duplicate-check')[1].innerText = "Check";

        // placeholder 변경
        document.getElementById('signup-loginID').placeholder = "Enter your loginID";
        document.getElementById('signup-nickName').placeholder = "Enter your nickname";
        document.getElementById('signup-password').placeholder = "Enter your password";
        document.getElementById('signup-confirm-password').placeholder = "Re-enter your password";
    }
}
