const translations = {
    ko: {
        pageTitle: "발자국 <br> 탐정",
        login: "로그인",
        signup: "회원가입",
        manualTitle: "매뉴얼",
        manualItem1: "발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.",
        manualItem2: "주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.",
        manualItem3: "이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.",
        manualItem4: "여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!",
        mypage: "마이페이지",
        logout: "로그아웃",
        chatListTitle: "채팅 목록",
        chatRoomTitle: "채팅방",
        chatSendButton: "전송",
        categoryTexts: ["찾아주세요..", "발견했어요!", "병원이 어딘가요?", "임시보호 중이에요!"]
    },
    en: {
        pageTitle: "Pawprint <br> Detective",
        login: "Login",
        signup: "Sign Up",
        manualTitle: "MANUAL",
        manualItem1: "Pawprint Detective is a web-based platform focused on sharing and managing information about missing and found animals in Daegu.",
        manualItem2: "Its main purpose is to help find missing animals, protect found animals, share veterinary clinic information, and manage temporarily protected animals.",
        manualItem3: "The platform consists of four categories: missing, found, veterinary clinic, and temporary protection.",
        manualItem4: "Write posts and share information with other users about the pawprints you're curious about!",
        mypage: "My Page",
        logout: "Logout",
        chatListTitle: "Chat List",
        chatRoomTitle: "Chat Room",
        chatSendButton: "Send",
        categoryTexts: ["I Lost..", "I Found..", "Where is the VET?", "Under temporary protection.."]
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

    // 로그인/회원가입 텍스트 변경
    document.querySelector("a[data-translate='login']").textContent = translations[lang].login;
    document.querySelector("a[data-translate='signup']").textContent = translations[lang].signup;

    // 메뉴얼 내용 변경
    document.querySelector("h2[data-translate='manual-title']").textContent = translations[lang].manualTitle;
    document.querySelector("p[data-translate='manual-item1']").textContent = translations[lang].manualItem1;
    document.querySelector("p[data-translate='manual-item2']").textContent = translations[lang].manualItem2;
    document.querySelector("p[data-translate='manual-item3']").textContent = translations[lang].manualItem3;
    document.querySelector("p[data-translate='manual-item4']").textContent = translations[lang].manualItem4;

    // 로그인 상태 UI 텍스트 변경
    const loggedInUI = document.getElementById("logged-in-ui");
    if (loggedInUI) {
        document.querySelector("a[data-translate='mypage']").textContent = translations[lang].mypage;
        document.querySelector("a[data-translate='logout']").textContent = translations[lang].logout;
    }

    // 채팅 UI 텍스트 변경
    const chatSidebar = document.querySelector("aside.chat-sidebar");
    if (chatSidebar) {
        document.querySelector("h2[data-translate='chat-list-title']").textContent = translations[lang].chatListTitle;
        document.getElementById("popup-chat-title").textContent = translations[lang].chatRoomTitle;
        document.querySelector(".chat-send-button").textContent = translations[lang].chatSendButton;
    }

    // 카테고리 텍스트 변경
    const categories = document.querySelectorAll(".category-center p");
    translations[lang].categoryTexts.forEach((text, index) => {
        if (categories[index]) categories[index].textContent = text;
    });

    // 언어 선택 버튼 스타일 업데이트
    document.querySelectorAll(".language-selector button").forEach(button => {
        button.classList.toggle("active", button.id === `lang-${lang}`);
    });
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage(currentLanguage);
});
