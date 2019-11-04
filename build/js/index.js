"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var createBtn = document.getElementById('create-btn');
var arr = [];
var saveBtn;
var wrapperForm;
var titleInput;
var descriptionArea;
var selectPriority;
var cancelBtn;
var todoWrapper;
var editTitle = '';
var editDescription = '';
var filterPriority = document.getElementById('filterPriority');
var filterStatus = document.getElementById('filterStatus');
var search = document.getElementById('search');
todoWrapper = document.createElement('div');
todoWrapper.className = 'todo-wrapper';
document.body.appendChild(todoWrapper); // СОЗДАНИЕ КАРТОЧКИ

createBtn.addEventListener('click', function () {
  modalWindow();
  saveBtn.addEventListener('click', function () {
    wrapperForm.style.display = 'none';
    var todoList = new TodoList(titleInput.value, descriptionArea.value, selectPriority.value);
    todoList.createTodo();
    arr.push(todoList);
  });
  cancelBtn.addEventListener('click', function () {
    wrapperForm.style.display = 'none';
  });
});

search.oninput = function () {
  var value = this.value.trim();
  var cardsTitle = document.querySelectorAll('.title-text');

  if (value !== '') {
    cardsTitle.forEach(function (elem) {
      var parent = elem.parentNode;

      if (elem.innerText.search(value) === -1) {
        parent.style.display = 'none';
      } else {
        parent.style.display = 'flex';
      }
    });
  } else {
    cardsTitle.forEach(function (elem) {
      elem.parentNode.style.display = 'flex';
    });
  }
};

filterPriority.onchange = function () {
  var selected = filterPriority.value;
  var status = filterStatus.value;
  todoWrapper.querySelectorAll('.todo-list').forEach(function (elem) {
    filterSelect(elem.dataset.priority, elem.dataset.status, elem, selected, status);
  });
};

filterStatus.onchange = function () {
  var selected = filterStatus.value;
  var status = filterPriority.value;
  todoWrapper.querySelectorAll('.todo-list').forEach(function (elem) {
    filterSelect(elem.dataset.status, elem.dataset.priority, elem, selected, status);
  });
};

var TodoList =
/*#__PURE__*/
function () {
  function TodoList(title, description, priority) {
    _classCallCheck(this, TodoList);

    this.title = title;
    this.description = description;
    this.priority = priority;
  }

  _createClass(TodoList, [{
    key: "createTodo",
    value: function createTodo() {
      var listWrapper = document.createElement('div');
      listWrapper.className = 'todo-list';
      listWrapper.dataset.priority = "".concat(this.priority);
      listWrapper.dataset.status = 'open';
      todoWrapper.appendChild(listWrapper);
      var titleText = document.createElement('p');
      titleText.className = 'title-text';
      listWrapper.appendChild(titleText);
      titleText.innerHTML = this.title;
      var descriptionText = document.createElement('p');
      listWrapper.appendChild(descriptionText);
      descriptionText.innerHTML = this.description;
      var priorWrapper = document.createElement('div');
      priorWrapper.className = 'prior-wrapper';
      listWrapper.appendChild(priorWrapper);
      var priority = document.createElement('span');
      priorWrapper.appendChild(priority);
      priority.innerHTML = this.priority;
      var status = document.createElement('button');
      status.className = 'status';
      status.innerHTML = '...';
      priorWrapper.appendChild(status);
      var statusWrapper = document.createElement('ul');
      statusWrapper.className = 'status-wrapper';
      listWrapper.appendChild(statusWrapper);
      var doneLi = document.createElement('li');
      doneLi.className = 'status-li';
      doneLi.innerHTML = 'done';
      statusWrapper.appendChild(doneLi);
      var editLi = document.createElement('li');
      editLi.className = 'status-li';
      editLi.innerHTML = 'edit';
      editLi.dataset.name = 'edit';
      statusWrapper.appendChild(editLi);
      var deleteLi = document.createElement('li');
      deleteLi.className = 'status-li';
      deleteLi.innerHTML = 'delete';
      deleteLi.dataset.name = 'delete';
      statusWrapper.appendChild(deleteLi);
      status.addEventListener('click', function (event) {
        if (event.target !== event.currentTarget) {
          console.log('hi');
          statusWrapper.style.display = 'none';
        }

        statusWrapper.style.display = statusWrapper.style.display === 'block' ? 'none' : 'block';
      });
      this.doneTodo(doneLi, statusWrapper);
      this.editTodo(editLi, statusWrapper);
      this.deleteTodo(deleteLi, listWrapper);
    }
  }, {
    key: "editTodo",
    value: function editTodo(edit, wrapper) {
      edit.addEventListener('click', function (event) {
        wrapper.style.display = 'none';
        var card = document.querySelectorAll('.todo-list');
        var currentIndex = 0;
        var currentElem;
        card.forEach(function (elem, index) {
          if (event.target.parentNode.parentNode === elem) {
            currentElem = elem;
            currentIndex = index;
          }
        });

        for (var key in arr[currentIndex]) {
          editTitle = arr[currentIndex].title;
          editDescription = arr[currentIndex].description;
        }

        modalWindow();
        saveBtn.addEventListener('click', function (event) {
          var todoList = new TodoList(titleInput.value, descriptionArea.value, selectPriority.value);
          todoList.createTodo();

          if (event.target.classList.contains('save-btn')) {
            arr.splice(currentIndex, 1);
            arr.push(todoList);
            currentElem.remove();
          }

          wrapperForm.style.display = 'none';
        });
        cancelBtn.addEventListener('click', function () {
          wrapperForm.style.display = 'none';
        });
      });
    }
  }, {
    key: "deleteTodo",
    value: function deleteTodo(todo, listWrapper) {
      todo.addEventListener('click', function (event) {
        var card = document.querySelectorAll('.todo-list');
        card.forEach(function (elem, index) {
          if (event.target.parentNode.parentNode === elem) {
            arr.splice(index, 1);
          }

          listWrapper.remove();
        });
      });
    }
  }, {
    key: "doneTodo",
    value: function doneTodo(done, statusWrapper) {
      done.addEventListener('click', function (event) {
        statusWrapper.style.display = 'none';
        var card = document.querySelectorAll('.todo-list');
        var curElement = event.target.parentNode.parentNode;
        card.forEach(function (elem) {
          if (curElement.dataset.status === 'open') {
            var check = document.createElement('i');
            check.className = 'fas fa-check mark';
            curElement.dataset.status = 'done';
            curElement.style.backgroundColor = 'gray';
            curElement.appendChild(check);
          }
        });
      });
    }
  }]);

  return TodoList;
}();

function filterSelect(elemStatus, elemPriority, elem, selected, status) {
  if ((elemStatus === "".concat(selected) || "".concat(selected) === 'all') && status === 'all') {
    elem.style.display = 'flex';
  } else if ((elemPriority === "".concat(status) || "".concat(selected) === 'all') && elemStatus === "".concat(selected)) {
    elem.style.display = 'flex';
  } else if ("".concat(selected) === 'all' && elemPriority === "".concat(status)) {
    elem.style.display = 'flex';
  } else {
    elem.style.display = 'none';
  }
}

function modalWindow() {
  wrapperForm = document.createElement('div');
  wrapperForm.className = 'wrapper-form';
  document.body.appendChild(wrapperForm);
  var form = document.createElement('form');
  form.className = 'new-title';
  wrapperForm.appendChild(form);
  var labelTitle = document.createElement('label');
  labelTitle.innerHTML = 'Title:';
  form.appendChild(labelTitle);
  titleInput = document.createElement('input');
  titleInput.className = 'title-input';
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.value = editTitle;
  form.appendChild(titleInput);
  var descriptionTitle = document.createElement('label');
  descriptionTitle.innerText = 'Description:';
  form.appendChild(descriptionTitle);
  descriptionArea = document.createElement('textarea');
  descriptionArea.className = 'description-area';
  descriptionArea.value = editDescription;
  descriptionArea.placeholder = 'Description';
  form.appendChild(descriptionArea);
  var labelPriority = document.createElement('label');
  labelPriority.innerHTML = 'Priority:';
  form.appendChild(labelPriority);
  selectPriority = document.createElement('select');
  selectPriority.className = 'select-priority';
  form.appendChild(selectPriority);
  var highOption = document.createElement('option');
  highOption.innerHTML = 'high';
  selectPriority.appendChild(highOption);
  var normalOption = document.createElement('option');
  normalOption.value = 'normal';
  normalOption.innerHTML = 'normal';
  selectPriority.appendChild(normalOption);
  var lowOption = document.createElement('option');
  lowOption.innerHTML = 'low';
  selectPriority.appendChild(lowOption);
  var wrapperBtn = document.createElement('div');
  wrapperBtn.className = 'wrapper-btn';
  form.appendChild(wrapperBtn);
  cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = 'Cancel';
  cancelBtn.type = 'button';
  cancelBtn.className = 'cancel-btn';
  wrapperBtn.appendChild(cancelBtn);
  saveBtn = document.createElement('button');
  saveBtn.type = 'button';
  saveBtn.innerHTML = 'Save';
  saveBtn.className = 'save-btn';
  wrapperBtn.appendChild(saveBtn);
}