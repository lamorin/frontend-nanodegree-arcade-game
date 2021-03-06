(function (global) {
    var configuration = {
        "limits" : {
                    "upperLimit" : -80,
                    "rightLimit" : 500,
                    "downLimit" : 450,
                    "leftLimit" : -50
        },
        "stepX" : 100,
        "stepY" : 83,
        "rowRockOne" : 229,
        "rowRockTwo" : 146,
        "rowRockThree" : 63,
        "minimumSpeed" : 10,
        "maximumSpeed" : 500,
        "playerInitX" : 200,
        "playerInitY" : 405
    };

    var Entity = function(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = '';
    };

    Entity.prototype.moveToXY = function(x,y) {
        this.x = x;
        this.y = y;
    };

    Entity.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    Entity.prototype.update = function() {};

    // Enemies our player must avoid
    var Enemy = function(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        Entity.call(this, x, y);
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        //this.sprite = 'images/enemy-bug.png';
    };

    Enemy.prototype = Object.create(Entity.prototype);

    Enemy.prototype.constructor = Entity;

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //this.x = this.x + 200 * dt;
        if(this.x > 500) {
            this.x = 0;
        }

        this.x = this.x + this.speed * dt;
    };

    // Draw the enemy on the screen, required method for game
    //Enemy.prototype.render = function() {
    //    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //};

    // Now write your own player class
    // This class requires an update(), render() and
    // a handleInput() method.
    var Player = function(x, y) {
        Entity.call(this,x,y);
        this.sprite = 'images/char-boy.png';
    };

    Player.prototype = Object.create(Entity.prototype);

    Player.prototype.constructor = Entity;

    Player.prototype.handleInput = function(m){
        switch (m) {
          case 'left':
            this.moveLeft();
            break;
          case 'up':
            this.moveUp();
            break;
          case 'right':
            this.moveRight();
            break;
          default:
            this.moveDown();
            break;
        }
    };

    Player.prototype.moveLeft = function() {
        if (this.x - configuration.stepX > configuration.limits.leftLimit) {
            this.x -= configuration.stepX;
        }
    };

    Player.prototype.moveRight = function() {
        if (this.x + configuration.stepX < configuration.limits.rightLimit) {
            this.x += configuration.stepX;
        }
    };

    Player.prototype.moveUp = function() {
        if (this.y - configuration.stepY > configuration.limits.upperLimit) {
            this.y -= configuration.stepY;
        }
    };

    Player.prototype.moveDown = function() {
        if (this.y + configuration.stepY < configuration.limits.downLimit) {
            this.y += configuration.stepY;
        }
    };

    Player.prototype.update = function() {};

    Player.prototype.restart = function() {
        this.x = 0;
        this.y = 405;
    };

    var randomSpeed = function() {
        var speed = Math.random() * configuration.maximumSpeed;
        if (speed < configuration.minimumSpeed) {
            speed = configuration.minimumSpeed;
        }
        return speed;
    };

    var createEnemies = function() {
        var enemies = [];
        enemies.push(new Enemy(0,configuration.rowRockThree, randomSpeed()));
        enemies.push(new Enemy(0,configuration.rowRockThree, randomSpeed()));
        enemies.push(new Enemy(0,configuration.rowRockTwo, randomSpeed()));
        enemies.push(new Enemy(0,configuration.rowRockOne, randomSpeed()));

        return enemies;

    };

    var createPlayer = function() {
        var player = new Player(configuration.playerInitX,configuration.playerInitY);
        return player;
    };

    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player


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

    global.App = {
        createEnemies : createEnemies,
        createPlayer : createPlayer
    };

})(this);

var player = App.createPlayer();
var allEnemies = App.createEnemies();