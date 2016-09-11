// Enemies our player must avoid
var Enemy = function(i) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()*300 + 50;
    this.x = -30;
    this.yPos = [60, 140, 220];
    this.y = this.yPos[i];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500){
        this.x = -30;
        this.speed = Math.random()*300 + 50;
    }
    
    //enemy area
    this.area = {
        'x': this.x,
        'y': this.y + 75,
        'xWidth': 101,
        'yHeight': 70
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "rgba(0,255,0,0.5)";
    ctx.fillRect(this.x,this.area.y,this.area.xWidth,this.area.yHeight);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
    this.movementY = 80;
    this.movementX = 100;
}

Player.prototype.update = function(){
    //update method
    var thisPlayer = this;
    var win = function(){
        thisPlayer.y = 380;
    }
    if (this.y === -20){
        setTimeout(win,1000);
    }
    
    //define area
    this.area = {
        'x': this.x + 10,
        'y': this.y + 85,
        'xWidth': 80,
        'yHeight': 60
    }
}

Player.prototype.render = function(){
    //render method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // player area
    ctx.fillStyle = "rgba(255,255,0,0.5)";
    ctx.fillRect(this.area.x,this.area.y,this.area.xWidth,this.area.yHeight);
}

Player.prototype.handleInput = function(key) {
    //handleInput method
    if(key === 'up' && this.y != -20){
        this.y -= this.movementY;
    }

    if(key === 'down' && this.y != 380){
        this.y += this.movementY;
    }

    if(key === 'left' && this.x != 0){
        this.x -= this.movementX;
    }

    if(key === 'right' && this.x != 400){
        this.x += this.movementX;
    }
//    console.log("X: " + this.x + " - Y:" + this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//loop to add two enemies per row
for (var i = 0; i < 3 ; i++){
    for (var j = 0; j < 2; j++){
        var enemy = new Enemy(i);
        allEnemies.push(enemy);    
    }
}

var player = new Player();


var test = function(){
//    console.log("Player coordinates: X - " + player.x + " Y: " + player.y);
//    console.log("Player coordinates: X - " + allEnemies[i].x + " Y: " + allEnemies[i].y);
    console.log(player.area.x);
    
}

    window.addEventListener('click', test);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Check for collisions function
var checkCollisions = function(){
    var playerArea = player.area;
    for (var i = 0; i < allEnemies.length; i++){
        var enemyArea = allEnemies[i].area;
        if (enemyArea.x + enemyArea.xWidth > playerArea.x && 
           enemyArea.x < playerArea.x + playerArea.xWidth &&
           enemyArea.y + enemyArea.yHeight > playerArea.y &&
           enemyArea.y < playerArea.y + playerArea.yHeight){
            console.log("Collision detected!")
        }
    }
}
