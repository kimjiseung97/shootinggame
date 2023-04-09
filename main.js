
//캔버스 세팅
let canvas; //캔버스 변수 선언
let ctx; //ctx변수 선언

canvas = document.createElement('canvas'); //캔버스 dom접근 생성

ctx = canvas.getContext('2d');

canvas.width = '500';
canvas.height = '700';
document.body.appendChild(canvas);

let backgroundImage,spaceShipImage,bulletImage,enemyImage,gameOverImage;

let gameOver = false // true이면 게임이 끝남, fasle이면 게임이 시작
//우주선좌표 직접 입력받을거임(계속바뀔거기때문에)
let spaceshipX = canvas.width/2 - 32
let spaceshipY = canvas.height - 50;

let score = 0;

let bulletList = []; //총알들을 저장하는 리스트
let enemyList = [];//적들을 저장하는 리스트
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 10 ;
        this.y = spaceshipY - 20;
        this.alive = true; //살아있는 총알 false면 죽은 총알
        bulletList.push(this)
    };
    this.update = function(){
        this.y-=7;
    };

    this.checkHit =function(){
        for(let i =0; i < enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x<=enemyList[i].x+40){
               //총알이 죽게됌 우주선이없어짐 점수 획득
                score++;
                this.alive = false //죽은총알
                enemyList.splice(i,1);
            }
        }
    }
}

function generateRandomValue(min,max){
    let randmNum = Math.floor(Math.random()*(max-min+1))+min
    return randmNum;
}
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = generateRandomValue(0,canvas.width-50)
        this.y = 0;
        enemyList.push(this);
    };
    this.update = function(){
        this.y +=3;  
        
        if(this.y >= canvas.height-48){
            gameOver = true;
            console.log("game over");
        }
    }
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

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
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
        if(bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
        }
    }
    //적군 생성 업데이트 함수
    for(let i =0; i<enemyList.length; i++){
        enemyList[i].update();
    }

}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceShipImage,spaceshipX,spaceshipY);
    ctx.fillText(`score : ${score}`,20,20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial"

    for(let i =0; i<bulletList.length; i++){
        if(bulletList[i].alive){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
        }
    }
    for(let i =0; i<enemyList.length; i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
    
}




function main(){
    if(!gameOver){
        render();
        requestAnimationFrame(main);
        update();
    }else{
        ctx.drawImage(gameOverImage,10,100,380,380)
    }
    
}

loadImage();
setupKeyboardListener();
createEnemy();
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

//적군 만들기
//적군은 위치가 랜덤하다
//적군은 밑으로 내려온다 y좌표가 증가한다
// 1초마다 하나씩 적군이나온다


//적군이 죽는다
//총알이 적군에게 닿는다
//총알.y <= 적군.y
//총알.x >= 적군의.x >= and 총알.x <= 적군.x+40
// 닿았다
