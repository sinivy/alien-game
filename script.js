const alien = document.querySelector('.alien');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
       if (!isJumping) {
            jump();
         }
    }
}

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
    const car = document.createElement('div');
    let carPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    car.classList.add('car');
    background.appendChild(car);
    car.style.left = carPosition + 'px';

    let leftTimer = setInterval(() => {
        if (carPosition < -60) {
            clearInterval(leftTimer);
            background.removeChild(car);
        } else if (carPosition > 0 && carPosition < 60 && position < 60) {
            clearInterval(leftTimer);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo! :(</h1>';
        } else {
            carPosition -= 10;
            car.style.left = carPosition + 'px';
        }
    }, 20);
}

setTimeout(createCar, randomTime);

createCar();
document.addEventListener('keyup', handleKeyUp);