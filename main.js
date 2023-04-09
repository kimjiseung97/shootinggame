
//캔버스 세팅
let canvas; //캔버스 변수 선언
let ctx; //ctx변수 선언

canvas = document.createElement('canvas'); //캔버스 dom접근 생성

ctx = canvas.getContext('2d');

canvas.width = '500';
canvas.height = '700';
document.body.appendChild(canvas);

let backgroundImage,spaceShipImage,bulletImage,enemyImage,gameOverImage;

//우주선좌표 직접 입력받을거임(계속바뀔거기때문에)
let spaceshipX = canvas.width/2 - 32
let spaceshipY = canvas.height - 50;

let bulletList = []; //총알들을 저장하는 리스트
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 10 ;
        this.y = spaceshipY - 20;
        bulletList.push(this)
    };
    this.update = function(){
        this.y-=7;
    };
}

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





let keysDown={

}

function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        // console.log("무슨키가 눌렷어? ",event.keyCode);
        keysDown[event.keyCode] = true;
        // console.log("키다운 객체에 들어간 값은?", keysDown);
    });

    document.addEventListener("keyup",function(){
        delete keysDown[event.keyCode];   
        // console.log("버튼클릭후", keysDown);
        
        if(event.keyCode== 32){
            createBullet() // 총알 생성 가능 함수
        }

    });
}

function createBullet(){
    console.log("총알 생성!");
    let b = new Bullet();
    b.init();
    // console.log("새로운 총알 리스트 ",bulletList);
}

function update(){
    if(39 in keysDown){
        spaceshipX +=3; //우주선의 속도
    }
    if(37 in keysDown){
        spaceshipX -=3;
    }
    //우주선의 좌표값이 무한대로 업데이트되는게 아닌 경기장 안에서만 있게하려면

    if(spaceshipX <=0){
        spaceshipX=0;
    }
    if(spaceshipX>=canvas.width-64){
        spaceshipX = canvas.width-64;
    }
    //총알의 y좌표 업데이트 하는 함수 호출
    for(let i = 0; i<bulletList.length; i++){
        bulletList[i].update();
    }
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceShipImage,spaceshipX,spaceshipY);

    for(let i =0; i<bulletList.length; i++){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
    }
}




function main(){
    render();
    requestAnimationFrame(main);
    update();
}

loadImage();
setupKeyboardListener();
main();

//방향키를 누르면
//우주선의 xy좌표가 바뀌고
//우주선이움직인다

//총알만들기
//1. 스페이스바를 누르면 총알발사
//2. 총알의 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스룰 누른순간의 우주선의 좌표
//3. 발사된 총알들은 총알 배열에 저장을한다
//4. 총알들은 x,y 좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다

