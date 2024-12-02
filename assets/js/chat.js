// chat.js

// Firebase 초기화
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 팝업 채팅창 닫기
function closeChatPopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.add('hidden');
}

// 팝업 채팅창 열기
function openChatPopup(user) {
    const chatPopup = document.getElementById('chat-popup');
    const chatTitle = document.getElementById('popup-chat-title');
    const messages = document.getElementById('popup-messages');

    // 채팅창 제목 업데이트
    chatTitle.textContent = `${user}와의 채팅`;

    // 이전 메시지를 지우지 않으려면 아래 줄 주석 처리
    messages.innerHTML = ''; // 채팅 메시지 초기화

    // Firebase에서 메시지 로드
    const chatRoomId = "chatRoom1"; // 예: 동적으로 채팅방 ID 설정 가능
    loadChatMessages(chatRoomId);

    // 팝업 표시
    chatPopup.classList.remove('hidden');
}

// 메시지 전송
function sendPopupMessage() {
    const messageInput = document.getElementById('popup-message-input');
    const messageContainer = document.getElementById('popup-messages');
    const message = messageInput.value.trim(); // 입력된 메시지를 가져옵니다.
    const chatRoomId = "chatRoom1"; // 예: 채팅방 ID (동적으로 변경 가능)
    const sender = "currentUser"; // 예: 현재 사용자 이름 또는 ID (동적으로 가져오기)

    if (message === '') {
        alert('메시지를 입력하세요!');
        return; // 메시지가 비어있다면 추가하지 않음
    }

    // Firebase에 메시지 추가
    const chatRef = ref(db, `chats/${chatRoomId}/messages`);
    push(chatRef, {
        sender: sender,
        content: message,
        timestamp: Date.now()
    });

    // 메시지 입력 필드 초기화
    messageInput.value = '';
}

// Firebase에서 채팅 메시지 로드
function loadChatMessages(chatRoomId) {
    const chatRef = ref(db, `chats/${chatRoomId}/messages`);

    // Firebase에서 새로운 메시지를 수신할 때마다 실행
    onChildAdded(chatRef, (snapshot) => {
        const messageData = snapshot.val();
        const messageContainer = document.getElementById('popup-messages');

        // 새로운 메시지를 화면에 추가
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<strong>${messageData.sender}</strong>: ${messageData.content}`;

        messageContainer.appendChild(messageElement);

        // 스크롤을 최신 메시지로 이동
        messageContainer.scrollTop = messageContainer.scrollHeight;
    });
}
