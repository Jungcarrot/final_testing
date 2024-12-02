import { database } from "./DB.js";
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.post-table tbody');
    const noPostsMessage = document.querySelector('.no-posts');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    const postsRef = ref(database, 'Post');
    onValue(postsRef, async (snapshot) => {
        let posts = [];
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            if (post.category === '발견') {
                posts.push({ ...post, id: childSnapshot.key });
            }
        });

        // 작성일을 기준으로 내림차순 정렬
        posts.sort((a, b) => {
            const dateA = parseKoreanDate(a.date);
            const dateB = parseKoreanDate(b.date);
            return dateB - dateA;
        });

        // 작성자 정보 추가
        const userSnapshots = await Promise.all(posts.map(post => get(ref(database, `UserData/${post.authorId}`))));
        posts = posts.map((post, index) => {
            const snapshot = userSnapshots[index];
            if (snapshot.exists()) {
                return {
                    ...post,
                    authorNickname: snapshot.val().nickName || 'Unknown'
                };
            }
            return {
                ...post,
                authorNickname: 'Unknown'
            };
        });

        renderPosts(posts);

        function renderPosts(filteredPosts) {
            tableBody.innerHTML = '';
            if (filteredPosts.length === 0) {
                noPostsMessage.style.display = 'block';
            } else {
                noPostsMessage.style.display = 'none';
                filteredPosts.forEach((post, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td><a href="findPost.html?pid=${post.id}">${post.title}</a></td>
                            <td>${post.authorNickname}</td>
                            <td>${post.date}</td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            }
        }

        function filterPosts() {
            const query = searchInput.value.trim().toLowerCase();
            const filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(query)
            );
            renderPosts(filteredPosts);
        }

        searchButton.addEventListener('click', filterPosts);
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                filterPosts();
            }
        });
    });

    function parseKoreanDate(koreanDateStr) {
        const regex = /(\d{4})\.\s(\d{1,2})\.\s(\d{1,2})\.\s(오전|오후)\s(\d{1,2}):(\d{2}):(\d{2})/;
        const match = koreanDateStr.match(regex);
        if (!match) return new Date(0);

        let [_, year, month, day, meridiem, hour, minute, second] = match;
        year = parseInt(year);
        month = parseInt(month) - 1;
        day = parseInt(day);
        hour = parseInt(hour);
        minute = parseInt(minute);
        second = parseInt(second);

        if (meridiem === '오후' && hour !== 12) {
            hour += 12;
        } else if (meridiem === '오전' && hour === 12) {
            hour = 0;
        }

        return new Date(year, month, day, hour, minute, second);
    }
});
