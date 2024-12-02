import { database } from "./DB.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 ID 가져오기 (예시용)
const userId = "abcd1234"; // 실제 로그인된 사용자 ID로 변경해야 함

// Firebase에서 사용자가 작성한 게시글 가져오기
document.addEventListener("DOMContentLoaded", () => {
    if (userId) {
        try {
            const postsRef = ref(database, 'Post');
            onValue(postsRef, (snapshot) => {
                const table = document.getElementById('protectPosts'); // 게시물 테이블
                table.innerHTML = `
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>작성일</th>
                    </tr>
                `; // 테이블 헤더

                let index = 1;

                snapshot.forEach((childSnapshot) => {
                    const post = childSnapshot.val();

                    // 사용자가 작성한 게시글만 필터링
                    if (post.authorId === userId) {
                        const row = table.insertRow();
                        const cellIndex = row.insertCell(0);
                        const cellTitle = row.insertCell(1);
                        const cellContent = row.insertCell(2);
                        const cellDate = row.insertCell(3);

                        cellIndex.textContent = index++;
                        cellTitle.textContent = post.title || '제목 없음';
                        cellContent.textContent = post.content || '내용 없음';
                        cellDate.textContent = post.createdAt || 'N/A';
                    }
                });
            });
        } catch (error) {
            console.error("사용자 게시글 가져오기 오류:", error);
        }
    } else {
        console.error("로그인된 사용자 ID가 필요합니다.");
    }
});

// 게시글 필터링 함수
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

document.getElementById('search-input').addEventListener('input', filterPosts);
