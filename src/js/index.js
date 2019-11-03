const createBtn = document.getElementById('create-btn');
let arr = [];
let saveBtn;
let wrapperForm;
let titleInput;
let descriptionArea;
let selectPriority;
let cancelBtn;
let todoWrapper;
let editTitle = '';
let editDescription = '';
const filterPriority = document.getElementById('filterPriority');
const filterStatus = document.getElementById('filterStatus');
const search = document.getElementById('search');

todoWrapper = document.createElement('div');
todoWrapper.className = 'todo-wrapper';
document.body.appendChild(todoWrapper);

// СОЗДАНИЕ КАРТОЧКИ

createBtn.addEventListener('click', () =>{
    modalWindow();
    saveBtn.addEventListener('click', () =>{
        wrapperForm.style.display = 'none';
        let todoList = new TodoList(titleInput.value, descriptionArea.value, selectPriority.value);
        todoList.createTodo();
        arr.push(todoList);
    });

    cancelBtn.addEventListener('click', () =>{
        wrapperForm.style.display = 'none';
    });
});

search.oninput = function(){
    let value = this.value.trim();
    let cardsTitle = document.querySelectorAll('.title-text');
    if (value !== ''){
        cardsTitle.forEach(elem =>{
            let parent = elem.parentNode;
            if (elem.innerText.search(value) === -1){
                parent.style.display = 'none'
            }else{
                parent.style.display = 'flex'
            }
        })
    }else{
        cardsTitle.forEach(elem =>{
            elem.parentNode.style.display = 'flex'
        })
    }
};
filterPriority.onchange = function () {
    let selected = filterPriority.value;
    let status = filterStatus.value;
    todoWrapper.querySelectorAll('.todo-list').forEach(elem =>{
        filterSelect(elem.dataset.priority,elem.dataset.status,elem,selected,status)
    })
};
filterStatus.onchange = function () {
    let selected = filterStatus.value;
    let status = filterPriority.value;
    todoWrapper.querySelectorAll('.todo-list').forEach(elem =>{
        filterSelect(elem.dataset.status, elem.dataset.priority, elem, selected, status)
    })
};

class TodoList{
    constructor(title, description, priority){
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    createTodo() {
        const listWrapper = document.createElement('div');
        listWrapper.className = 'todo-list';
        listWrapper.dataset.priority = `${this.priority}`;
        listWrapper.dataset.status = 'open';
        todoWrapper.appendChild(listWrapper);

        const titleText = document.createElement('p');
        titleText.className = 'title-text';
        listWrapper.appendChild(titleText);
        titleText.innerHTML = this.title;

        const descriptionText = document.createElement('p');
        listWrapper.appendChild(descriptionText);
        descriptionText.innerHTML = this.description;

        const priorWrapper = document.createElement('div');
        priorWrapper.className = 'prior-wrapper';
        listWrapper.appendChild(priorWrapper);

        const priority = document.createElement('span');
        priorWrapper.appendChild(priority);
        priority.innerHTML = this.priority;

        const status = document.createElement('button');
        status.className = 'status';
        status.innerHTML = '...';
        priorWrapper.appendChild(status);

        const statusWrapper = document.createElement('ul');
        statusWrapper.className = 'status-wrapper';
        listWrapper.appendChild(statusWrapper);

        const doneLi = document.createElement('li');
        doneLi.className = 'status-li';
        doneLi.innerHTML = 'done';
        statusWrapper.appendChild(doneLi);

        const editLi = document.createElement('li');
        editLi.className = 'status-li';
        editLi.innerHTML = 'edit';
        editLi.dataset.name = 'edit';
        statusWrapper.appendChild(editLi);

        const deleteLi = document.createElement('li');
        deleteLi.className = 'status-li';
        deleteLi.innerHTML = 'delete';
        deleteLi.dataset.name = 'delete';
        statusWrapper.appendChild(deleteLi);

        status.addEventListener('click', (event) =>{
            statusWrapper.style.display = (statusWrapper.style.display === 'block') ? 'none' : 'block';
        });
        this.doneTodo(doneLi, statusWrapper);
        this.editTodo(editLi, statusWrapper);
        this.deleteTodo(deleteLi, listWrapper);
    }
    editTodo(edit, wrapper){
        edit.addEventListener('click', event =>{
            wrapper.style.display = 'none';
            let card = document.querySelectorAll('.todo-list');
            let currentIndex = 0;
            let currentElem;
            card.forEach((elem, index) =>{
                if (event.target.parentNode.parentNode === elem){
                    currentElem = elem;
                    currentIndex = index
                }
            });
            for (let key in arr[currentIndex]){
                editTitle = arr[currentIndex].title;
                editDescription = arr[currentIndex].description;

            }
            modalWindow();
            saveBtn.addEventListener('click', (event) =>{
                let todoList = new TodoList(titleInput.value, descriptionArea.value, selectPriority.value);
                todoList.createTodo();
                if (event.target.classList.contains('save-btn')){
                    arr.splice(currentIndex, 1);
                    arr.push(todoList);
                    currentElem.remove();
                }
                wrapperForm.style.display = 'none';
            });
            cancelBtn.addEventListener('click', () =>{
                wrapperForm.style.display = 'none';
            });
        })
    }
    deleteTodo(todo, listWrapper){
        todo.addEventListener('click', (event) =>{
            let card = document.querySelectorAll('.todo-list');
                card.forEach((elem, index) => {
                    if (event.target.parentNode.parentNode === elem) {
                        arr.splice(index, 1);
                    }
                    listWrapper.remove();
                })
        });
    }
    doneTodo(done, statusWrapper){
        done.addEventListener('click', (event) =>{
            statusWrapper.style.display = 'none';
            let card = document.querySelectorAll('.todo-list');
            let curElement = event.target.parentNode.parentNode;
            card.forEach(elem =>{
                if (curElement.dataset.status === 'open'){
                    let check = document.createElement('i');
                    check.className = 'fas fa-check mark';
                    curElement.dataset.status = 'done';
                    curElement.style.backgroundColor = 'gray';
                    curElement.appendChild(check)

                }
            })
        })
    }
}

function filterSelect(elemStatus,elemPriority,elem,selected, status) {
    if ((elemStatus === `${selected}` || `${selected}` === 'all') && status === 'all'){
        elem.style.display = 'flex';
    }
    else if ((elemPriority === `${status}` || `${selected}` === 'all') && elemStatus === `${selected}`){
        elem.style.display = 'flex';
    }
    else if (`${selected}` === 'all' && elemPriority === `${status}`){
        elem.style.display = 'flex';
    }
    else{
        elem.style.display = 'none';
    }
}
function modalWindow() {
    wrapperForm = document.createElement('div');
    wrapperForm.className = 'wrapper-form';
    document.body.appendChild(wrapperForm);

    const form = document.createElement('form');
    form.className = 'new-title';
    wrapperForm.appendChild(form);

    const labelTitle = document.createElement('label');
    labelTitle.innerHTML = 'Title:';
    form.appendChild(labelTitle);

    titleInput = document.createElement('input');
    titleInput.className = 'title-input';
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.value = editTitle;
    form.appendChild(titleInput);

    const descriptionTitle = document.createElement('label');
    descriptionTitle.innerText = 'Description:';
    form.appendChild(descriptionTitle);

    descriptionArea = document.createElement('textarea');
    descriptionArea.className = 'description-area';
    descriptionArea.value = editDescription;
    descriptionArea.placeholder = 'Description';
    form.appendChild(descriptionArea);

    const labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority:';
    form.appendChild(labelPriority);

    selectPriority = document.createElement('select');
    selectPriority.className = 'select-priority';
    form.appendChild(selectPriority);

    const highOption = document.createElement('option');
    highOption.innerHTML = 'high';
    selectPriority.appendChild(highOption);

    const normalOption = document.createElement('option');
    normalOption.value = 'normal';
    normalOption.innerHTML = 'normal';
    selectPriority.appendChild(normalOption);

    const lowOption = document.createElement('option');
    lowOption.innerHTML = 'low';
    selectPriority.appendChild(lowOption);

    const wrapperBtn = document.createElement('div');
    wrapperBtn.className = 'wrapper-btn';
    form.appendChild(wrapperBtn);

    cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.className = 'cancel-btn';
    wrapperBtn.appendChild(cancelBtn);

    saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Save';
    saveBtn.className = 'save-btn';
    wrapperBtn.appendChild(saveBtn);
}
