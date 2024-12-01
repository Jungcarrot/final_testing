function changeLanguage(lang) {
    const translations = {
        ko: {
            logo: "발자국\n탐정",
            pageTitle: "내가 작성한 게시물",
            tableHeaders: ["번호", "제목", "작성자", "작성일"],
        },
        en: {
            logo: "Pawprint\nDetective",
            pageTitle: "My Posts",
            tableHeaders: ["No.", "Title", "Author", "Date"],
        },
    };

    const elements = {
        langKoButton: document.getElementById('lang-ko'),
        langEnButton: document.getElementById('lang-en'),
        logo: document.querySelector('.logo h1'),
        pageTitle: document.querySelector('.myposts-section h2'),
        tableHeaders: document.querySelectorAll('.myposts-table thead tr th'),
    };

    if (translations[lang]) {
        // 언어 버튼 활성화/비활성화
        elements.langKoButton.classList.toggle('active', lang === 'ko');
        elements.langEnButton.classList.toggle('active', lang === 'en');

        // 로고 텍스트 변경
        if (elements.logo) elements.logo.innerText = translations[lang].logo;

        // 페이지 제목 변경
        if (elements.pageTitle) elements.pageTitle.innerText = translations[lang].pageTitle;

        // 테이블 헤더 변경
        if (elements.tableHeaders.length === translations[lang].tableHeaders.length) {
            elements.tableHeaders.forEach((header, index) => {
                header.innerText = translations[lang].tableHeaders[index];
            });
        }
    } else {
        console.error("Translation or element is missing.");
    }
}

// 초기 언어 설정 (예: 한국어로 설정)
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage("ko"); // 초기 언어를 한국어로 설정
});
