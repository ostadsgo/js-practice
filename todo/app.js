// container for all todos
let allTodos = [];
let lastId = 0;

// elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Events
document.addEventListener("DOMContentLoaded", showTodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

function createTodo(todoItem) {
  // A TODO - UI
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.classList.add(todoItem["status"]);
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
  const todoId = newTodoId();
  const todoText = todoInput.value;
  const todoStatus = "active";
  const todoItem = { id: todoId, text: todoText, status: todoStatus };
  createTodo(todoItem);
  // save todo on the local storage
  saveTodoOnDb(todoItem);
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
  const isCompleted = todo.classList.contains("completed");
  if (isCompleted) updateStatus(todoId, "completed");
  else updateStatus(todoId, "active");
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  const selectedOption = event.target.value;
  for (let todo of todos) {
    const isCompleted = todo.classList.contains("completed");
    if (selectedOption === "all") todo.style.display = "flex";
    else if (selectedOption === "completed" && isCompleted)
      todo.style.display = "flex";
    else if (selectedOption === "uncompleted" && !isCompleted)
      todo.style.display = "flex";
    else todo.style.display = "none";
  }
}

// if there isn't a local storage create empty one.
// Local Storage
// ---------------
function indexOfTodo(todos, todoId) {
  let index = 0;
  for (let todo of todos) {
    if (todo["id"] === todoId) return index;
    index++;
  }
}

function readTodos(storageName = "todos") {
  // if there is a local storge name todos
  let allTodos = [];
  if (localStorage.getItem(storageName) != null)
    allTodos = JSON.parse(localStorage.getItem(storageName));
  else localStorage.setItem(storageName, JSON.stringify(allTodos));
  return allTodos;
}

function newTodoId() {
  const allTodos = readTodos();
  let lastId = 0;
  if (allTodos.length > 0) {
    const lastTodo = allTodos.at(-1);
    lastId = lastTodo["id"];
  }
  return ++lastId;
}

function showTodos() {
  // display todos have been red from db
  let allTodos = readTodos();
  for (let todo of allTodos) {
    createTodo(todo);
  }
}

function saveTodoOnDb(todo) {
  let allTodos = readTodos();
  allTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

function saveTodos(todos) {
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromDb(todoId) {
  let allTodos = readTodos();
  let index = indexOfTodo(allTodos, todoId);
  allTodos.splice(index, 1);
  saveTodos(allTodos);
}

function updateStatus(todoId, status) {
  const allTodos = readTodos();
  const index = indexOfTodo(allTodos, todoId);
  const todo = allTodos[index];
  todo["status"] = status;
  saveTodos(allTodos);
}
