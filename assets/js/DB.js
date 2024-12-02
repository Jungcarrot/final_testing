import { db } from './DB.js';
import { ref, push, onChildAdded } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';

// 현재 사용자 및 채팅방 정보
const currentUserId = "currentUser"; // 사용자 ID (로그인 구현 시 동적으로 변경 필요)
let currentChatRoomId = null; // 현재 활성화된 채팅방 ID

// 팝업 채팅창 열기
function openChatPopup(user) {
    const chatPopup = document.getElementById('chat-popup');
    const chatTitle = document.getElementById('popup-chat-title');
    const messages = document.getElementById('popup-messages');

    // 채팅창 제목 업데이트
    chatTitle.textContent = `${user}와의 채팅`;
    messages.innerHTML = ''; // 기존 메시지 초기화

    // 채팅방 ID 설정 (여기선 간단히 user와 currentUserId를 합침)
    currentChatRoomId = `${currentUserId}_${user}`;

    // Firebase에서 기존 메시지 불러오기
    const messagesRef = ref(db, `chats/${currentChatRoomId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
        const messageData = snapshot.val();
        displayMessage(messageData.sender, messageData.content);
    });

    // 팝업 표시
    chatPopup.classList.remove('hidden');
}

// 메시지 전송
function sendPopupMessage() {
    const messageInput = document.getElementById('popup-message-input');
    const message = messageInput.value.trim();

    if (message === '') {
        alert('메시지를 입력하세요!');
        return;
    }

    // Firebase에 메시지 저장
    const messagesRef = ref(db, `chats/${currentChatRoomId}/messages`);
    push(messagesRef, {
        sender: currentUserId,
        content: message,
        timestamp: Date.now(),
    });

    // 입력 필드 초기화
    messageInput.value = '';
}

// 화면에 메시지 표시
function displayMessage(sender, content) {
    const messageContainer = document.getElementById('popup-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.textContent = `${sender}: ${content}`;
    messageContainer.appendChild(messageElement);

    // 스크롤을 최신 메시지로 이동
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 팝업 채팅창 닫기
function closeChatPopup() {
    const chatPopup = document.getElementById('chat-popup');
    chatPopup.classList.add('hidden');
    currentChatRoomId = null; // 현재 채팅방 ID 초기화
}
