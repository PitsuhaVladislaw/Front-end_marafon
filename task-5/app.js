const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

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
    
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');

        if(circle) {
            circle.click()
        }
    }

    setInterval(kill, 75);
}