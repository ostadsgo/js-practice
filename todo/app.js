// container for all todos
let allTodos = [];
let IdOfLastTodo = 0;

// elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Events
document.addEventListener("DOMContentLoaded", readTodosFromDb);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

function createTodo(todoItem) {
  // A TODO - UI
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // id
  todoId = document.createElement("i");
  todoId.innerText = todoItem["id"];
  todoId.classList.add("todo-id");
  todoDiv.append(todoId);
  // the Todo Text
  const newTodo = document.createElement("li");
  newTodo.innerText = todoItem["text"];
  newTodo.classList.add("todo-text");
  todoDiv.appendChild(newTodo);
  // Check Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></li>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trashcan button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<li class='fas fa-trash'></li>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append todo to the todoList(ul)
  todoList.appendChild(todoDiv);
  // clear todoInput
  todoInput.value = "";
  todoInput.focus();
  // remove and check mark for trash btn and complete btn
  trashButton.addEventListener("click", removeTodo);
  completedButton.addEventListener("click", completeTodo);
  // console.log(allTodos);
}
// Functions for ui
function addTodo(event) {
  // prevent form content to send backend.
  event.preventDefault();

  // A TODO - UI
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // id
  newId = document.createElement("i");
  newId.innerText = IdOfLastTodo;
  newId.classList.add("todo-id");
  todoDiv.append(newId);
  // the Todo Text
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-text");
  todoDiv.appendChild(newTodo);
  // Check Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></li>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Trashcan button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<li class='fas fa-trash'></li>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append todo to the todoList(ul)
  todoList.appendChild(todoDiv);
  // clear todoInput
  todoInput.value = "";
  todoInput.focus();

  // save newTodo in the allTodos array
  const todoText = newTodo.innerText;
  const todo = { id: IdOfLastTodo, text: todoText, status: "active" };
  allTodos.push(todo);

  // remove and check mark for trash btn and complete btn
  trashButton.addEventListener("click", removeTodo);
  completedButton.addEventListener("click", completeTodo);
  // console.log(allTodos);
  IdOfLastTodo++;

  // save todo on the local storage
  saveTodoOnDb(todo);
}

function removeTodo(event) {
  const trashButton = event.target;
  const todo = trashButton.parentElement;
  todo.classList.add("fall"); // class for animation
  // wait until animation get done
  todo.addEventListener("transitionend", () => todo.remove());
  const todoId = parseInt(todo.childNodes[0].innerText);
  removeTodoFromDb(todoId);
}

function completeTodo(event) {
  const checkButton = event.target;
  const todo = checkButton.parentElement;
  todo.classList.toggle("completed");
  // Change status of the todo to completed.
  const todoId = parseInt(todo.childNodes[0].innerText);
  const isComplete = todo.classList.contains("completed");
  // find the todo with the id from all todos
  let todoItem;
  for (todoItem of allTodos) {
    if (todoItem["id"] === todoId && isComplete) {
      todoItem["status"] = "completed";
      break;
    }

    if (todoItem["id"] === todoId && !isComplete) {
      todoItem["status"] = "active";
      break;
    }
  }
  saveTodoOnDb(todoItem);
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  const selectedOption = event.target.value;
  for (let todo of todos) {
    if (selectedOption === "all") todo.style.display = "flex";
    else if (
      selectedOption === "completed" &&
      todo.classList.contains("completed")
    )
      todo.style.display = "flex";
    else if (
      selectedOption === "uncompleted" &&
      !todo.classList.contains("completed")
    )
      todo.style.display = "flex";
    else todo.style.display = "none";
  }
}

// Local Storage
// ---------------
function readTodosFromDb() {
  if (localStorage.getItem("todos") != null) {
    allTodos = JSON.parse(localStorage.getItem("todos"));
    lastTodo = allTodos.at(-1);
    IdOfLastTodo = ++lastTodo["id"];
  } else {
    allTodos = [];
  }
  // display todos have been red from db
  for (let todo of allTodos) {
    createTodo(todo);
  }
}

function saveTodoOnDb(todo) {
  if (localStorage.getItem("todos") === null) allTodos = [];
  else allTodos = JSON.parse(localStorage.getItem("todos"));
  allTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function saveTodosOnDb() {
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function removeTodoFromDb(todoId) {
  let index = 0;
  for (let todoItem of allTodos) {
    if (todoItem["id"] === todoId) {
      allTodos.splice(index, 1);
      saveTodosOnDb();
      break;
    }
    index++;
  }

  // Save all todos after deleted a todo
}

function completeTodoOnDb(todo) {}
