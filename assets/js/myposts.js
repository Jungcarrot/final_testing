import { database } from "./DB.js";
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 UID 가져오기 (localStorage에서 가져옴)
const uid = localStorage.getItem("uid"); // 로그인 시 저장된 사용자 UID 가져오기

document.addEventListener("DOMContentLoaded", async () => {
    if (!uid) {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    // 사용자의 게시물 가져오기
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

        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            const postId = childSnapshot.key;

            // 로그인한 사용자가 작성한 게시글만 필터링
            if (post.authorId === uid) {
                myPosts.push({ ...post, postId });
            }
        });

        if (myPosts.length === 0) {
            // 게시물이 없으면 안내 메시지 표시
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 4;
            emptyCell.textContent = "작성한 게시물이 없습니다.";
            emptyRow.appendChild(emptyCell);
            myPostsTable.appendChild(emptyRow);
        } else {
            // 게시물이 있으면 테이블에 추가
            myPosts.forEach((post, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td> <!-- 번호 -->
                        <td><a href="protectPost.html?pid=${post.postId}">${post.title}</a></td> <!-- 제목, 게시물 ID 추가 -->
                        <td>${post.authorNickname || '알 수 없음'}</td> <!-- 작성자 닉네임 -->
                        <td>${post.date || 'N/A'}</td> <!-- 작성일 -->
                    </tr>
                `;
                myPostsTable.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        alert("게시물을 불러오는 중 오류가 발생했습니다.");
    }
});
