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

    // 채팅 메시지 실시간 로드 (Firebase 연결)
    const chatId = `${localStorage.getItem('uid')}-${user}`; // 현재 사용자와 상대방의 조합으로 채팅 ID 생성
    const messagesRef = ref(db, `chatSummary/${chatId}/messages`);

    // 메시지 업데이트
    onValue(messagesRef, (snapshot) => {
        const messagesData = snapshot.val() || {};
        messages.innerHTML = ''; // 기존 메시지 초기화

        // 메시지 순회하여 표시
        for (let messageId in messagesData) {
            const message = messagesData[messageId].messageContent;
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message'); // 메시지 스타일링을 위한 클래스 추가
            messageElement.textContent = message;
            messages.appendChild(messageElement);
        }

        // 스크롤을 최신 메시지로 이동
        messages.scrollTop = messages.scrollHeight;
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

    const userId = localStorage.getItem('uid');
    const chatId = `${userId}-${messageInput.dataset.receiverId}`; // 채팅 ID 생성 (현재 사용자와 상대방 ID로 구분)
    const newMessageRef = push(ref(db, `chatSummary/${chatId}/messages`)); // Firebase에 메시지 추가

    // Firebase에 메시지 저장
    newMessageRef.set({
        senderID: userId,
        receiverID: messageInput.dataset.receiverId,
        messageContent: message,
        timeStamp: new Date().toISOString(),
    }).then(() => {
        messageInput.value = ''; // 메시지 입력 필드 초기화
    }).catch((error) => {
        console.error("메시지 전송 중 오류 발생:", error);
        alert("메시지 전송 실패.");
    });
}
