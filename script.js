/* ilk boardı oluştur +
sonra bird oluştur ve çiz + 
harektini yap
sonra pipeları oluştur yazdır 
hareketini yap+ +
çarpişmayı yap ?
score yazdır basit
game over ve restart yapailmek */
let board;
let boardWidth = 360;
let boardHeigth = 640;
let context;
let gameOver = false;
let score = 0;

let birdWidth = 34;
let birdHeight = 24;
let birdX= boardWidth / 8;
let birdY = boardHeigth / 2;
let birdImage;

let bird = 
{
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}

//Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY =0 
let topPipeImg = new Image();
topPipeImg.src ='./toppipe.png';
let bottomPipeImage = new Image();
bottomPipeImage.src = './bottompipe.png';

//Physics
let velocityX = -2; //pipe move speed
let velocityY = 0;
let gravity = 0.2;


window.onload = function()
{
    board = document.getElementById('fluppy');
    board.width = boardWidth;
    board.height = boardHeigth;
    context = board.getContext('2d');
    birdImage = new Image();
    birdImage.src = './flappybird.png';
    birdImage.onload = function()
    {
        context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height); //Kuş birkere oluşturuldu önemli
    }


    requestAnimationFrame(update);
    setInterval(createPipe,1500);

    document.addEventListener('keydown',movebird);
}

function update()
{
    requestAnimationFrame(update);
    if(gameOver)
    {
        return
    }

    context.clearRect(0, 0, board.width, board.height);

    velocityY +=gravity;
    bird.y =Math.max(bird.y + velocityY,0);
    context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height); //kuş artık her zaman  var
    if(bird.y > boardHeigth - 90)
    {
        gameOver = true;
    }


    for(let i =0; i<pipeArray.length; i++)
    {
        let pipe = pipeArray[i];
        pipe.x +=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

        if(detectAccident(bird, pipe))
        {
            gameOver = true;
        }
        if(!pipe.passed && bird.x > pipe.x)
        {
            score += 0.5
            pipe.passed = true;
        }
    }
        context.fillStyle = "white";
        context.font = '45px  sans-serif'
        context.fillText(score,5, 45);
    if(gameOver)
    {
        context.fillText("GAME OVER", 5, 90);
    }


}

function movebird(e)
{
    if(e.code =='Space' || e.code == 'ArrowUp')
    {
        velocityY = -6;

        if(gameOver)
        {
            pipeArray = [];
            bird.y = birdY;
            score = 0;
            gameOver = false;
        }
    }
}

function createPipe()
{
    let randomY = pipeY - pipeHeight / 8 - Math.random()*pipeHeight / 3;
    let space = boardHeigth / 4;
    let topPipe =
    {
        img:topPipeImg,
        width:pipeWidth,
        height:pipeHeight,
        x:pipeX,
        y:randomY,
        passed:false
    }
    pipeArray.push(topPipe);
    let bottomPipe =
    {
        img:bottomPipeImage,
        width:pipeWidth,
        height:pipeHeight,
        x:pipeX,
        y:randomY+pipeHeight+space,
        passed:false
    }
    pipeArray.push(bottomPipe);
}


function detectAccident(bird,pipe)
{
    return bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    bird.y < pipe.y + pipe.height &&
    bird.y + bird.height >pipe.y;
}