function changeLanguage(lang) {
    const translations = {
        ko: {
            logo: "발자국\n탐정",
            pageTitle: "마이페이지",
            labels: ["아이디", "닉네임"],
            myPostsButton: "내가 작성한 게시글 보기",
        },
        en: {
            logo: "Pawprint\nDetective",
            pageTitle: "MYPAGE",
            labels: ["Username", "Nickname"],
            myPostsButton: "View My Posts",
        },
    };

    const elements = {
        langKoButton: document.getElementById('lang-ko'),
        langEnButton: document.getElementById('lang-en'),
        logo: document.querySelector('.logo h1'),
        pageTitle: document.querySelector('.mypage-section h2'),
        labels: document.querySelectorAll('.mypage-section .form-group label'),
        myPostsButton: document.getElementById('myPostsButton'),
    };

    if (translations[lang]) {
        // 언어 버튼 활성화/비활성화
        elements.langKoButton.classList.toggle('active', lang === 'ko');
        elements.langEnButton.classList.toggle('active', lang === 'en');

        // 텍스트 변경
        if (elements.logo) elements.logo.innerText = translations[lang].logo;
        if (elements.pageTitle) elements.pageTitle.innerText = translations[lang].pageTitle;
        if (elements.labels.length === 2) {
            elements.labels[0].innerText = translations[lang].labels[0];
            elements.labels[1].innerText = translations[lang].labels[1];
        }
        if (elements.myPostsButton) {
            elements.myPostsButton.innerText = translations[lang].myPostsButton;
        }
    } else {
        console.error("Translation or element is missing.");
    }
}
