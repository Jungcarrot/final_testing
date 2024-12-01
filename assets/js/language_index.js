// 번역 데이터 객체
const translations = {
    ko: {
        title: "발자국<br>탐정",
        categories: [
            "찾아주세요..",
            "발견했어요!",
            "병원이 어딘가요?",
            "임시보호 중이에요!"
        ],
        login: "로그인",
        signup: "회원가입",
        mypage: "마이페이지",
        logout: "로그아웃",
        manualTitle: "매뉴얼",
        manualItems: [
            "발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.",
            "주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.",
            "이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.",
            "여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!"
        ]
    },
    en: {
        title: "Pawprint<br>Detective",
        categories: [
            "I Lost..",
            "I Found..",
            "Where is the VET?",
            "Under temporary protection.."
        ],
        login: "Login",
        signup: "Sign Up",
        mypage: "My Page",
        logout: "Logout",
        manualTitle: "MANUAL",
        manualItems: [
            "Pawprint Detective is a bulletin board website centered in Daegu, allowing users to share and manage information about missing and found animals.",
            "The main purpose is to assist in finding lost animals, protecting found animals, sharing veterinary information, and managing temporary protection.",
            "It consists of 4 bulletin boards: Lost, Found, Veterinary, and Temporary Protection categories.",
            "Post and share information about pawprints you're curious about with other users!"
        ]
    }
};

// 현재 언어 설정
let currentLanguage = "ko";

// 언어 변경 함수
function changeLanguage(lang) {
    if (currentLanguage === lang) return;

    currentLanguage = lang;

    // 제목 변경
    const titleElement = document.querySelector(".logo h1");
    if (titleElement) {
        titleElement.innerHTML = translations[lang].title;
    }

    // 카테고리 텍스트 변경
    const categories = document.querySelectorAll(".category-center p");
    if (categories.length > 0) {
        categories.forEach((category, index) => {
            if (translations[lang].categories[index]) {
                category.textContent = translations[lang].categories[index];
            }
        });
    }

    // 로그인/회원가입 텍스트 변경
    const loginElement = document.querySelector('[data-translate="login"]');
    if (loginElement) {
        loginElement.textContent = translations[lang].login;
    }

    const signupElement = document.querySelector('[data-translate="signup"]');
    if (signupElement) {
        signupElement.textContent = translations[lang].signup;
    }

    // 마이페이지/로그아웃 텍스트 변경
    const mypage = document.querySelector('a[href="mypage.html"]');
    if (mypage) {
        mypage.textContent = translations[lang].mypage;
    }

    const logout = document.querySelector("#logout");
    if (logout) {
        logout.textContent = translations[lang].logout;
    }

    // 매뉴얼 제목 변경
    const manualTitleElement = document.querySelector('[data-translate="manual-title"]');
    if (manualTitleElement) {
        manualTitleElement.textContent = translations[lang].manualTitle;
    }

    // 매뉴얼 내용 변경
    const manualItems = document.querySelectorAll('[data-translate^="manual-item"]');
    if (manualItems.length > 0) {
        manualItems.forEach((item, index) => {
            if (translations[lang].manualItems[index]) {
                item.textContent = translations[lang].manualItems[index];
            }
        });
    }

    // 버튼 스타일 업데이트
    document.querySelectorAll(".language-selector button").forEach(button => {
        button.classList.toggle("active", button.id === `lang-${lang}`);
    });
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(currentLanguage);
});
