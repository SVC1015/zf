


// select everything
// select the todo-form
const todoForm = document.querySelector('.todo-form');
// select the input box
const todoInput = document.querySelector('.todo-input');
// select the <ul> with class todo
const todoItemsList = document.querySelector('.todo-items');

//sotre todos
let todos = [];

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
  // prevent the page from reloading when u submit form
  event.preventDefault();
  addTodo(todoInput.value); // call addTodo function with input box??

// function to add todo
function addTodo(item) {
  // if item is not empty
  if (item !== '') {
    // make ur todo object
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // add todo 2 array
    todos.push(todo);
    addToLocalStorage(todos); // store array

    // finally clear the input box value
    todoInput.value = '';
  }
}

// function to render given todos to screen (confusing part)
function renderTodos(todos) {
  // clear everything inside <ul> with class=todo-items [need to learn this]
  todoItemsList.innerHTML = '';

  // run through each item inside todos
  todos.forEach(function(item) {
    // check if the item is completed
    const checked = item.completed ? 'checked': null;

    // make a <li> element and fill it (pretty sure this is how u created list item)
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if item is completed, then add a class to <li> called 'checked', which will cross it out (change format in css)
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finally add the <li> to the <ul> (then add to ls)
    todoItemsList.append(li);
  });

}

// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem('todos', JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

// function helps to get everything from local storage (figure out how to get local storage to clear daily)
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggle the value to completed and not completed
function toggle(id) {
  todos.forEach(function(item) {
    // use == not ===, because here types are different. One is number and other is string 2= not exact same 3= exact same
    if (item.id == id) {
      // toggle the value
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  todos = todos.filter(function(item) {
    // use != not !==, because here types are different. One is number and other is string
    return item.id != id;
  });

  // update the localStorage
  addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click, delete, checkbox
todoItemsList.addEventListener('click', function(event) {
  // check if the event is on checkbox
  if (event.target.type === 'checkbox') {
    // toggle the state (if checked then different attribute is from html)
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // check if that is a delete-button
  if (event.target.classList.contains('delete-button')) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
})});