const todos = [];
let filterButtonIsPresent = false;
let filterValue = "all";

document.getElementById("new-todo").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const newTodoInput = document.getElementById("new-todo");
        const todoText = newTodoInput.value.trim();
        if (todoText === "") return;

        addTodo(todoText);
        newTodoInput.value = "";
        if(!filterButtonIsPresent) {
            const filterButton = createFilterButton();
            newTodoInput.after(filterButton);
            filterButtonIsPresent = true;
        }
        renderFilter();
    }
});

function renderTodos(todoList) {
    const todoListUl = document.getElementById("todo-list");

    todoListUl.innerHTML = "";

    for (const todo of todoList) {
        const todoItemLi = document.createElement("li");
        todoItemLi.textContent = todo.text;

        if (!todo.done) {
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Concluir";
            markTodoAsDoneButton.onclick = function () {
                markTodoAsDone(todo.id);
                renderFilter();
            };
            todoItemLi.appendChild(markTodoAsDoneButton);
        } else {
            todoItemLi.style.textDecoration = "line-through";
        } 

        todoListUl.appendChild(todoItemLi);
    }
}

function renderFilter() {
    if (filterValue === "all") {
        renderTodos(todos);
    } else if (filterValue === "pending") {
        const pendingTodos = todos.filter((todo) => !todo.done);
        renderTodos(pendingTodos);
    } else if (filterValue === "done") {
        const doneTodos = todos.filter((todo) => todo.done);
        renderTodos(doneTodos);
    }
}

function addTodo(todoText) {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: todoText,
        done: false,
    };

    todos.push(newTodo);
}

function markTodoAsDone(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.done = true;
}

function createFilterButton() {
    const filterButton = document.createElement("select");
    filterButton.appendChild(new Option("Todas", "all"));
    filterButton.appendChild(new Option("Pendentes", "pending"));
    filterButton.appendChild(new Option("Concluídas", "done"));
    filterButton.onchange = function () {
        filterValue = filterButton.value;
        renderFilter();
    };
    return filterButton;
}

renderTodos(todos);
