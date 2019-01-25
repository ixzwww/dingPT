//点击startGame 游戏开始 开始界面消失
//随机生成食物 蛇开始运动
//出现控制按钮
//上下左右改变方向运动
//利用坐标碰撞检测 数组为蛇加1 分数增加
//判断边界 蛇身碰撞
//游戏结束 分数出现 结束页面出现
//游戏结束重置变量 恢复初始化

var content = $('#content');
var scoreBox = $('#score');
var loser = $('#loser');
var loserScore = $('#loserScore');
var close = $('#close');
var controlBtn = $('#controlBtn');
var startPage = $('#startPage');
var startBtn = $('#startBtn');
var startGameBool = true;
var control = true;
var snakeMove;

init();
function init() {
    this.map = content;
    this.mapW = content.width();
    this.mapH = content.height();

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
    startPage.css('display', 'none');
    controlBtn.css('display', 'block');
    food();
    snake();

}

function food() {
    var food = $('<div>');
    food.addClass('food');
    food.css({
        width : this.foodW ,
        height : this.foodH,
        position : 'absolute'
    });

    this.foodX = Math.floor(Math.random() * (this.mapW / 20 - 1));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20 - 1));
    food.css({
        left : this.foodX * 20 ,
        top : this.foodY * 20 
        
    });
    this.map.append(food);
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = $('<div>');
        snake.addClass('snake');
        snake.addClass(this.snakeBody[i][2]);
        snake.css({
            width : this.snakeW ,
            height : this.snakeH,
            position : 'absolute',
            left : this.snakeBody[i][0] * 20,
            top : this.snakeBody[i][1] * 20
        });
        this.map.append(snake);
        switch (this.direct) {
            case 'right':
                break;
            case 'left': snake.css('transform','rotate(180deg)');
                break;
            case 'up': snake.css('transform','rotate(270deg)');
                break;
            case 'down': snake.css('transform','rotate(90deg)');
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
    $('.snake').remove();
    snake();

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        this.score += 1;
        scoreBox.html(this.score);
        $('.food').remove();
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
    $('.snake').remove();
    $('.food').remove();
    clearInterval(snakeMove);
    this.snakeBody = [[4, 2, 'head'], [3, 2, 'body'], [2, 2, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.css('display','block');
    loserScore.html(this.score);
    this.score = 0;
    scoreBox.html(this.score);
    startGameBool = true;
    control = true;
    controlBtn.attr('src', 'snake/start.png');

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

    close.click(function () {
        loser.css('display', 'none');
    });

    startBtn.click(function () {
        startAndPause()
    });

    controlBtn.click(function () {
        startAndPause()
    });
}

function startAndPause() {
    if (control) {
        if (startGameBool) {
            startGame();
            startGameBool = false;
        }
        controlBtn.attr('src', 'snake/pause.png');
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
        controlBtn.attr('src', 'snake/start.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            e.returnValue = false;
            return false;
        }
        control = true;
    }
}

