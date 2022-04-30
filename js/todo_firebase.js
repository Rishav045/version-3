var firebaseConfig = {
    apiKey: "AIzaSyB2FxCzHJ3LNK-uSJEQ-pNxwmyRoZu9dVE",
      authDomain: "system-688a2.firebaseapp.com",
    
      projectId: "system-688a2",
      storageBucket: "system-688a2.appspot.com",
      messagingSenderId: "693102082383",
      appId: "1:693102082383:web:7dc992794907cfd1f4ad3a"
};

// firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
// const auth = firebase.getAuth(app);


var db = firebase.firestore(app);