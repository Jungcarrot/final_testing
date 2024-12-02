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
