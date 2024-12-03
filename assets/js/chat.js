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

    // 예시: 저장된 메시지를 가져와서 화면에 표시
    const storedMessages = getStoredMessages(user);  // 예시로 로컬 저장소에서 메시지 불러오기
    storedMessages.forEach((messageData) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message'); // 메시지 스타일링을 위한 클래스 추가
        messageElement.textContent = messageData.message;
        messages.appendChild(messageElement);
    });

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

    // 메시지를 로컬 스토리지에 저장 (Firebase 대신)
    const user = document.getElementById('popup-chat-title').textContent.split('와의 채팅')[0]; // 사용자 이름 추출
    saveMessageToLocal(user, message);

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

// 메시지를 로컬 스토리지에 저장 (예시)
function saveMessageToLocal(user, message) {
    const chatKey = 'chat_' + user; // 사용자 이름을 키로 사용
    let chatMessages = JSON.parse(localStorage.getItem(chatKey)) || []; // 기존 메시지 가져오기

    // 새로운 메시지를 추가
    chatMessages.push({ message: message, timestamp: Date.now() });

    // 로컬 스토리지에 다시 저장
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));
}

// 로컬 스토리지에서 메시지를 불러오기 (예시)
function getStoredMessages(user) {
    const chatKey = 'chat_' + user; // 사용자 이름을 키로 사용
    return JSON.parse(localStorage.getItem(chatKey)) || []; // 저장된 메시지 반환, 없으면 빈 배열 반환
}
