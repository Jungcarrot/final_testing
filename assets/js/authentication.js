document.addEventListener("DOMContentLoaded", () => {
    // Firebase 구성 정보 및 초기화
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
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const loginForm = document.querySelector("form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const loginID = document.getElementById("loginID").value.trim();
            const password = document.getElementById("password").value.trim();

            try {
                // Firebase Authentication을 사용한 로그인 예제
                const auth = firebase.auth();
                const userCredential = await auth.signInWithEmailAndPassword(loginID, password);

                if (userCredential.user) {
                    localStorage.setItem("userLoggedIn", "true");
                    alert("로그인 성공!");
                    window.location.href = "index.html";
                }
            } catch (error) {
                console.error("로그인 중 오류 발생:", error);
                alert("로그인 실패: " + error.message);
            }
        });
    }
});

