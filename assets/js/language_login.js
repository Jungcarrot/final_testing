const translations = {
    ko: {
        logo: "발자국\n탐정",
        pageTitle: "로그인",
        loginTitle: "로그인",
        usernameLabel: "아이디",
        usernamePlaceholder: "아이디를 입력하세요",
        passwordLabel: "비밀번호",
        passwordPlaceholder: "비밀번호를 입력하세요",
        loginButton: "로그인",
        signupLink: "회원가입"
    },
    en: {
        logo: "Pawprint\nDetective",
        pageTitle: "LOGIN",
        loginTitle: "LOGIN",
        usernameLabel: "Username",
        usernamePlaceholder: "Enter your ID",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your PASSWORD",
        loginButton: "Login",
        signupLink: "Sign Up"
    }
};

// 현재 언어 설정
let currentLanguage = "ko";

// 언어 변경 함수
function changeLanguage(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;

    // 페이지 제목 변경
    document.title = translations[lang].pageTitle;

    // 로그인 제목 변경
    document.getElementById("login-title").textContent = translations[lang].loginTitle;

    // 폼 필드 레이블 및 플레이스홀더 변경
    document.getElementById("username-label").textContent = translations[lang].usernameLabel;
    document.getElementById("login-loginID").placeholder = translations[lang].usernamePlaceholder;

    document.getElementById("password-label").textContent = translations[lang].passwordLabel;
    document.getElementById("login-password").placeholder = translations[lang].passwordPlaceholder;

    // 버튼 텍스트 변경
    document.getElementById("login-button").textContent = translations[lang].loginButton;

    // 추가 링크 텍스트 변경
    document.querySelector(".additional-links a").textContent = translations[lang].signupLink;

    // 언어 선택 버튼 스타일 업데이트
    document.querySelectorAll(".language-selector button").forEach(button => {
        button.classList.toggle("active", button.id === `lang-${lang}`);
    });
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(currentLanguage);
});
