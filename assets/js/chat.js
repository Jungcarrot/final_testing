// chat.js

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

    // 팝업 표시
    chatPopup.classList.remove('hidden');
}

// 메시지 전송
function sendPopupMessage() {
    const messageInput = document.getElementById('popup-message-input');
    const messageContainer = document.getElementById('popup-messages');
    const message = messageInput.value.trim(); // 입력된 메시지를 가져옵니다.

    // 입력된 메시지가 비어있을 경우 처리
    if (message === '') {
        alert('메시지를 입력하세요!');
        return; // 메시지가 비어있다면 추가하지 않음
    }

    // 새로운 메시지를 화면에 추가
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message'); // 메시지 스타일링을 위한 클래스 추가
    messageElement.textContent = message;

    // 메시지를 메시지 컨테이너에 추가
    messageContainer.appendChild(messageElement);

    // 메시지 입력 필드 초기화
    messageInput.value = '';

    // 스크롤을 최신 메시지로 이동
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Firebase에서 채팅 데이터 가져오기
function loadChatMessages(chatId) {
    // Firebase에서 채팅 메시지 로드하는 코드 추가
    // 예시: firebase.database().ref('chats/' + chatId).on('child_added', function(snapshot) {
    //   const messageData = snapshot.val();
    //   // 메시지 추가 로직
    // });
}
