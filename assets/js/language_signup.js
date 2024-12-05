// language_signup.js

// 한국어와 영어 텍스트 설정
const translations = {
    ko: {
        signupTitle: "회원가입",
        idLabel: "아이디",
        idPlaceholder: "아이디를 입력하세요",
        duplicateCheck: "중복 검사",
        nicknameLabel: "닉네임",
        nicknamePlaceholder: "닉네임을 입력하세요",
        passwordLabel: "비밀번호",
        passwordPlaceholder: "비밀번호를 입력하세요",
        confirmPasswordLabel: "비밀번호 재입력",
        confirmPasswordPlaceholder: "비밀번호를 다시 입력하세요",
        passwordMismatch: "비밀번호가 일치하지 않습니다.",
        signupButton: "회원가입 완료",
    },
    en: {
        signupTitle: "Sign Up",
        idLabel: "ID",
        idPlaceholder: "Enter your ID",
        duplicateCheck: "Check Duplication",
        nicknameLabel: "Nickname",
        nicknamePlaceholder: "Enter your nickname",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Re-enter your password",
        passwordMismatch: "Passwords do not match.",
        signupButton: "Complete Sign Up",
    },
};

// 현재 언어 상태를 저장
let currentLanguage = "ko";

// 언어 변경 함수
function changeLanguage(lang) {
    // 현재 언어 업데이트
    currentLanguage = lang;

    // 언어 선택 버튼 활성화/비활성화
    document.getElementById("lang-ko").classList.toggle("active", lang === "ko");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");

    // 텍스트 업데이트
    const t = translations[lang];
    document.querySelector(".login-signup-section h2").textContent = t.signupTitle;
    document.querySelector("label[for='loginID']").textContent = t.idLabel;
    document.getElementById("loginID").placeholder = t.idPlaceholder;
    document.querySelector("label[for='nickName']").textContent = t.nicknameLabel;
    document.getElementById("nickName").placeholder = t.nicknamePlaceholder;
    document.querySelector("label[for='password']").textContent = t.passwordLabel;
    document.getElementById("password").placeholder = t.passwordPlaceholder;
    document.querySelector("label[for='confirmPassword']").textContent = t.confirmPasswordLabel;
    document.getElementById("confirmPassword").placeholder = t.confirmPasswordPlaceholder;
    document.getElementById("password-check-message").textContent = t.passwordMismatch;
    document.getElementById("signup-button").textContent = t.signupButton;

    // 중복 검사 버튼 텍스트 업데이트
    document.querySelectorAll(".duplicate-check").forEach(button => {
        button.textContent = t.duplicateCheck;
    });
}

// 초기화 - 기본 언어 설정
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(currentLanguage);
});
