function changeLanguage(lang) {
    if (lang === 'ko') {
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.getElementById('login-title').innerText = "로그인";
        document.querySelector('.form-group label[for="login-username"]').innerText = "아이디";
        document.querySelector('.form-group label[for="login-password"]').innerText = "비밀번호";
        document.querySelector('.form-actions button').innerText = "로그인";
        document.querySelector('.additional-links a').innerText = "회원가입";
        document.getElementById('login-username').placeholder = "아이디를 입력하세요";
        document.getElementById('login-password').placeholder = "비밀번호를 입력하세요";
    }
    else if (lang === 'en') {
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.getElementById('login-title').innerText = "LOGIN";
        document.querySelector('.form-group label[for="login-username"]').innerText = "Username";
        document.querySelector('.form-group label[for="login-password"]').innerText = "Password";
        document.querySelector('.form-actions button').innerText = "Login";
        document.querySelector('.additional-links a').innerText = "Sign Up";
        document.getElementById('login-username').placeholder = "Enter your username";
        document.getElementById('login-password').placeholder = "Enter your password";
    }
}
