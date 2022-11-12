const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['blue', 'red', 'green', 'purple', 'yellow'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        screens[1].classList.add('up');
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        creareRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    creareRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0) {
        finishGame();
    } else {
        let current = --time;
        timeEl.innerHTML = `00:${current}`;
        if(current > 10) {
            current = `0${current}`;
        }

        setTime(current);
    }
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
}

function setTime(value) {
    timeEl.innerHTML = `00:0${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>  Score: ${score} </h1>`;
}

function creareRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0 , height - size);
    const color = getRandomColor()
    
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = color;
    circle.style.boxShadow = `0 0 1px ${color}, 0 0 5px ${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}