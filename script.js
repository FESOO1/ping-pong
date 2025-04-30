const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width', (window.innerWidth - 5) + 'px');
canvas.setAttribute('height', (window.innerHeight - 5) + 'px');
let leftPaddleX = 13, leftPaddleY = (canvas.height - 150) / 2, leftPaddleWidth = 10, leftPaddleHeight = 150;
let leftPaddleWPressed = false, leftPaddleSPressed = false;
let rightPaddleX = canvas.width - 23, rightPaddleY = (canvas.height - 150) / 2, rightPaddleWidth = 10, rightPaddleHeight = 150;
let rightPaddleUpPressed = false, rightPaddleDownPressed = false;
let paddleColor = 'red';
let ballX = 40, ballY = canvas.height / 2, ballSize = 8, ballDirectionX = 2, ballDirectionY = -2;
let playerLeftPoints = 0;
let playerRightPoints = 0;

// DRAW THE TABLE

function drawTheTable() {
    // BACKGROUND
    ctx.beginPath();
    ctx.fillStyle = 'rgb(65, 87, 187)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    // BORDERS
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgb(240,240,240)';

    // GRAY LINE
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineWidth = 3;
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.closePath();

    // RED BORDER
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2 - 10, 0, 10, canvas.height);
    ctx.closePath();

    // RED BORDER TOP
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2 - 20, 0, 30, 10);
    ctx.closePath();

    // RED BORDER LEFT
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2 - 20, canvas.height - 10, 30, 10);
    ctx.closePath();
};

// DRAWING THE LEFT PADDLE

function drawingTheLeftPaddle() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = paddleColor;
    ctx.fillRect(leftPaddleX, leftPaddleY, leftPaddleWidth, leftPaddleHeight);
    ctx.strokeRect(leftPaddleX, leftPaddleY, leftPaddleWidth, leftPaddleHeight);
    ctx.closePath();
};

// DRAWING THE RIGHT PADDLE

function drawingTheRightPaddle() {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.fillStyle = paddleColor;
    ctx.fillRect(rightPaddleX, rightPaddleY, rightPaddleWidth, rightPaddleHeight);
    ctx.strokeRect(rightPaddleX, rightPaddleY, rightPaddleWidth, rightPaddleHeight);
    ctx.closePath();
};

// DRAWING THE BALL

function drawingTheBall() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(ballX, ballY, ballSize, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// DRAWING THE PLAYER POINTS

function drawingThePlayerPoints() {
    ctx.beginPath();
    ctx.font = '1rem sans-serif';
    ctx.fillText(`PLAYER 1: ${playerLeftPoints}`, 15, 30);
    ctx.closePath();

    ctx.beginPath();
    ctx.font = '1rem sans-serif';
    ctx.fillText(`PLAYER 2: ${playerRightPoints}`, canvas.width - 110, 30);
    ctx.closePath();
};

// CLEAR THE CANVAS

function clearTheCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
};

// DRAW

function draw() {
    clearTheCanvas();
    drawTheTable();
    drawingTheLeftPaddle();
    drawingTheRightPaddle();
    drawingTheBall();
    drawingThePlayerPoints();

    // MOVING THE BALL
    ballX += ballDirectionX;
    ballY += ballDirectionY;

    // MOVING THE PADDLES
    if (leftPaddleWPressed) {
        if (leftPaddleY > 15) {
            leftPaddleY -= 5;
        };
    } else if (leftPaddleSPressed) {
        if (leftPaddleY < canvas.height - leftPaddleHeight - 15) {
            leftPaddleY += 5;
        };
    };

    // MOVING THE PADDLES
    if (rightPaddleUpPressed) {
        if (rightPaddleY > 15) {
            rightPaddleY -= 5;
        };
    } else if (rightPaddleDownPressed) {
        if (rightPaddleY < canvas.height - rightPaddleHeight - 15) {
            rightPaddleY += 5;
        };
    };

    // COLLISION BETWEEN THE BALL AND THE WALLS
    if (ballY < ballSize || ballY > canvas.height - ballSize){
        ballDirectionY = -ballDirectionY;
    };

    // COLLISION BETWEEN THE PADDLES AND THE BALL
    if (ballX > rightPaddleX - ballSize && ballY > rightPaddleY && ballY < rightPaddleY + rightPaddleHeight) {
        ballDirectionX = -ballDirectionX;
        const audio = document.createElement('audio');
        audio.src = './assets/ballHit.mp3';
        audio.play();
    };

    if (ballX < leftPaddleX + ballSize + 10 && ballY > leftPaddleY && ballY < leftPaddleY + leftPaddleHeight) {
        ballDirectionX = -ballDirectionX;
        const audio = document.createElement('audio');
        audio.src = './assets/ballHit.mp3';
        audio.play();
    };

    // HANDLING THE POINTS
    if (ballX < 0) {
        playerRightPoints++;
        ballX = canvas.width - 40;
        ballY = (canvas.height - ballSize) / 2;
        leftPaddleY = (canvas.height - 150) / 2;
        rightPaddleY = (canvas.height - 150) / 2;
    } else if (ballX > canvas.width) {
        playerLeftPoints++;
        ballX = 40;
        ballY = (canvas.height - ballSize) / 2;
        leftPaddleY = (canvas.height - 150) / 2;
        rightPaddleY = (canvas.height - 150) / 2;
    };
    
    // DECIDING WHO THE WINNER IS
    if (playerLeftPoints === 11) {
        document.location.reload();
        alert('PLAYER 1 WON THE GAME!!!');
    } else if (playerRightPoints === 11) {
        document.location.reload();
        alert('PLAYER 2 WON THE GAME!!!');
    };

    // RENDERING THE GAME
    requestAnimationFrame(draw);
};

draw();

// KEY HANDLERS
document.addEventListener('keydown', e => {
    // LEFT PADDLE
    if (e.key === 'w') {
        leftPaddleWPressed = true;
    } else if (e.key === 's') {
        leftPaddleSPressed = true;
    };

    // RIGHT PADDLE
    if (e.key === 'ArrowUp') {
        rightPaddleUpPressed = true;
    } else if (e.key === 'ArrowDown') {
        rightPaddleDownPressed = true;
    };
});

document.addEventListener('keyup', e => {
    // LEFT PADDLE
    if (e.key === 'w') {
        leftPaddleWPressed = false;
    } else if (e.key === 's') {
        leftPaddleSPressed = false;
    };
    
    // RIGHT PADDLE
    if (e.key === 'ArrowUp') {
        rightPaddleUpPressed = false;
    } else if (e.key === 'ArrowDown') {
        rightPaddleDownPressed = false;
    };
});