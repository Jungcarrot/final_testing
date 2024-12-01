// 동적 병원 데이터 필터링 (예: 동물병원 페이지에서 사용)
function filterHospitals(district, subDistrict) {
    const hospitalData = [
        {
            name: { ko: "동물병원1", en: "Animal Hospital 1" },
            address: { ko: "대구광역시 동구 신암1동", en: "Dong-gu, Daegu, Sinam 1-dong" },
            is24: false,
        },
        {
            name: { ko: "동물병원2", en: "Animal Hospital 2" },
            address: { ko: "대구광역시 동구 신암2동", en: "Dong-gu, Daegu, Sinam 2-dong" },
            is24: true,
        },
    ];    

    const filtered = hospitalData.filter(hospital => {
        return hospital.address.includes(district) && hospital.address.includes(subDistrict);
    });

    const resultSection = document.getElementById('hospital-results');
    resultSection.innerHTML = filtered.map(hospital => `
        <tr>
            <td>${hospital.name}</td>
            <td>${hospital.address}</td>
        </tr>
    `).join('');
}
