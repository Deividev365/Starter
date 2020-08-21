document.body.style.backgroundColor = 'gray';


/*taking my html elements and refereing them into the js file*/
let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');


var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodos() {
    listElement.innerHTML = "";


    for(todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');

        linkElement.setAttribute("href", "#");
        var linkText = document.createTextNode('Excluir');

        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

        linkElement.appendChild(linkText);


        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement)
    }
}

renderTodos();


function addTodo() {
    var todoText = inputElement.value;
    todos.push(todoText);
    inputElement.value = "";

    renderTodos();
    saveToStorage();
}


buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos, 1);
    renderTodos()
    saveToStorage()
}

function saveToStorage() {
    
    localStorage.setItem('list_todos', JSON.stringify(todos));
}
