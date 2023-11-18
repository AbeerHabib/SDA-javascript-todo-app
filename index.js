const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-btn");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todos");
const totalTodosCounter = document.getElementById("total-todos");
const completedTodosCounter = document.getElementById("completed-todos");
const AllTodosButton = document.getElementById("all-btn");
const activeTodosButton = document.getElementById("active-btn");
const completedTodosButton = document.getElementById("completed-btn");
const counter = document.querySelector("#counter");

let todos = [];

const addTodo = (event) => {
    event.preventDefault();
    const description = todoInput.value;
    const todo = {
        description: description,
        completed: false
    }
    todos.push(todo);    
    listTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoForm.reset();
}

const listTodos = (todos) => {
    todoList.innerText = '';

    let activeCount = 0;
    let completeCount = 0;

    for (let i = 0 ; i < todos.length; i++) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem');

        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        todoCheckbox.checked = todos[i].completed;
        todoCheckbox.setAttribute("id", "checkbox");
        todoCheckbox.addEventListener('change', () => toggleComplete(i));
        todoItem.appendChild(todoCheckbox);

        const description = document.createElement('p');
        description.textContent = todos[i].description;
        description.classList.add('description');
        description.classList.toggle('completed', todos[i].completed);
        todoItem.appendChild(description);
            
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTodo(i));
        editBtn.classList.add('edit-btn');
        todoItem.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTodo);
        deleteBtn.classList.add('delete-btn');
        todoItem.appendChild(deleteBtn);
            
        todoList.appendChild(todoItem);

        if(todos[i].completed) {
            completeCount++;
        }
        else {
            activeCount++;
        }
    }

    totalTodosCounter.innerText = todos.length;
    completedTodosCounter.innerText = completeCount;
}

const editTodo = (i) => {
    const text = prompt('update the Todo: ', todos[i].description);
    if (text) {
        todos[i].description = text;
        localStorage.setItem('todos', JSON.stringify(todos));
        listTodos(todos);
    }
    else {
        alert('Todo cannot be empty.');
    }
}

const deleteTodo = (i) => {
    todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    listTodos(todos);
    totalTodosCounter.innerText = todos.length;
}

const toggleComplete = (i) => {
    todos[i].completed = !todos[i].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    listTodos(todos);
}

const allTodos = () => {
    listTodos(todos);
    counter.style.display = 'block';
}

const completedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    listTodos(completedTodos);
    counter.style.display = 'none';
}

const activeTodos = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    listTodos(activeTodos);
    counter.style.display = 'none';
}

todoForm.addEventListener('submit', addTodo);
completedTodosButton.addEventListener('click', () => completedTodos());
activeTodosButton.addEventListener('click', () => activeTodos());
AllTodosButton.addEventListener('click', () => allTodos());

const todosFromLocalStorage = localStorage.getItem('todos');
if (todosFromLocalStorage) {
    todos = JSON.parse(todosFromLocalStorage);
    listTodos(todos);
}