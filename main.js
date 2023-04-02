
//캔버스 세팅
let canvas; //캔버스 변수 선언
let ctx; //ctx변수 선언

canvas = document.createElement('canvas'); //캔버스 dom접근 생성

ctx = canvas.getContext('2d');

canvas.width = '400';
canvas.height = '700';
document.body.appendChild(canvas);

let backgroundImage,spaceShipImage,bulletImage,enemyImage,gameOverImage;

//우주선좌표 직접 입력받을거임(계속바뀔거기때문에)
let spaceshipX = canvas.width/2 - 32
let spaceshipY = canvas.height - 50;


function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src='images/background.jpg';

    spaceShipImage = new Image();
    spaceShipImage.src='images/spaceship.png';

    bulletImage = new Image();
    bulletImage.src = 'images/bullet.png';

    enemyImage = new Image();
    enemyImage.src='images/enemy.png';

    gameOverImage = new Image();
    gameOverImage.src='images/gameover.jpg';
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceShipImage,spaceshipX,spaceshipY);
}




function main(){
    render();
    requestAnimationFrame(main);
}

loadImage();
main();



