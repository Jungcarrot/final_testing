// 동적 병원 데이터 필터링 (예: 동물병원 페이지에서 사용)
function filterHospitals(district, subDistrict) {
    const hospitalData = [
        {
            Vetname: { ko: "동물병원1", en: "Animal Hospital 1" },
            Vetaddress: { ko: "대구광역시 동구 신암1동", en: "Dong-gu, Daegu, Sinam 1-dong" },
            Vetopen24Hours: false,
        },
        {
            Vetname: { ko: "동물병원2", en: "Animal Hospital 2" },
            Vetaddress: { ko: "대구광역시 동구 신암2동", en: "Dong-gu, Daegu, Sinam 2-dong" },
            Vetopen24Hours: true,
        },
    ];    

    const filtered = hospitalData.filter(hospital => {
        return hospital.Vetaddress.ko.includes(district) && hospital.Vetaddress.ko.includes(subDistrict);
    });

    const resultSection = document.getElementById('hospital-results');
    resultSection.innerHTML = filtered.map(hospital => `
        <tr>
            <td>${hospital.Vetname.ko}</td>
            <td>${hospital.Vetaddress.ko}</td>
        </tr>
    `).join('');
}
