
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
const auth = firebase.getAuth(app);


var db = firebase.firestore(app);


function getItems(){
    // const user = auth.currentUser;
    const user1 = localStorage.getItem('user1');
    db.collection("todo-items",user1,"to_do").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items",user,"to_do").replaceChildren(...todoItems);
}



function addItem(event){
    const user1 = localStorage.getItem('user1');
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items",user1,"to_do").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    // const user = auth.currentUser;
    const user1 = localStorage.getItem('user1');
    let item = db.collection("todo-items",user1,"to_do").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();
