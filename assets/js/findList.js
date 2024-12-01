import { getPostById, saveComment } from "./DB.js";

document.addEventListener("DOMContentLoaded", () => {
    const postID = new URLSearchParams(window.location.search).get("id");
    const postContainer = document.getElementById("post-container");
    const commentContainer = document.getElementById("comment-container");
    const commentForm = document.getElementById("comment-form");

    // 게시글 상세 데이터 렌더링
    function renderPost(post) {
        if (!post) {
            postContainer.innerHTML = "<p>게시글을 찾을 수 없습니다.</p>";
            return;
        }
        postContainer.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <p>작성자: ${post.author}</p>
        `;

        renderComments(post.comments || {});
    }

    // 댓글 데이터 렌더링
    function renderComments(comments) {
        commentContainer.innerHTML = "";
        for (const [commentID, comment] of Object.entries(comments)) {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";
            commentElement.innerHTML = `
                <p>${comment.content}</p>
                <p>작성자: ${comment.author}</p>
                <p>작성일: ${new Date(comment.createdAt).toLocaleString()}</p>
            `;
            commentContainer.appendChild(commentElement);
        }
    }

    // 댓글 작성 이벤트 처리
    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commentAuthor = document.getElementById("comment-author").value;
        const commentContent = document.getElementById("comment-content").value;

        saveComment(postID, commentAuthor, commentContent);
        commentForm.reset();
    });

    // Firebase에서 게시글 데이터 가져오기
    getPostById(postID, renderPost);
});
