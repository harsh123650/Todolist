let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newToDo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
  getDOMElements();
  addDOMEvents();
};

const getDOMElements = () => {
  toDoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  ulList = document.querySelector('.todolist ul');

  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popupAddBtn = document.querySelector('.accept');
  popupCloseBtn = document.querySelector('.cancel');
};

const addDOMEvents = () => {
  addBtn.addEventListener('click', addNewToDo);
  ulList.addEventListener('click', handleClick);
  popupCloseBtn.addEventListener('click', closePopup);
  popupAddBtn.addEventListener('click', updateTodoText);
  toDoInput.addEventListener('keyup', checkEnterKey);
};

const addNewToDo = () => {
  if (toDoInput.value !== '') {
    newToDo = document.createElement('li');
    newToDo.textContent = toDoInput.value;
    createToolButtons();
    ulList.append(newToDo);
    toDoInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Please type something to add!';
  }
};

const createToolButtons = () => {
  const div = document.createElement('div');
  div.classList.add('tools');
  newToDo.append(div);

  const buttonDone = document.createElement('button');
  buttonDone.classList.add('complete');
  buttonDone.innerHTML = '<i class="fas fa-check"></i>';

  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('edit');
  buttonEdit.textContent = 'Edit';

  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('delete');
  buttonDelete.innerHTML = '<i class="fas fa-times"></i>';

  div.append(buttonDone, buttonEdit, buttonDelete);
};

const handleClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');
    e.target.classList.toggle('completed');
  } else if (e.target.matches('.edit')) {
    editToDo(e);
  } else if (e.target.matches('.delete')) {
    deleteToDo(e);
  }
};

const editToDo = (e) => {
  todoToEdit = e.target.closest('li');
  popupInput.value = todoToEdit.firstChild.textContent;
  popup.style.display = 'flex';
};

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
};

const updateTodoText = () => {
  if (popupInput.value !== '') {
    todoToEdit.firstChild.textContent = popupInput.value;
    popup.style.display = 'none';
    popupInfo.textContent = '';
  } else {
    popupInfo.textContent = 'You must enter some text!';
  }
};

const deleteToDo = (e) => {
  e.target.closest('li').remove();

  const allToDos = ulList.querySelectorAll('li');
  if (allToDos.length === 0) {
    errorInfo.textContent = 'No tasks left in the list.';
  }
};

const checkEnterKey = (e) => {
  if (e.key === 'Enter') {
    addNewToDo();
  }
};

document.addEventListener('DOMContentLoaded', main);
