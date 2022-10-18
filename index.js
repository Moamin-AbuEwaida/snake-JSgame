// board variables
const blockSize = 25 , rows = 20, cols = 20
let board;
let context;

//snake head variables
let snakeX =blockSize*5; 
let snakeY =blockSize*5;

//snake movement variables
let velX = 0;
let velY = 0;

//snake body variable
const snakeBody = [];

//drawing the food variables
let foodX ;
let foodY ;

//game finish variable
let gameOver= false;


window.onload = () => {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    // to draw on board
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 1000/10); // 100 milliseconds
}

const update = () => {
    if (gameOver){
        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0, 0,board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX,foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]= [snakeX,snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velX * blockSize;
    snakeY += velY * blockSize;
    context.fillRect(snakeX,snakeY, blockSize, blockSize);
    for (let i=0; i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //ending the game conditions
    if (snakeX < 0 || snakeX > (rows*blockSize- blockSize) || snakeY < 0 || snakeY > (cols*blockSize - blockSize)){
        gameOver = true;
        alert ('gameOver');
        window.location.reload();
    }

    for (let i=0; i<snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert ('gameOver');
            window.location.reload();
        }
    }
    
}

const placeFood = ()=>{
    foodX = Math.floor(Math.random() * rows) * blockSize; 
    foodY = Math.floor(Math.random() * cols) * blockSize; 
}

const changeDirection = (e)=>{
    if (e.code === 'ArrowUp' && velY != 1){
        velX = 0;
        velY = -1;
    } else if (e.code === 'ArrowDown' && velY != -1){
        velX = 0;
        velY = 1;
    } else if (e.code === 'ArrowRight' && velX != -1){
        velX = 1;
        velY = 0;
    } else if (e.code === 'ArrowLeft' && velX != 1){
        velX = -1;
        velY = 0;
    }
}