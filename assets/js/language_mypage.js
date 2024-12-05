const translations = {
    ko: {
        logo: "발자국\n탐정",
        pageTitle: "마이페이지",
        myPageTitle: "마이페이지",
        loginIDLabel: "아이디",
        nickNameLabel: "닉네임",
        editNicknameLabel: "닉네임 변경",
        editNicknamePlaceholder: "새로운 닉네임을 입력하세요",
        myPostsButton: "내가 작성한 게시물 보기",
        saveNicknameButton: "닉네임 변경"
    },
    en: {
        logo: "Pawprint\nDetective",
        pageTitle: "My Page",
        myPageTitle: "My Page",
        loginIDLabel: "Login ID",
        nickNameLabel: "Nickname",
        editNicknameLabel: "Change Nickname",
        editNicknamePlaceholder: "Enter a new nickname",
        myPostsButton: "View My Posts",
        saveNicknameButton: "Change Nickname"
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

    // 마이페이지 제목 변경
    document.querySelector(".mypage-section h2").textContent = translations[lang].myPageTitle;

    // 폼 필드 레이블 변경
    document.querySelector("label[for='mypage-loginID']").textContent = translations[lang].loginIDLabel;
    document.querySelector("label[for='mypage-nickName']").textContent = translations[lang].nickNameLabel;
    document.querySelector("label[for='edit-nickname']").textContent = translations[lang].editNicknameLabel;

    // 입력 필드 플레이스홀더 변경
    document.getElementById("edit-nickname").placeholder = translations[lang].editNicknamePlaceholder;

    // 버튼 텍스트 변경
    document.getElementById("myPostsButton").textContent = translations[lang].myPostsButton;
    document.getElementById("save-nickname-button").textContent = translations[lang].saveNicknameButton;

    // 언어 선택 버튼 스타일 업데이트
    document.querySelectorAll(".language-selector button").forEach(button => {
        button.classList.toggle("active", button.id === `lang-${lang}`);
    });
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(currentLanguage);
});
