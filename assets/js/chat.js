import { database } from "./DB.js"; // Firebase DB import
import { ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

    // 이전 메시지를 초기화
    messages.innerHTML = '';

    // 현재 사용자와의 채팅 메시지 불러오기
    const currentUserId = localStorage.getItem('uid');
    if (!currentUserId) {
        alert('로그인 후 이용 가능합니다.');
        return;
    }

    const chatID = generateChatID(currentUserId, user); // 채팅 ID 생성
    const messagesRef = ref(database, `Message/${chatID}`);

    // 메시지 실시간 수신
    onValue(messagesRef, (snapshot) => {
        messages.innerHTML = ''; // 메시지 초기화
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const messageData = childSnapshot.val();
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.textContent = `${messageData.senderID === currentUserId ? '나' : user}: ${messageData.messageContent}`;
                messages.appendChild(messageElement);
            });
            // 스크롤을 최신 메시지로 이동
            messages.scrollTop = messages.scrollHeight;
        }
    });

    // 팝업 표시
    chatPopup.classList.remove('hidden');
}

// 메시지 전송
function sendPopupMessage() {
    const messageInput = document.getElementById('popup-message-input');
    const message = messageInput.value.trim(); // 입력된 메시지를 가져옵니다.

    // 입력된 메시지가 비어있을 경우 처리
    if (message === '') {
        alert('메시지를 입력하세요!');
        return; // 메시지가 비어있다면 추가하지 않음
    }

    const currentUserId = localStorage.getItem('uid');
    const user = document.getElementById('popup-chat-title').textContent.split('와의 채팅')[0]; // 사용자 이름 추출
    if (!currentUserId) {
        alert('로그인 후 이용 가능합니다.');
        return;
    }

    const chatID = generateChatID(currentUserId, user); // 채팅 ID 생성
    const newMessageRef = push(ref(database, `Message/${chatID}`));

    // 메시지 데이터를 Firebase에 저장
    const newMessage = {
        senderID: currentUserId,
        receiverID: user,
        messageContent: message,
        timeStamp: new Date().toISOString()
    };

    set(newMessageRef, newMessage)
        .then(() => {
            console.log('메시지가 성공적으로 전송되었습니다.');
        })
        .catch((error) => {
            console.error('메시지 전송 중 오류 발생:', error);
        });

    // 메시지 입력 필드 초기화
    messageInput.value = '';

    // 스크롤을 최신 메시지로 이동
    const messageContainer = document.getElementById('popup-messages');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 채팅 ID 생성 함수 (두 사용자 ID를 기준으로 고유한 채팅 ID 생성)
function generateChatID(user1, user2) {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
}

// 메시지 전송 버튼 이벤트 추가
document.getElementById('popup-message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendPopupMessage();
    }
});

