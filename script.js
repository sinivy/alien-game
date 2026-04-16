const alien = document.querySelector('.alien');
const background = document.querySelector('.background');
const scoreEl = document.getElementById('score');
const gameOverScreen = document.querySelector('.game-over-screen');

let isJumping = false;
let isGameOver = false;
let position = 0;
let score = 0;

function handleInput() {
    if (!isJumping) jump();
}

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') handleInput();
});

document.addEventListener('touchstart', handleInput);

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    alien.style.bottom = position + 'px';
                }
            }, 20);

        } else {
            position += 20;
            alien.style.bottom = position + 'px';
        }
    }, 20);
}

function createCar() {
    if (isGameOver) return;

    const car = document.createElement('div');
    car.classList.add('car');
    background.appendChild(car);

    let carPosition = window.innerWidth;
    car.style.left = carPosition + 'px';

    let speed = 10;

    let timer = setInterval(() => {
        if (carPosition < -60) {
            clearInterval(timer);
            background.removeChild(car);
            score++;
            scoreEl.innerText = score;
        } else if (carPosition < 100 && carPosition > 40 && position < 60) {
            clearInterval(timer);
            gameOver();
        } else {
            carPosition -= speed;
            car.style.left = carPosition + 'px';
        }
    }, 20);

    let randomTime = Math.random() * 2000 + 1000;

    setTimeout(createCar, randomTime);
}

function gameOver() {
    isGameOver = true;
    gameOverScreen.classList.remove('hidden');
}

function restartGame() {
    window.location.reload();
}

createCar();
