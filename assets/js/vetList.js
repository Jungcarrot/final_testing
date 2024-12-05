const hospitalData = [{'region': '중구', 'name_ko': '동인동물병원', 'address_ko': '대구광역시 중구 국채보상로 724 (동인동4가)'}, {'region': '중구', 'name_ko': '고려애견종합병원', 'address_ko': '대구광역시 중구 중앙대로 333 (남산동)'}, {'region': '중구', 'name_ko': '중부동물병원', 'address_ko': '대구광역시 중구 달구벌대로 2114 (봉산동)'}, {'region': '중구', 'name_ko': '삼덕종합동물병원', 'address_ko': '대구광역시 중구 달구벌대로 2145-1(삼덕동1가)'}, {'region': '중구', 'name_ko': '동산동물병원', 'address_ko': '대구광역시 중구 서성로 34 (남성로)'}, {'region': '중구', 'name_ko': '오원석 황금동물병원', 'address_ko': '대구광역시 중구 동덕로 56-3 (대봉동)'}, {'region': '중구', 'name_ko': '대구축산 동물병원', 'address_ko': '대구광역시 중구 대봉로 278 (대봉동)'}, {'region': '중구', 'name_ko': '대구S동물병원', 'address_ko': '대구광역시 중구 달구벌대로 1975 (대신동. 태왕아너스스카이 상가 101호. 102호. 103호)'}, {'region': '중구', 'name_ko': '달성공원 동물병원', 'address_ko': '대구광역시 중구 달성공원로 35. 달성공원 (달성동)'}, {'region': '중구', 'name_ko': '원동물병원', 'address_ko': '대구광역시 중구 동덕로8길 2 (대봉동)'}, {'region': '중구', 'name_ko': '센트럴동물병원', 'address_ko': '대구광역시 중구 달구벌대로 1943. 101동 2층 201호 (대신동. 대신e편한세상)'}, {'region': '중구', 'name_ko': '대구동물심장내과', 'address_ko': '대구광역시 중구 명덕로 315. 1층 (대봉동)'}, {'region': '중구', 'name_ko': '박영우안과동물병원', 'address_ko': '대구광역시 중구 달구벌대로 2208. 서정희피부과 5층 (대봉동)'}, {'region': '중구', 'name_ko': '남산연합동물병원', 'address_ko': '대구광역시 중구 남산로6안길 47. 1층 101. 105호 (남산동. 로하스남산)'}, {'region': '동구', 'name_ko': '박동물병원', 'address_ko': '대구광역시 동구 아양로 227 (신암동)'}, {'region': '동구', 'name_ko': '박순복동물병원', 'address_ko': '대구광역시 동구 아양로 246 (효목동)'}, {'region': '동구', 'name_ko': '킴스동물병원', 'address_ko': '대구광역시 동구 화랑로 413 (방촌동)'}, {'region': '동구', 'name_ko': '변수의과의원', 'address_ko': '대구광역시 동구 동촌로 154 (검사동)'}, {'region': '동구', 'name_ko': '21세기종합동물병원', 'address_ko': '대구광역시 동구 아양로 216 (효목동)'}, {'region': '동구', 'name_ko': '동대구동물의료센터', 'address_ko': '대구광역시 동구 신암로 70. 2층 (신암동)'}, {'region': '동구', 'name_ko': '대경동물병원', 'address_ko': '대구광역시 동구 동대구로 425 (신천동)'}, {'region': '동구', 'name_ko': '이스턴24시동물병원', 'address_ko': '대구광역시 동구 반야월로 140 (신기동)'}, {'region': '동구', 'name_ko': '쿨펫동물병원', 'address_ko': '대구광역시 동구 안심로 389-2 (신서동. 이마트 2층)'}, {'region': '동구', 'name_ko': '쿨펫동물병원', 'address_ko': '대구광역시 동구 안심로 80 (율하동.롯데마트 4층 동물병원)'}, {'region': '동구', 'name_ko': '앨리스동물병원', 'address_ko': '대구광역시 동구 안심로 389. 1층 (신서동)'}, {'region': '동구', 'name_ko': '이시아동물병원', 'address_ko': '대구광역시 동구 팔공로 320-1. 1층 106호 (봉무동)'}, {'region': '동구', 'name_ko': '열린동물병원', 'address_ko': '대구광역시 동구 아양로 17 (신암동)'}, {'region': '동구', 'name_ko': '이끌림동물병원', 'address_ko': '대구광역시 동구 화랑로 429 (방촌동)'}, {'region': '동구', 'name_ko': '대구동물병원', 'address_ko': '대구광역시 동구 동부로 34. 2층 (신천동)'}, {'region': '동구', 'name_ko': '율하동물병원', 'address_ko': '대구광역시 동구 율하서로 54. 101.102호 (율하동)'}, {'region': '동구', 'name_ko': '봄이온동물병원', 'address_ko': '대구광역시 동구 경안로 826 (각산동)'}, {'region': '동구', 'name_ko': '수호동물병원', 'address_ko': '대구광역시 동구 팔공로51길 3. 이시아시티빌딩 205호 (봉무동)'}, {'region': '동구', 'name_ko': '명진동물병원', 'address_ko': '대구광역시 동구 아양로 81. 201호 (신암동)'}, {'region': '동구', 'name_ko': '행복동물병원', 'address_ko': '대구광역시 동구 동부로 221 (효목동. 선화하이츠)'}, {'region': '동구', 'name_ko': '대구혁신메디컬 동물병원', 'address_ko': '대구광역시 동구 메디밸리로 13. 110호.111호.112호 (대림동)'}, {'region': '서구', 'name_ko': '보경동물병원', 'address_ko': '대구광역시 서구 달서로 165 (비산동)'}, {'region': '서구', 'name_ko': '진동물병원', 'address_ko': '대구광역시 서구 국채보상로 407 (비산동)'}, {'region': '서구', 'name_ko': '페츠업 동물병원', 'address_ko': '대구광역시 서구 서대구로 136 (평리동)'}, {'region': '서구', 'name_ko': '아이펫동물병원', 'address_ko': '대구광역시 서구 서대구로 64 (평리동)'}, {'region': '서구', 'name_ko': '평리동물병원', 'address_ko': '대구광역시 서구 서대구로 189. 2층 (평리동)'}, {'region': '서구', 'name_ko': '더펫동물병원', 'address_ko': '대구광역시 서구 서대구로 361. 2층 (비산동)'}, {'region': '서구', 'name_ko': '삼성동물병원', 'address_ko': '대구광역시 서구 서대구로 37 (내당동)'}, {'region': '서구', 'name_ko': '젠틀펫동물병원', 'address_ko': '대구광역시 서구 와룡로66길 64 (중리동)'}, {'region': '서구', 'name_ko': '서대구동물병원', 'address_ko': '대구광역시 서구 국채보상로 270. 1층 (평리동)'}, {'region': '서구', 'name_ko': '24시알파동물메디컬센터', 'address_ko': '대구광역시 서구 서대구로 15 (내당동)'}, {'region': '남구', 'name_ko': '남부동물병원', 'address_ko': '대구광역시 남구 두류공원로 18-2 (대명동)'}, {'region': '남구', 'name_ko': '현대동물병원', 'address_ko': '대구광역시 남구 봉덕로 89 (봉덕동)'}, {'region': '남구', 'name_ko': '이천종합동물병원', 'address_ko': '대구광역시 남구 봉덕로 83 (봉덕동)'}, {'region': '남구', 'name_ko': '대흥동물병원', 'address_ko': '대구광역시 남구 대명로 230 (대명동)'}, {'region': '남구', 'name_ko': '독사랑동물병원', 'address_ko': '대구광역시 남구 중앙대로 150. 1층 (봉덕동)'}, {'region': '남구', 'name_ko': '리더스동물병원', 'address_ko': '대구광역시 남구 대명로 121 (대명동)'}, {'region': '남구', 'name_ko': '우리동물병원', 'address_ko': '대구광역시 남구 봉덕로 84 (봉덕동)'}, {'region': '남구', 'name_ko': '알프스동물병원', 'address_ko': '대구광역시 남구 대덕로 149 (봉덕동)'}, {'region': '남구', 'name_ko': '효성동물병원', 'address_ko': '대구광역시 남구 신촌길 101 (봉덕동)'}, {'region': '남구', 'name_ko': '박순석동물메디컬센터', 'address_ko': '대구광역시 남구 대명로 72. 더원빌딩 2층 (대명동)'}, {'region': '남구', 'name_ko': '명덕동물병원', 'address_ko': '대구광역시 남구 명덕로40길 109. 1.2층 (대명동)'}, {'region': '북구', 'name_ko': '동명동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 531 (읍내동)'}, {'region': '북구', 'name_ko': '경북대학교 수의과대학 부속동물병원', 'address_ko': '대구광역시 북구 대학로 80 (산격동. 경북대학교 수의과대학)'}, {'region': '북구', 'name_ko': '대구축협동물병원', 'address_ko': '대구광역시 북구 검단북로 154 (검단동)'}, {'region': '북구', 'name_ko': '경북가축병원', 'address_ko': '대구광역시 북구 팔달로41길 12 (노원동2가)'}, {'region': '북구', 'name_ko': '칠곡종합동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 301. 102호 (태전동)'}, {'region': '북구', 'name_ko': '강동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 483 (관음동)'}, {'region': '북구', 'name_ko': '굿모닝동물병원', 'address_ko': '대구광역시 북구 대천로 72-1 (동천동)'}, {'region': '북구', 'name_ko': '가나동물병원', 'address_ko': '대구광역시 북구 산격로 109 (산격동)'}, {'region': '북구', 'name_ko': '늘푸른종합동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 471 (관음동)'}, {'region': '북구', 'name_ko': '도그플러스 동물병원(미유펫 대구점)', 'address_ko': '대구광역시 북구 동암로12길 8. 2층 (동천동. 칠곡홈플러스)'}, {'region': '북구', 'name_ko': '순풍동물병원', 'address_ko': '대구광역시 북구 학정로 149. 한우리메디타워 2층 204호 (태전동)'}, {'region': '북구', 'name_ko': '아프리카 동물병원', 'address_ko': '대구광역시 북구 침산로 116 (침산동)'}, {'region': '북구', 'name_ko': '북부동물병원', 'address_ko': '대구광역시 북구 대현로 27 (대현동)'}, {'region': '북구', 'name_ko': '준 동물병원', 'address_ko': '대구광역시 북구 공항로 12 (복현동)'}, {'region': '북구', 'name_ko': '라라(Lara) 동물병원', 'address_ko': '대구광역시 북구 침산로 153. 101동 1층 A1호 (침산동. 명성푸르지오)'}, {'region': '북구', 'name_ko': '태전동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 373 (태전동)'}, {'region': '북구', 'name_ko': '세븐동물병원', 'address_ko': '대구광역시 북구 팔거천동로 210 (동천동)'}, {'region': '북구', 'name_ko': '키다리동물병원', 'address_ko': '대구광역시 북구 학정로 440. 101호 (구암동. 동재빌딩)'}, {'region': '북구', 'name_ko': '올리브동물병원', 'address_ko': '대구광역시 북구 동북로 131. 105동 108.9호 (산격동. 양우내안에아파트 상가)'}, {'region': '북구', 'name_ko': '대구24시동물병원', 'address_ko': '대구광역시 북구 침산남로 61 (노원동1가)'}, {'region': '북구', 'name_ko': '가온동물병원', 'address_ko': '대구광역시 북구 서변로 65-1 (서변동)'}, {'region': '북구', 'name_ko': '다온동물병원', 'address_ko': '대구광역시 북구 칠곡중앙대로 189 (태전동)'}, {'region': '북구', 'name_ko': '신한동물병원', 'address_ko': '대구광역시 북구 침산로21길 23 (칠성동2가. 침산1차푸르지오)'}, {'region': '북구', 'name_ko': '동천 동물병원', 'address_ko': '대구광역시 북구 동천로24길 3. 1층 (동천동)'}, {'region': '북구', 'name_ko': '더문 동물병원', 'address_ko': '대구광역시 북구 내곡로 81. 부광빌딩 102호 (사수동)'}, {'region': '북구', 'name_ko': '비타민동물병원', 'address_ko': '대구광역시 북구 복현로 127 (복현동)'}, {'region': '북구', 'name_ko': '연경동물병원', 'address_ko': '대구광역시 북구 동화천로 241. 연경그랜드타워 204호 (연경동)'}, {'region': '북구', 'name_ko': '해솔 동물병원', 'address_ko': '대구광역시 북구 신암로 73 (대현동)'}, {'region': '북구', 'name_ko': '우일축산 AH', 'address_ko': '대구광역시 북구 유통단지로8길 120-13(산격동)'}, {'region': '북구', 'name_ko': '이든동물병원', 'address_ko': '대구광역시 북구 동북로 254. 1층 (복현동)'}, {'region': '북구', 'name_ko': '칠곡온동물의료센터', 'address_ko': '대구광역시 북구 학정로 500-1(학정동)'}, {'region': '북구', 'name_ko': '조아동물병원', 'address_ko': '대구광역시 북구 공항로 12-2. 1층 (복현동)'}, {'region': '북구', 'name_ko': '플러스동물의료센터', 'address_ko': '대구광역시 북구 중앙대로 526(칠성동2가)'}, {'region': '수성구', 'name_ko': '범어동물병원', 'address_ko': '대구광역시 수성구 범어로 118 (범어동)'}, {'region': '수성구', 'name_ko': '정동물병원', 'address_ko': '대구광역시 수성구 지산로 41 (지산동)'}, {'region': '수성구', 'name_ko': '신세계동물병원', 'address_ko': '대구광역시 수성구 들안로 262. 효정빌딩 1층 (수성동3가)'}, {'region': '수성구', 'name_ko': '지산동물병원', 'address_ko': '대구광역시 수성구 지범로 89 (지산동)'}, {'region': '수성구', 'name_ko': '사랑동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 2259 (수성동4가)'}, {'region': '수성구', 'name_ko': '선동물병원', 'address_ko': '대구광역시 수성구 화랑로 102 (만촌동)'}, {'region': '수성구', 'name_ko': '나라동물병원', 'address_ko': '대구광역시 수성구 수성로 185. 상가201동 116호 (중동. 수성 골드클래스 더 센텀)'}, {'region': '수성구', 'name_ko': '두산메디펫동물병원', 'address_ko': '대구광역시 수성구 동대구로 24 (지산동)'}, {'region': '수성구', 'name_ko': '금강동물병원', 'address_ko': '대구광역시 수성구 동원로 152. 지하1층 (만촌동)'}, {'region': '수성구', 'name_ko': '제니스동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 2475 (범어동)'}, {'region': '수성구', 'name_ko': '이수의과동물병원', 'address_ko': '대구광역시 수성구 지범로 69 (지산동)'}, {'region': '수성구', 'name_ko': '허동물병원', 'address_ko': '대구광역시 수성구 명덕로 421. 4호 (수성동2가)'}, {'region': '수성구', 'name_ko': '수성동물병원', 'address_ko': '대구광역시 수성구 수성로 151 (중동)'}, {'region': '수성구', 'name_ko': '올펫 동물병원', 'address_ko': '대구광역시 수성구 수성로 85 (상동)'}, {'region': '수성구', 'name_ko': '다원 동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3258 (신매동)'}, {'region': '수성구', 'name_ko': '수성 메트로 동물병원', 'address_ko': '대구광역시 수성구 국채보상로 1006 (만촌동)'}, {'region': '수성구', 'name_ko': '리즈 동물병원', 'address_ko': '대구광역시 수성구 들안로 50 (두산동)'}, {'region': '수성구', 'name_ko': '대구동물메디컬센터', 'address_ko': '대구광역시 수성구 동대구로 36 (지산동)'}, {'region': '수성구', 'name_ko': '베트문동물병원', 'address_ko': '대구광역시 수성구 지범로39길 11 (범물동)'}, {'region': '수성구', 'name_ko': '조은동물의료원', 'address_ko': '대구광역시 수성구 달구벌대로 2644 (만촌동)'}, {'region': '수성구', 'name_ko': '멘토동물병원', 'address_ko': '대구광역시 수성구 용학로 294 (범물동. 덕암빌딩 2층)'}, {'region': '수성구', 'name_ko': '스위스동물병원', 'address_ko': '대구광역시 수성구 무학로 41. 1층 (상동)'}, {'region': '수성구', 'name_ko': '세인트동물병원', 'address_ko': '대구광역시 수성구 청호로 484 (만촌동)'}, {'region': '수성구', 'name_ko': '그랜드벳동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3249 (신매동)'}, {'region': '수성구', 'name_ko': 'y동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3116-1. 1층 (시지동)'}, {'region': '수성구', 'name_ko': '로얄동물병원', 'address_ko': '대구광역시 수성구 들안로 412 (범어동)'}, {'region': '수성구', 'name_ko': '곰아저씨 동물병원', 'address_ko': '대구광역시 수성구 들안로 354 (수성동4가)'}, {'region': '수성구', 'name_ko': '예스동물병원', 'address_ko': '대구광역시 수성구 동대구로 207 (황금동)'}, {'region': '수성구', 'name_ko': '에피소드 동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 2660(만촌동)'}, {'region': '수성구', 'name_ko': '따뜻한 on동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 2367 (수성동4가)'}, {'region': '수성구', 'name_ko': '스마트동물병원', 'address_ko': '대구광역시 수성구 동대구로 247 (범어동)'}, {'region': '수성구', 'name_ko': '마루동물병원', 'address_ko': '대구광역시 수성구 청수로 101 (황금동)'}, {'region': '수성구', 'name_ko': '펫 동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3144 (노변동)'}, {'region': '수성구', 'name_ko': '범어동물의료센터', 'address_ko': '대구광역시 수성구 달구벌대로 2354 (수성동3가)'}, {'region': '수성구', 'name_ko': '시지동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3014 (시지동)'}, {'region': '수성구', 'name_ko': '유니온동물의료센터', 'address_ko': '대구광역시 수성구 청수로 135 (황금동)'}, {'region': '수성구', 'name_ko': '대구24시 야간응급연합동물병원', 'address_ko': '대구광역시 수성구 동대구로 36. 3층 (지산동)'}, {'region': '수성구', 'name_ko': '감자동물병원', 'address_ko': '대구광역시 수성구 달구벌대로 3179. 1층 (매호동)'}, {'region': '수성구', 'name_ko': '마음을 읽어주는 마음동물병원', 'address_ko': '대구광역시 수성구 화랑로 16. 1층 (만촌동)'}, {'region': '수성구', 'name_ko': 'KABB 동물병원', 'address_ko': '대구광역시 수성구 용학로48길 24. 2/3층 (지산동)'}, {'region': '수성구', 'name_ko': '본동물메디컬센터 24시수성점', 'address_ko': '대구광역시 수성구 달구벌대로 2545. 1층 (만촌동)'}, {'region': '수성구', 'name_ko': '시지W동물의료센터', 'address_ko': '대구광역시 수성구 달구벌대로 3223. 1층 (신매동)'}, {'region': '수성구', 'name_ko': '리온동물병원', 'address_ko': '대구광역시 수성구 동대구로 62. 1.2층 (지산동)'}, {'region': '달서구', 'name_ko': '제이엘동물병원', 'address_ko': '대구광역시 달서구 월배로39길 4-1 (상인동)'}, {'region': '달서구', 'name_ko': '광장동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1736 (두류동)'}, {'region': '달서구', 'name_ko': '가람동물병원', 'address_ko': '대구광역시 달서구 월곡로 249 (상인동)'}, {'region': '달서구', 'name_ko': '용산종합동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1658 (감삼동)'}, {'region': '달서구', 'name_ko': '온누리동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1220 (이곡동)'}, {'region': '달서구', 'name_ko': '문종합동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1328 (이곡동)'}, {'region': '달서구', 'name_ko': '성서종합동물병원', 'address_ko': '대구광역시 달서구 이곡공원로 36 (이곡동)'}, {'region': '달서구', 'name_ko': '박물관옆동물병원', 'address_ko': '대구광역시 달서구 구마로 136. 1층 (본동)'}, {'region': '달서구', 'name_ko': '세림종합동물병원', 'address_ko': '대구광역시 달서구 구마로 218. 2층 (송현동)'}, {'region': '달서구', 'name_ko': '25시종합동물병원', 'address_ko': '대구광역시 달서구 월배로 330-1. 1층 (송현동)'}, {'region': '달서구', 'name_ko': '헬로우동물병원', 'address_ko': '대구광역시 달서구 선원로 262 (용산동)'}, {'region': '달서구', 'name_ko': '어진종합동물병원', 'address_ko': '대구광역시 달서구 월배로 182 (상인동)'}, {'region': '달서구', 'name_ko': '두류동물병원', 'address_ko': '대구광역시 달서구 성당로 21 (성당동)'}, {'region': '달서구', 'name_ko': '이곡종합동물병원', 'address_ko': '대구광역시 달서구 이곡공원로 19 (이곡동)'}, {'region': '달서구', 'name_ko': '베스트 종합 동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1524 (감삼동)'}, {'region': '달서구', 'name_ko': '해맑은동물병원', 'address_ko': '대구광역시 달서구 월배로 80. 401동 1층 127호 (진천동. 진천역 대성스카이렉스 상가)'}, {'region': '달서구', 'name_ko': '한마음종합동물병원', 'address_ko': '대구광역시 달서구 두류공원로 267 (두류동)'}, {'region': '달서구', 'name_ko': '미르동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1223 (이곡동)'}, {'region': '달서구', 'name_ko': '오 동물병원', 'address_ko': '대구광역시 달서구 조암로 42 (월성동)'}, {'region': '달서구', 'name_ko': '위드동물병원', 'address_ko': '대구광역시 달서구 월배로 93 (진천동)'}, {'region': '달서구', 'name_ko': '도그플러스동물병원', 'address_ko': '대구광역시 달서구 달구벌대로 1467. 홈플러스 성서점 지하1층 (용산동)'}, {'region': '달서구', 'name_ko': '죽전동물메디컬센터', 'address_ko': '대구광역시 달서구 달구벌대로 1580. VIP빌딩 1.2.3층 (감삼동)'}, {'region': '달서구', 'name_ko': '이룸동물병원', 'address_ko': '대구광역시 달서구 한실로 99 (도원동)'}, {'region': '달서구', 'name_ko': '미소동물병원', 'address_ko': '대구광역시 달서구 와룡로 156 (감삼동)'}, {'region': '달서구', 'name_ko': '두남자동물병원', 'address_ko': '대구광역시 달서구 월배로 48 (진천동)'}, {'region': '달서구', 'name_ko': '하나동물병원', 'address_ko': '대구광역시 달서구 조암남로 9 (상인동)'}, {'region': '달서구', 'name_ko': '초록동물병원', 'address_ko': '대구광역시 달서구 월배로 79 (진천동)'}, {'region': '달서구', 'name_ko': '24시프라임동물병원', 'address_ko': '대구광역시 달서구 비슬로 2746 (대곡동)'}, {'region': '달서구', 'name_ko': '이솝동물병원', 'address_ko': '대구광역시 달서구 비슬로 2692 (대곡동)'}, {'region': '달서구', 'name_ko': '앨리스in동물병원', 'address_ko': '대구광역시 달서구 조암로 4. 105호 (월성동. 그루메디컬)'}, {'region': '달서구', 'name_ko': '애플동물병원', 'address_ko': '대구광역시 달서구 진천로 78. 2층 (진천동)'}, {'region': '달서구', 'name_ko': '라파동물병원', 'address_ko': '대구광역시 달서구 장기로 207 (본리동)'}, {'region': '달서구', 'name_ko': '본리종합동물병원', 'address_ko': '대구광역시 달서구 용산로 52 (장기동)'}, {'region': '달서구', 'name_ko': '본 동물메디컬센터 외과동물병원', 'address_ko': '대구광역시 달서구 월배로 165 (진천동)'}, {'region': '달서구', 'name_ko': '탑스동물메디컬센터', 'address_ko': '대구광역시 달서구 월배로 166. 1. 2. 5층 (상인동)'}, {'region': '달서구', 'name_ko': '돌봄동물메디컬클리닉', 'address_ko': '대구광역시 달서구 조암로 48. 원더풀스파랜드 203호 (월성동)'}, {'region': '달서구', 'name_ko': '수목원동물병원', 'address_ko': '대구광역시 달서구 갈밭로4길 20 (대곡동)'}, {'region': '달서구', 'name_ko': '종합동물병원', 'address_ko': '대구광역시 달서구 성당로 23. 1층 (성당동)'}, {'region': '달서구', 'name_ko': '이서동물병원', 'address_ko': '대구광역시 달서구 구마로 243 (성당동)'}, {'region': '달서구', 'name_ko': '대구24시바른동물의료센터', 'address_ko': '대구광역시 달서구 와룡로 142. 2층 (감삼동)'}, {'region': '달서구', 'name_ko': '대경연합동물영상센터', 'address_ko': '대구광역시 달서구 달구벌대로 1580. 3층 (감삼동)'}, {'region': '달서구', 'name_ko': '대구24시라이프동물의료센터', 'address_ko': '대구광역시 달서구 달구벌대로 1601. 1층 (감삼동)'}, {'region': '달서구', 'name_ko': '동행동물병원', 'address_ko': '대구광역시 달서구 진천로 117. 월배이타운 1층 117. 118호 (대천동)'}, {'region': '달서구', 'name_ko': '대구경북양돈농협 동물병원', 'address_ko': '대구광역시 달서구 월암로 26. 4층 (월성동)'}, {'region': '달성군', 'name_ko': '달성축협동물병원', 'address_ko': '대구광역시 달성군 현풍읍 국가산단북로 482-22'}, {'region': '달성군', 'name_ko': '구지동물병원', 'address_ko': '대구광역시 달성군 구지면 창리로11길 34'}, {'region': '달성군', 'name_ko': '현풍동물병원', 'address_ko': '대구광역시 달성군 유가읍 테크노공원로 51'}, {'region': '달성군', 'name_ko': '다사종합동물병원', 'address_ko': '대구광역시 달성군 다사읍 달구벌대로 836'}, {'region': '달성군', 'name_ko': '포산동물병원', 'address_ko': '대구광역시 달성군 현풍읍 비슬로 614-1'}, {'region': '달성군', 'name_ko': '달성축산동물병원', 'address_ko': '대구광역시 달성군 현풍읍 원교길 6'}, {'region': '달성군', 'name_ko': '힐링동물병원', 'address_ko': '대구광역시 달성군 다사읍 달구벌대로 844'}, {'region': '달성군', 'name_ko': '화원연합동물병원', 'address_ko': '대구광역시 달성군 화원읍 사문진로 447'}, {'region': '달성군', 'name_ko': '테크노연합 동물병원', 'address_ko': '대구광역시 달성군 유가읍 테크노중앙대로6길 2-4'}, {'region': '달성군', 'name_ko': '119동물병원', 'address_ko': '대구광역시 달성군 다사읍 달구벌대로 893. 102호'}, {'region': '달성군', 'name_ko': '서재동물병원', 'address_ko': '대구광역시 달성군 다사읍 서재로 140'}, {'region': '달성군', 'name_ko': '비슬동물병원', 'address_ko': '대구광역시 달성군 유가읍 테크노상업로 120. 테크노폴리스 M스퀘어+'}, {'region': '달성군', 'name_ko': '25시 죽곡동물병원', 'address_ko': '대구광역시 달성군 다사읍 대실역남로 34. 204호'}, {'region': '달성군', 'name_ko': '도담동물병원', 'address_ko': '대구광역시 달성군 현풍읍 테크노중앙대로 243. 타임스퀘어 105. 106호'}, {'region': '달성군', 'name_ko': '대구착한동물병원', 'address_ko': '대구광역시 달성군 다사읍 서재로12길 26'}, {'region': '달성군', 'name_ko': '옥포태양동물병원', 'address_ko': '대구광역시 달성군 옥포읍 돌미로 67. 옥포태양동물병원'}, {'region': '달성군', 'name_ko': '디에스 동물메디컬', 'address_ko': '대구광역시 달성군 다사읍 죽곡1길 13-3. 주순빌딩 201호'}, {'region': '군위군', 'name_ko': '의흥가축병원', 'address_ko': '대구광역시 군위군 의흥면 읍내길 43-13'}, {'region': '군위군', 'name_ko': '대구가축병원', 'address_ko': '대구광역시 군위군 군위읍 중앙길 122-1'}, {'region': '군위군', 'name_ko': '도수의과가축병원', 'address_ko': '대구광역시 군위군 군위읍 군청로 123'}, {'region': '군위군', 'name_ko': '박성준 동물병원', 'address_ko': '대구광역시 군위군 군위읍 중앙길 46. 등용문학원'}, {'region': '군위군', 'name_ko': '우성동물병원', 'address_ko': '대구광역시 군위군 군위읍 중앙1길 17'}, {'region': '군위군', 'name_ko': '버팔로 동물병원', 'address_ko': '대구광역시 군위군 군위읍 중앙길 23'}, {'region': '군위군', 'name_ko': '와이제이클리닉', 'address_ko': '대구광역시 군위군 군위읍 중앙1길 15'}, {'region': '군위군', 'name_ko': '군위축협 동물병원', 'address_ko': '대구광역시 군위군 군위읍 군청로 49-33. A동 1층'}, {'region': '군위군', 'name_ko': '군위종합동물병원', 'address_ko': '대구광역시 군위군 군위읍 중앙1길 15. 1층'}];

// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
    populateRegions(); // 구/군 데이터 추가

    document.getElementById('region-select').addEventListener('change', () => {
        updateHospitalTable(); // 병원 테이블 업데이트
    });

    const translations = {
        ko: {
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'login': '로그인',
            'signup': '회원가입',
            'header-number': '번호',
            'header-name': '이름',
            'header-address' '주소',
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
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Vet',
            'login': 'Login',
            'signup': 'Sign Up',
            'header-number': 'No.',
            'header-name': 'Name',
            'header-address' 'Address',
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

    const regions = [...new Set(hospitalData.map(hospital => hospital.region))];
    const regionSelect = document.getElementById('region-select');

    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

// 병원 테이블 업데이트 함수
function updateHospitalTable() {
    const regionSelect = document.getElementById('region-select');
    const selectedRegion = regionSelect.value;
    const hospitalTable = document.querySelector('.post-table tbody');

    hospitalTable.innerHTML = '';

    if (selectedRegion) {
        const filteredHospitals = hospitalData.filter(hospital => hospital.region === selectedRegion);

        if (filteredHospitals.length > 0) {
            filteredHospitals.forEach((hospital, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${hospital.name_ko}</td>
                    <td>${hospital.address_ko}</td>
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
