//db.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Firebase 연결 확인
const connectedRef = ref(database, '.info/connected');
onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
        console.log('Firebase에 연결되었습니다.');
    } else {
        console.log('Firebase 연결이 끊어졌습니다.');
    }
});

    export { database };  // 데이터베이스 객체를 export
chat.js
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
    chatTitle.textContent = ${user와의 채팅};

    // 이전 메시지를 지우지 않으려면 아래 줄 주석 처리
    messages.innerHTML = ''; // 채팅 메시지 초기화

    // 팝업 표시
    chatPopup.classList.remove('hidden');
}

// 메시지 전송
// 채팅 메시지 추가 함수
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
