const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


// Functions

// create a todo when user click on addButton
function addTodo(event) {
    // prevent form content to send backend.
    event.preventDefault();
    
    // container for todo aka todo row
    // contains todo-item del btn and check btn 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    // the todo text
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-text");
    todoDiv.appendChild(newTodo);

    // check button to compelete the todo
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></li>"
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<li class='fas fa-trash'></li>"
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append todo to the todoList(ul)
    todoList.appendChild(todoDiv);
    // clear todoInput
    todoInput.innerText = "";
    
    // remove and check mark for trash btn and complete btn
    trashButton.addEventListener("click", removeTodo);
    completedButton.addEventListener("click", completeTodo);
}

// remove a todo when user click on trash button
function removeTodo(event) {
    const trashButton = event.target;
    // the todo we want to remove
    const todo = trashButton.parentElement;
    todo.remove();
}

function completeTodo(event) {
    const checkButton = event.target;
    const todo = checkButton.parentElement;
    todo.classList.toggle("completed");
}

// Events
todoButton.addEventListener("click", addTodo);

