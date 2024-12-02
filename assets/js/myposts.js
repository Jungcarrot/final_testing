import { database } from "./DB.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// 현재 로그인한 사용자의 UID 가져오기 (localStorage에서 가져옴)
const loginID = localStorage.getItem("loginID"); // 로그인 시 저장된 사용자 UID 가져오기

document.addEventListener("DOMContentLoaded", () => {
    if (!loginID) {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    // 사용자의 게시물 가져오기
    const userPostsRef = ref(database, "Post");
    onValue(userPostsRef, (snapshot) => {
        const myPostsTable = document.getElementById("myposts-list");
        myPostsTable.innerHTML = ''; // 기존 게시물 초기화

        let postIndex = 1;

        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.authorId === loginID) {
                const row = `
                    <tr>
                        <td>${postIndex++}</td>
                        <td>${post.title}</td>
                        <td>${post.nickName || '알 수 없음'}</td>
                        <td>${post.timeStamp || 'N/A'}</td>
                    </tr>
                `;
                myPostsTable.innerHTML += row;
            }
        });
    });
});
