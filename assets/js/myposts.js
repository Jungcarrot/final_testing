import { database } from "./DB.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 UID 가져오기 (localStorage에서 가져옴)
const uid = localStorage.getItem("uid"); // 로그인 시 저장된 사용자 UID 가져오기

document.addEventListener("DOMContentLoaded", () => {
    if (!uid) {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    // 사용자의 게시물 가져오기
    const userPostsRef = ref(database, "Post");
    onValue(userPostsRef, (snapshot) => {
        const myPostsTable = document.getElementById("myposts-list");
        if (!myPostsTable) {
            console.error("게시물 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        myPostsTable.innerHTML = ''; // 기존 게시물 초기화

        let postIndex = 1;
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.authorId === uid) {
                const row = document.createElement('tr');

                const indexCell = document.createElement('td');
                indexCell.textContent = postIndex++;
                row.appendChild(indexCell);

                const titleCell = document.createElement('td');
                titleCell.textContent = post.title || '제목 없음';
                row.appendChild(titleCell);

                const nickNameCell = document.createElement('td');
                nickNameCell.textContent = post.nickName || '알 수 없음';
                row.appendChild(nickNameCell);

                const timeStampCell = document.createElement('td');
                timeStampCell.textContent = post.timeStamp || 'N/A';
                row.appendChild(timeStampCell);

                myPostsTable.appendChild(row);
            }
        });

        if (postIndex === 1) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 4;
            emptyCell.textContent = "작성한 게시물이 없습니다.";
            emptyRow.appendChild(emptyCell);
            myPostsTable.appendChild(emptyRow);
        }
    }, (error) => {
        console.error("데이터 가져오기 오류:", error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
    });
});
