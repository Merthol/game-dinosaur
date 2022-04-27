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

// Função que verifica se a tecla espaço foi pressionada e chama a função jump
function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!istJumping) {
            jump();
        }
    }
}

// Função responsável por fazer o dinossauro pular
function jump() {
    istJumping = true; // Condição para impedir que a tecla ative a função jump enquanto já estiver em execução

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
            }, 30);
        } else {
            positionDinoJump += 20;
            dino.style.bottom = positionDinoJump + 'px';
        }
    }, 30);
}

// Função responsável por criar na tela um novo elemento para ser pulado pelo dino
function createCebolinha() {
    const cebolinha = document.createElement('div');
    let randomTime = (Math.random() * 3500) + 1000;

    cebolinha.classList.add('cebolinha');
    cebolinha.style.left = 1000 + 'px';
    background.appendChild(cebolinha);

    moveCebolinha(cebolinha); // Ao criar o elemento, chama a função para movê-lo

    if (gameOn) {
        setTimeout(createCebolinha, randomTime); // Chamando um novo elemento a cada período aleatório de tempo
    }
}

// Função responsável por mover o elemento cebolinha que deve ser pulado pelo dinossauro
function moveCebolinha(cebolinha) {
    let cebolinhaPosition = 1000;
    let leftInterval = setInterval(() => {
        if (cebolinhaPosition >= -60 && gameOn) {
            cebolinhaPosition -= 10;
            cebolinha.style.left = cebolinhaPosition + 'px';
            if (cebolinhaPosition > -50 && cebolinhaPosition < 50) { // Condição em que pode acontecer uma colisão
                checkCollision(cebolinha, dino);
            }
        } else {
            clearInterval(leftInterval);
            leftInterval = null;
            cebolinha.remove();
        }
    }, 20);
}

// Função para verificar se os dois elementos colidiram
function checkCollision(cebolinha, dino) {
    if (positionDinoJump < 70) {
        console.log(cebolinha.style.left, dino.style.bottom);
        gameOver();
    }
}

// Função para zerar os elementos e exibir a tela de fim, assim como iniciar novamente
function gameOver() {
    gameOn = false;
    body.appendChild(divStart);
    background.remove();
    h1.innerHTML = 'Fim de jogo. Pressione SPACE para reiniciar';
    document.removeEventListener('keyup', handleKeyUp);
    document.addEventListener('keyup', handleStart);
}

// Função que inicia um novo jogo
function start() {
    document.removeEventListener('keyup', handleStart);
    body.removeChild(divStart);
    body.appendChild(background);
    background.appendChild(dino);
    gameOn = true;
    createCebolinha();
    document.addEventListener('keyup', handleKeyUp);
}

// Função para identificar o pressionamento da tecla para iniciar um novo jogo
function handleStart(event) {
    if (event.keyCode === 32) {
        if (!istJumping) {
            start();
        }
    }
}

document.addEventListener('keyup', handleStart);