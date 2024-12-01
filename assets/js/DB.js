import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase 구성 정보
const firebaseConfig = {
    apiKey: "AIzaSyAHSA0O4V9vnc5E1YvQNpQTZT5z4QOWE1k",
    authDomain: "software-89c07.firebaseapp.com",
    databaseURL: "https://software-89c07-default-rtdb.firebaseio.com",
    projectId: "software-89c07",
    storageBucket: "software-89c07.appspot.com",
    messagingSenderId: "567506244346",
    appId: "1:567506244346:web:a22bba69dd21ae59146f43",
    measurementId: "G-KQT14W936Y"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 게시글 저장
export function savePost(title, content, authorID) {
    const postRef = push(ref(database, 'posts')); // 고유 postID 생성
    const postID = postRef.key;

    set(postRef, {
        title: title,
        content: content,
        author: authorID,
        createdAt: new Date().toISOString(),
        comments: {} // 댓글 초기화
    })
        .then(() => {
            console.log("게시글 저장 완료");
        })
        .catch((error) => {
            console.error("게시글 저장 실패:", error);
        });
}

// 댓글 저장
export function saveComment(postID, commentAuthor, commentContent) {
    const commentRef = push(ref(database, `posts/${postID}/comments`)); // 특정 게시글의 댓글 경로
    const commentID = commentRef.key;

    set(commentRef, {
        author: commentAuthor,
        content: commentContent,
        createdAt: new Date().toISOString()
    })
        .then(() => {
            console.log("댓글 저장 완료");
        })
        .catch((error) => {
            console.error("댓글 저장 실패:", error);
        });
}

// 게시글 가져오기
export function getPosts(callback) {
    const postListRef = ref(database, 'posts');
    onValue(postListRef, (snapshot) => {
        const posts = [];
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            post.id = childSnapshot.key;
            posts.push(post);
        });
        callback(posts);
    });
}

// 특정 게시글 가져오기
export function getPostById(postID, callback) {
    const postRef = ref(database, `posts/${postID}`);
    onValue(postRef, (snapshot) => {
        if (snapshot.exists()) {
            const post = snapshot.val();
            post.id = postID;
            callback(post);
        } else {
            callback(null);
        }
    });
}

export { database };  // 데이터베이스 객체를 export
