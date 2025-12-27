
// open features like todo list, goals , daily tasks etc
function openFetaures() {

    let allElems = document.querySelectorAll('.elem')
    let allFullPage = document.querySelectorAll('.fullElem')
    let allFullElemsBackBtn = document.querySelectorAll('.back')

    // open features
    allElems.forEach((elem) => {
        elem.addEventListener('click', () => {
            console.log(elem.id);
            allFullPage[elem.id].style.display = 'block'

        })
    })

    // back btn function
    allFullElemsBackBtn.forEach((backBtn) => {
        backBtn.addEventListener('click', () => {
            allFullPage[backBtn.id].style.display = 'none'
        })
    })

}

openFetaures()

let form = document.querySelector('.todo-list-fullpage .todo-container .addTask form')
let taskInput = document.querySelector('.todo-list-fullpage .todo-container .addTask form input')
let taskDetailsInput = document.querySelector('.todo-list-fullpage .todo-container .addTask form textarea')
let taskCheckBox = document.querySelector('.todo-list-fullpage .todo-container .addTask form #check')




function todoList() {
    var currentTasks = []

    if (localStorage.getItem('currentTasks')) {
        currentTasks = JSON.parse(localStorage.getItem('currentTasks'))
    } else {
        console.log('no data found');
    }

    function renderTasks() {

        let allTask = document.querySelector('.allTask')
        let sum = " "
        currentTasks.forEach((task, idx) => {
            sum += `
        <div class="task">
            <div class="text-val">
                <h5>${task.taskName} <span class="${task.imp}"> imp </span></h5>
                <p>${task.taskDetails}</p>
            </div>
            <button id="${idx}"> mark as completed</button>
    </div>
    `
        })
        allTask.innerHTML = sum

        localStorage.setItem('currentTasks', JSON.stringify(currentTasks))

        // mark as completed btn
        document.querySelectorAll('.task button').forEach((btn) => {
            btn.addEventListener('click', () => {
                currentTasks.splice(btn.id, 1)
                renderTasks()
            })

        })

    }
    renderTasks()


    // add task
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        currentTasks.push({
            taskName: taskInput.value,
            taskDetails: taskDetailsInput.value,
            imp: taskCheckBox.checked,
        })
        
        console.log(currentTasks);
        renderTasks()

        taskInput.value = ""
        taskDetailsInput.value = ""
        taskCheckBox.checked = false

    })

}

todoList()


