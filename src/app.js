// app.js - 待辦事項管理系統

class TodoList {
    constructor() {
        this.todos = [];
        this.filter = 'all';    
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveTodos();
    }

    setFilter(filter) {
        this.filter = filter;
        this.saveTodos();
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.saveTodos();
    }

    getFilteredTodos() {
        return this.todos.filter(todo => todo.filter === this.filter);
    }
    
    getTodos() {
        return this.todos;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.saveTodos();
    }
    
    
    clearTodos() {
        this.todos = [];
        localStorage.removeItem('todos');
        this.saveTodos();
    }
    
    renderTodos() {
        const todos = this.getFilteredTodos();
        const todoList = document.getElementById('todo-list');
        if (todoList) {
            todoList.innerHTML = todos.map(todo => `<li>${todo.text}</li>`).join('');
        }
        return todos.length;
    }
    renderFilter() {
        const filterList = document.getElementById('filter-list');
        if (filterList) {
            filterList.innerHTML = ['all', 'active', 'completed'].map(filter => `<li>${filter}</li>`).join('');
        }
    }       
    render() {
        this.renderTodos();
        this.renderFilter();
    }
}

const todoList = new TodoList();
todoList.addTodo('Buy groceries');
todoList.addTodo('Buy groceries');
todoList.render();
document.addEventListener('DOMContentLoaded', () => {
    todoList.render();
});
document.getElementById('add-todo').addEventListener('click', () => {
    const todo = document.getElementById('todo-input').value;
    todoList.addTodo(todo);
    todoList.render();
});
document.getElementById('filter-list').addEventListener('click', (event) => {
    const filter = event.target.textContent;
    todoList.setFilter(filter);
    todoList.render();
});
document.getElementById('clear-todos').addEventListener('click', () => {
    todoList.clearTodos();
    todoList.render();
});     
document.getElementById('delete-todo').addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    todoList.deleteTodo(index);
    todoList.render();
});
document.getElementById('todo-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const todo = document.getElementById('todo-input').value;
        todoList.addTodo(todo);
        todoList.render();
    }
}); 
document.getElementById('filter-list').addEventListener('click', (event) => {
    const filter = event.target.textContent;
    todoList.setFilter(filter);
    todoList.render();
});
document.getElementById('clear-todos').addEventListener('click', () => {
    todoList.clearTodos();
    todoList.render();
});     
document.getElementById('delete-todo').addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    todoList.deleteTodo(index);
    todoList.render();
}); 