import { getPosts } from "./DB.js";

document.addEventListener("DOMContentLoaded", () => {
    const postListContainer = document.getElementById("postList"); // 게시글 목록 컨테이너

    // 게시글 목록 렌더링
    function renderPostList(posts) {
        postListContainer.innerHTML = ""; // 기존 목록 초기화

        if (posts.length === 0) {
            postListContainer.innerHTML = "<p>작성된 게시글이 없습니다.</p>";
        } else {
            posts.forEach((post) => {
                const postElement = document.createElement("div");
                postElement.className = "post-card";
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 100)}...</p>
                    <p>작성자: ${post.author}</p>
                    <button onclick="viewPost('${post.id}')">게시글 보기</button>
                `;
                postListContainer.appendChild(postElement);
            });
        }
    }

    // 게시글 보기 버튼 클릭 시 상세 페이지로 이동
    window.viewPost = function (postID) {
        window.location.href = `findList.html?id=${postID}`;
    };

    // Firebase에서 게시글 가져오기
    getPosts(renderPostList);
});
