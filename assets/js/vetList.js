const hospitalData = [{'district': '중구', 'Vetname': '동인동물병원', 'Vetaddress': '대구광역시 중구 국채보상로 724 (동인동4가)'}, {'district': '중구', 'Vetname': '고려애견종합병원', 'Vetaddress': '대구광역시 중구 중앙대로 333 (남산동)'}, {'district': '중구', 'Vetname': '중부동물병원', 'Vetaddress': '대구광역시 중구 달구벌대로 2114 (봉산동)'}, {'district': '중구', 'Vetname': '삼덕종합동물병원', 'Vetaddress': '대구광역시 중구 달구벌대로 2145-1(삼덕동1가)'}, ...];

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
    populateRegions(); // 구/군 데이터 추가

    document.getElementById('district-select').addEventListener('change', () => {
        updateHospitalTable(); // 병원 테이블 업데이트
    });

    const translations = {
        ko: {
            'page-title': '발견 게시물',
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'login': '로그인',
            'signup': '회원가입',
            'manual-title': 'MANUAL',
            'manual-item1': '매뉴얼 내용',
            'chat-list-title': '채팅 목록',
            'mypage': '마이페이지',
            'logout': '로그아웃',
            'manual-title': '매뉴얼',
            'manual-item1': '발자국 탐정은 대구를 중심으로 사용자가 실종 및 발견된 동물 정보를 공유하고 관리할 수 있는 게시판 중심의 웹사이트입니다.',
            'manual-item2': '주요 목적은 실종 동물 찾기, 발견 동물 보호, 동물병원 정보 공유, 임시보호 동물 관리 등을 돕는 것입니다.',
            'manual-item3': '이에 해당하는 게시판이 4개로 구성되어 있으며, 실종, 발견, 동물병원, 임시보호 카테고리로 구성되어 있습니다.',
            'manual-item4': '여러분이 궁금한 발자국에 대하여 게시글을 작성하고 여러 사용자들과 정보를 공유해주세요!'
        },
        en: {
            'page-title': 'Found Posts',
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Vet',
            'login': 'Login',
            'signup': 'Sign Up',
            'manual-title': 'MANUAL',
            'manual-item1': 'Manual Content',
            'chat-list-title': 'Chat List',
            'mypage': 'My Page',
            'logout': 'Logout',
            'manual-title': 'MANUAL',
            'manual-item1': 'Footprint Detective is a board-based website where users can share and manage information about lost and found animals, mainly in Daegu.',
            'manual-item2': 'Its primary purpose is to help find lost animals, protect found animals, share veterinary information, and manage temporarily sheltered animals.',
            'manual-item3': 'The site is composed of four main boards: Lost, Found, Vet, and Temporary Shelter.',
            'manual-item4': 'Feel free to write posts about your questions regarding Footprint and share information with other users!'
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    }

    document.querySelectorAll('.post-language-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id === 'lang-ko' ? 'ko' : 'en';
            updateLanguage(lang);
            document.querySelectorAll('.post-language-selector button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    updateLanguage('ko');
});

// 구/군 데이터 추가 함수
function populateRegions() {
    if (!hospitalData || hospitalData.length === 0) {
        console.error('No hospital data available to populate regions.');
        return;
    }

    const districts = [...new Set(hospitalData.map(hospital => hospital.district))];
    const districtSelect = document.getElementById('district-select');

    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

// 병원 테이블 업데이트 함수
function updateHospitalTable() {
    const districtSelect = document.getElementById('district-select');
    const selectedDistrict = districtSelect.value;
    const hospitalTable = document.querySelector('.post-table tbody');

    hospitalTable.innerHTML = '';

    if (selectedDistrict) {
        const filteredHospitals = hospitalData.filter(hospital => hospital.district === selectedDistrict);

        if (filteredHospitals.length > 0) {
            filteredHospitals.forEach((hospital, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${hospital.Vetname}</td>
                    <td>${hospital.Vetaddress}</td>
                `;
                hospitalTable.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="3" style="text-align: center;">선택한 구/군에 병원이 없습니다.</td>
            `;
            hospitalTable.appendChild(row);
        }
    }
}
