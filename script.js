
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





function todoList() {

    let form = document.querySelector('.todo-list-fullpage .todo-container .addTask form')
    let taskInput = document.querySelector('.todo-list-fullpage .todo-container .addTask form input')
    let taskDetailsInput = document.querySelector('.todo-list-fullpage .todo-container .addTask form textarea')
    let taskCheckBox = document.querySelector('.todo-list-fullpage .todo-container .addTask form #check')

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

function dailyPlanner() {
    var dayPlannerData = JSON.parse(localStorage.getItem('dayPlannerData')) || {}
    var dayPlanner = document.querySelector('.day-planner')


    var hours = Array.from({ length: 18 }, (_, idx) =>
        `${6 + idx}:00 - ${7 + idx}:00`
    )

    var wholeDaySum = ""

    hours.forEach(function (elem, idx) {

        let savedData = dayPlannerData[idx] || ''

        wholeDaySum += `
    <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="...." value="${savedData}">
    </div>`
    })




    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner-time input')

    dayPlannerInput.forEach((input) => {
        input.addEventListener('input', () => {

            dayPlannerData[input.id] = input.value
            console.log(dayPlannerData);

            localStorage.setItem('dayPlannerData', JSON.stringify(dayPlannerData))


        })
    })




}

dailyPlanner()




async function motivationalQuotes() {

    let QuoteContent = document.querySelector('.Quote-content')
    let QuoteAuthor = document.querySelector('.Quote-author')



    let response = await fetch('https://random-quotes-freeapi.vercel.app/api/random')
    let data = await response.json()
    console.log(data);

    QuoteContent.innerHTML = data.quote
    QuoteAuthor.innerHTML = data.author

}

motivationalQuotes()

function pomodoroTimer() {
    const timerDisplay = document.querySelector('.pomodoro-container .timer-display h1');
    const startBtn = document.querySelector('.pomodoro-container .start-btn');
    const tabs = document.querySelectorAll('.pomodoro-container .timer-tabs .tab');
    const fullPage = document.querySelector('.fullElem.pomodoro-fullpage');
    const resetBtn = document.querySelector('.pomodoro-container .reset-btn');



    let timeLeft = 25 * 60;
    let timerId = null;
    let isRunning = false;

    // Initialize display
    updateDisplay();

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active class
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Reset timer based on tab
            const minutes = parseInt(tab.dataset.time);
            timeLeft = minutes * 60;
            updateDisplay();

            // Stop timer if running
            stopTimer();
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');

            // Update background color based on mode (optional visual feedback)
            if (minutes === 25) fullPage.style.backgroundColor = '#151e27';
            else if (minutes === 5) fullPage.style.backgroundColor = '#2d485d';
            else fullPage.style.backgroundColor = '#572d67ff';
        });
    });

    // Start/Stop button
    startBtn.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
            startBtn.textContent = 'START';
            startBtn.classList.remove('active');
        } else {
            startTimer();
            startBtn.textContent = 'PAUSE';
            startBtn.classList.add('active');
        }
    });

    // reset button
    resetBtn.addEventListener('click', () => {
        stopTimer();
        startBtn.textContent = 'START';
        startBtn.classList.remove('active');
        timeLeft = 25 * 60;
        updateDisplay();
    });



    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                stopTimer();
                alert('Time is up!');
                // Reset to current tab's time
                const activeTab = document.querySelector('.pomodoro-container .timer-tabs .tab.active');
                timeLeft = parseInt(activeTab.dataset.time) * 60;
                updateDisplay();
                startBtn.textContent = 'START';
                startBtn.classList.remove('active');
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerId);
        isRunning = false;
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update document title
        document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - Pomodoro`;
    }


}



pomodoroTimer();
