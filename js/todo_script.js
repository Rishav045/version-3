const userId1= localStorage.getItem('user1');
console.log(userId1);
function getItems(){
    // const user = auth.currentUser;
    db.collection(userId1).onSnapshot((snapshot) => {
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
        //Adding delete button in todo
        let deleteItem = document.createElement("BUTTON");
        deleteItem.innerText="delete"
        deleteItem.classList.add("deletebtn");
        checkMark.innerHTML = '<img src="../component/assets/icon-check.svg">';
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
        todoItem.appendChild(deleteItem);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    // const user = auth.currentUser;
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection(userId1).add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    // const user = auth.currentUser;
    let item = db.collection(userId1).doc(id);
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
