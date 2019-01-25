//点击startGame 游戏开始 开始界面消失
//随机生成食物 蛇开始运动
//出现控制按钮
//上下左右改变方向运动
//利用坐标碰撞检测 数组为蛇加1 分数增加
//判断边界 蛇身碰撞
//游戏结束 分数出现 结束页面出现
//游戏结束重置变量 恢复初始化

var content = document.getElementById('content');
var scoreBox = document.getElementById('score');
var loser = document.getElementById('loser');
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var controlBtn = document.getElementById('controlBtn');
var startPage = document.getElementById('startPage');
var startBtn = document.getElementById('startBtn');
var startGameBool = true;
var control = true;
var snakeMove;

init();
function init() {
    this.map = content;
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);

    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;

    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[4, 2, 'head'], [3, 2, 'body'], [2, 2, 'body']];

    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;
    this.speed = 200;
    blindEvent();

}

function startGame() {
    startPage.style.display = 'none';
    controlBtn.style.display = 'block';
    food();
    snake();

}

function food() {
    var food = document.createElement('div');
    food.setAttribute('class', 'food');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20 - 1));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20 - 1));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.map.appendChild(food);
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.classList.add('snake');
        snake.classList.add(this.snakeBody[i][2]);
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        this.map.appendChild(snake);
        switch (this.direct) {
            case 'right':
                break;
            case 'left': snake.style.transform = 'rotate(180deg)';
                break;
            case 'up': snake.style.transform = 'rotate(270deg)';
                break;
            case 'down': snake.style.transform = 'rotate(90deg)';
                break;
        }
    }
}

function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right': this.snakeBody[0][0] += 1;
            break;
        case 'left': this.snakeBody[0][0] -= 1;
            break;
        case 'up': this.snakeBody[0][1] -= 1;
            break;
        case 'down': this.snakeBody[0][1] += 1;
            break;
    }
    removeClass('snake');
    snake();

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
        switch (this.direct) {
            case 'right': this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'left': this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'up': this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'down': this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                break;
        }
    }

    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / 20) {
        reloadGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / 20) {
        reloadGame();
    }
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for (var i = 1; i < this.snakeBody.length; i++) {
        if (snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]) {
            reloadGame();
        }
    }
}

function reloadGame() {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [[4, 2, 'head'], [3, 2, 'body'], [2, 2, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block';
    loserScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startGameBool = true;
    control = true;
    controlBtn.setAttribute('src', 'snake/start.png');

}

function removeClass(className) {
    var classList = document.getElementsByClassName(className);
    while (classList.length > 0) {
        classList[0].parentNode.removeChild(classList[0]);
    }
}

function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;

            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;

            }
            break;
    }
}

function blindEvent() {

    close.onclick = function () {
        loser.style.display = 'none';
        startPage.style.display = 'block';
    }
    startBtn.onclick = function () {
    
        if (startGameBool) {
            startGame();
            
            startGameBool = false;
        }
        // startAndPause();
    }
    controlBtn.onclick = function () {
        startAndPause();
    }
}

function startAndPause() {
    if (control) {
        // if (startGameBool) {
        //     startGame();
        //     startGameBool = false;
        // }
        controlBtn.setAttribute('src', 'snake/pause.png');
        document.onkeydown = function (e) {
            var code = e.keyCode;
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                cancelHandler(e);
            }
            setDirect(code);
        }
        snakeMove = setInterval(function () {
            move();
        }, this.speed);
        control = false;
    } else {
        controlBtn.setAttribute('src', 'snake/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        control = true;
    }
}

