function filterPosts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); // 검색 입력 값
    const table = document.getElementById('protectPosts'); // 게시물 테이블
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // 첫 번째 행은 헤더, 1부터 시작
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (const cell of cells) {
            if (cell.innerText.toLowerCase().includes(searchInput)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none'; // 검색 결과에 따라 행 표시 여부 결정
    }
}
