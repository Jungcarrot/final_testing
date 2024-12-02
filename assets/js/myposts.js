import { database } from "./DB.js"; // Firebase 데이터베이스 객체 import
import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener("DOMContentLoaded", async () => {
    const uid = localStorage.getItem("uid"); // 로그인 시 저장된 사용자 UID 가져오기

    if (!uid) {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    try {
        const postsRef = ref(database, "Post");
        const snapshot = await get(postsRef);

        const myPostsTable = document.getElementById("myposts-list");
        if (!myPostsTable) {
            console.error("게시물 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        myPostsTable.innerHTML = ''; // 기존 게시물 초기화

        const myPosts = [];
        const userPromises = [];

        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            const postId = childSnapshot.key;

            // 로그인한 사용자가 작성한 게시글만 필터링
            if (post.authorId === uid) {
                myPosts.push({ ...post, postId });
                userPromises.push(get(ref(database, `UserData/${post.authorId}`))); // 작성자 정보 가져오기
            }
        });

        const userSnapshots = await Promise.all(userPromises);

        if (myPosts.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 4;
            emptyCell.textContent = "작성한 게시물이 없습니다.";
            emptyRow.appendChild(emptyCell);
            myPostsTable.appendChild(emptyRow);
        } else {
            myPosts.forEach((post, index) => {
                const userSnapshot = userSnapshots[index];
                const authorNickname = userSnapshot.exists() ? userSnapshot.val().nickName : '알 수 없음';

                const rowElement = document.createElement('tr');

                // 번호 셀
                const numberCell = document.createElement('td');
                numberCell.textContent = index + 1;
                rowElement.appendChild(numberCell);

                // 제목 셀
                const titleCell = document.createElement('td');
                const titleLink = document.createElement('a');
                titleLink.href = `protectPost.html?pid=${post.postId}`;
                titleLink.textContent = post.title;
                titleCell.appendChild(titleLink);
                rowElement.appendChild(titleCell);

                // 작성자 닉네임 셀
                const authorCell = document.createElement('td');
                authorCell.textContent = authorNickname;
                rowElement.appendChild(authorCell);

                // 작성일 셀
                const dateCell = document.createElement('td');
                dateCell.textContent = post.date || '작성일 없음'; // 작성일 설정 수정
                rowElement.appendChild(dateCell);

                // 테이블에 행 추가
                myPostsTable.appendChild(rowElement);
            });
        }
    } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
    }
});
