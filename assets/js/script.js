// const dino = document.querySelector('.dino');
// const background = document.querySelector('.background');
const divStart = document.querySelector('.start');
const h1 = document.getElementsByTagName('h1')[0];
const body = document.querySelector('body');
const dino = document.createElement('div');
dino.classList.add('dino');
const background = document.createElement('div');
background.classList.add('background');
let istJumping = false;
let positionDinoJump = 10;
let gameOn = false;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!istJumping) {
            jump();
        }
    }
}

function jump() {
    istJumping = true;

    let upInterval = setInterval(() => {
        if (positionDinoJump >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (positionDinoJump <= 10) {
                    clearInterval(downInterval);
                    istJumping = false;
                } else {
                    positionDinoJump -= 20;
                    dino.style.bottom = positionDinoJump + 'px';
                }
            }, 20);
        } else {
            positionDinoJump += 20;
            dino.style.bottom = positionDinoJump + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let randomTime = Math.random() * 4000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    moveCactus(cactus);

    if (gameOn) {
        setTimeout(createCactus, randomTime + 400);
    }
}

function moveCactus(cactus) {
    let cactusPosition = 1000;
    let leftInterval = setInterval(() => {
        if (cactusPosition >= -60 && gameOn) {
            cactusPosition -= 20;
            cactus.style.left = cactusPosition + 'px';
            if (cactusPosition > 0 && cactusPosition < 60) {
                checkCollision(cactus, dino);
            }
        } else {
            clearInterval(leftInterval);
            cactus.remove();
        }
    }, 30);
}

function checkCollision(cactus, dino) {
    console.log('Pode colidir');
    if (positionDinoJump < 70) {
        clearInterval(cactus.leftInterval);
        gameOver();
    }
}

function gameOver() {
    gameOn = false;
    console.log(h1);
    body.appendChild(divStart);
    background.remove();
    h1.innerHTML = 'Fim de jogo. Pressione SPACE para reiniciar';
    document.removeEventListener('keyup', handleKeyUp);
    document.addEventListener('keyup', handleStart);
}

function start() {
    document.removeEventListener('keyup', handleStart);
    body.removeChild(divStart);
    body.appendChild(background);
    background.appendChild(dino);
    gameOn = true;
    createCactus();
    document.addEventListener('keyup', handleKeyUp);
}

function handleStart(event) {
    if (event.keyCode === 32) {
        if (!istJumping) {
            start();
        }
    }
}

document.addEventListener('keyup', handleStart);