import { database } from "./DB.js"; // Firebase 데이터베이스 객체 import
import { ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"; // Firebase에서 제공하는 메서드들 가져오기

// 현재 로그인한 사용자의 UID 가져오기 (localStorage에서 가져옴)
document.addEventListener("DOMContentLoaded", async () => {
    const uid = localStorage.getItem("uid"); // 로그인 시 저장된 사용자 UID 가져오기

    // UID가 없을 경우 로그인 페이지로 리다이렉트
    if (!uid) {
        console.error("로그인된 사용자 UID가 필요합니다.");
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "login.html"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        return;
    }

    // 사용자의 게시물 가져오기
    try {
        // 'Post' 경로에서 게시물 데이터 가져오기
        const postsRef = ref(database, "Post"); // Firebase 경로 참조 생성
        const snapshot = await get(postsRef); // 해당 경로의 데이터를 가져옴

        // HTML의 'myposts-list' 요소 가져오기
        const myPostsTable = document.getElementById("myposts-list"); // 게시물 목록을 표시할 테이블 요소 가져오기
        if (!myPostsTable) {
            console.error("게시물 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        myPostsTable.innerHTML = ''; // 기존 게시물 초기화

        const myPosts = []; // 사용자 게시물을 저장할 배열 초기화

        // Firebase에서 가져온 데이터 순회
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val(); // 각 게시물 데이터 가져오기
            const postId = childSnapshot.key; // 게시물의 고유 ID 가져오기

            // 로그인한 사용자가 작성한 게시글만 필터링
            if (post.authorId === uid) {
                myPosts.push({ ...post, postId }); // 필터링된 게시물 배열에 추가
            }
        });

        // 사용자가 작성한 게시물이 없을 경우
        if (myPosts.length === 0) {
            // 게시물이 없으면 안내 메시지 표시
            const emptyRow = document.createElement('tr'); // 빈 행 생성
            const emptyCell = document.createElement('td'); // 빈 셀 생성
            emptyCell.colSpan = 4; // 4개의 열을 차지하도록 설정
            emptyCell.textContent = "작성한 게시물이 없습니다."; // 안내 메시지 설정
            emptyRow.appendChild(emptyCell); // 빈 셀을 빈 행에 추가
            myPostsTable.appendChild(emptyRow); // 빈 행을 테이블에 추가
        } else {
            // 게시물이 있을 경우 테이블에 추가
            myPosts.forEach((post, index) => {
                const rowElement = document.createElement('tr'); // 행 요소 생성
                
                // 번호 셀 생성 및 추가
                const numberCell = document.createElement('td');
                numberCell.textContent = index + 1; // 번호 설정 (1부터 시작)
                rowElement.appendChild(numberCell);

                // 제목 셀 생성 및 추가
                const titleCell = document.createElement('td');
                const titleLink = document.createElement('a');
                titleLink.href = `protectPost.html?pid=${post.postId}`; // 게시물 링크 설정 (게시물 ID 포함)
                titleLink.textContent = post.title; // 제목 설정
                titleCell.appendChild(titleLink); // 링크를 제목 셀에 추가
                rowElement.appendChild(titleCell);

                // 작성자 닉네임 셀 생성 및 추가
                const authorCell = document.createElement('td');
                authorCell.textContent = authorNickname;
                rowElement.appendChild(authorCell);

                // 작성일 셀 생성 및 추가
                const dateCell = document.createElement('td');
                dateCell.textContent = post.date || '작성일 없음'; // 작성일 설정
                rowElement.appendChild(dateCell);

                // 테이블에 행 추가
                myPostsTable.appendChild(rowElement);
            });
        }
    } catch (error) {
        console.error("데이터 가져오기 오류:", error); // 데이터 가져오기 오류 발생 시 콘솔에 출력
        alert("게시물을 불러오는 중 오류가 발생했습니다."); // 오류 발생 시 사용자에게 알림
    }
});
