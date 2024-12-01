function filterPosts() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const table = document.getElementById('posts-table');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // 0은 헤더, 1부터 시작
        const cells = rows[i].getElementsByTagName('td');
        let match = false;
        for (const cell of cells) {
            if (cell.innerText.toLowerCase().includes(searchInput)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? '' : 'none';
    }
}
