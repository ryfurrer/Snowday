var player, platforms, cursors, jumpButton, blocks, health;
var snowballs, treasure, walls, signs, exit, gemsCollected, totalGems;
var score, time, timer;
var scoreText, timeText, gemText;


// Create our 'main' state that will contain the game
var mainState = {
    
    init: function () {
        "use strict";
        game.scale.setGameSize(1066, 600);
        score = 0;
        time = 0;
        gemsCollected = 0;
        health = 100;
        totalGems = 0;
    },
    
    preload: function () {
        "use strict";
        
        game.world.setBounds(0, 0, 9500, 1080);
        
        game.add.tileSprite(0, 0, 9500, 1080, 'background');
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var mount = game.add.sprite(4100, 498, 'rock');
        mount.scale.setTo(0.4);
        mount.angle = 1.5;

        platforms = game.add.physicsGroup();
        blocks = game.add.physicsGroup();
        platforms.add(blocks);
        treasure = game.add.group();
        treasure.enableBody = true;

    },
    
    createMap: function () {
        var level = [
            '1                                x      x C x           F   f  F     F  f     F     F   F  f      F   x                x                       x',
            '2                                 x     x   x                                                         x                x                      Ex',
            '3                                 x     x   x                                                         xg               x      xxxxxxxxxxxxxxxxxx',
            '4                                  xx   x   x                                                         xxxxx            x     x                 x',
            '5              xxxxxxxxxxxxxxxx      x  x   x                                                         x                     xx                gx',
            '6                  x                  x x   x           pbbbpbbbpbbbpbbbpbbbpbbbpbbbpbbbpbbbpbbbx     x      xxxx            x         xxxxxxxxx',
            '7                  x                  xxx   x  x          f    f    f  f      f                 x    gx    x           x     x                 x',
            '8            x     x    xxxxxxxxxxxxxxxxx   x     x                                             x    xx                xx    xxxxxx            x',
            '9                  x                f   x   x                                                   x     x          xxxx  x     x                 x',
            '10    gq           xs                   x   x g      x                                          x     xxxxx            x     x                 x',
            '10    xxxxx        xpbbbpbbbpbbbpbbb    x   xpbbbpbbbpbbbpbbbpbbbpbbbpbbbpbbbpbbbx              xg    x                x   xxxxxxxxxxxxx       x',
            '11                 x                    x   x                                                   xx    x       xxxx     x                       x',
            '12            xxxxxx                    x   x                                      xxxx         x     x                x                       x',
            '13            x         xxxxxxxxxxxxxxxx    x    x                g                    xx      Sx    xxxxxx            xxxxxxxxxxxxxxxxxxxx    x',
            '1P          x x                                        x          xs                           xx                xxxx                         x ',
            '15    gg  x x xs                                        x   x               x                x   x                                             x',
        ];
        
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    blocks.create(65*j, 65*i, 'block');
                } else if (level[i][j] == 'p'){
                    platforms.create(65*j, 65*i, 'platform');
                } else if (level[i][j] == 'g'){
                    totalGems++;
                    treasure.create(65*j, 65*i+30, 'gem');
                } else if (level[i][j] == 's'){
                    this.createSnowman(350, 65*j, 65*i-17, 1500);
                } else if (level[i][j] == 'q'){
                    this.createSnowman(350, 65*j, 65*i-17, 3300);
                }  else if (level[i][j] == 'S'){
                    this.createSnowman(-350, 65*j, 65*i-17, 1500);
                }  else if (level[i][j] == 'f'){
                    game.time.events.loop(1600, this.fireSnowball, this, 0, 250, 65*j+25, 65*i);
                }  else if (level[i][j] == 'F'){
                    game.time.events.loop(1200, this.fireSnowball, this, 0, 400, 65*j+25, 65*i+25);
                }  else if (level[i][j] == 'E'){
                    exit = game.add.sprite(65*j,65*i-12,'exit');
                }  else if (level[i][j] == 'P'){
                    player = game.add.sprite(65*j, 65*i, 'player');
                    player.scale.setTo(0.95);
                }
            }
        }
    },
    
    createSnowman: function (speed, basePositionX, basePositionY, frequency) {
        game.add.sprite(basePositionX, basePositionY, 'snowman');
        game.time.events.loop(frequency, this.fireSnowball, this, speed, 0, basePositionX+15, basePositionY+25);
    },
    

    create: function () {
        "use strict";

        game.time.events.loop(1000, this.updateTimer, this);
        
        snowballs = game.add.group();
        snowballs.enableBody = true;
        snowballs.setAll('checkWorldBounds', true);
        snowballs.setAll('outOfBoundsKill', true);

        this.createMap();
        
        platforms.create(0, 1040, 'ground');
        platforms.create(1920, 1040, 'ground');
        platforms.create(3840, 1040, 'ground');
        platforms.create(5760, 1040, 'ground');
        platforms.create(7680, 1040, 'ground');

        platforms.setAll('body.immovable', true);
        blocks.setAll('body.immovable', true);
        
        
        //game.time.events.add(1000, this.fireSnowball, this);
        
        
        game.physics.arcade.enable(exit);
        signs = game.add.physicsGroup();
        
        signs.create(20, -5, 'sign');
        signs.create(20, -60, 'sign');
        var gem = game.add.sprite(250,32,'gem');
        gem.alpha = 0.6;
        signs.setAll('body.immovable', true);
        signs.fixedToCamera = true;
        gem.fixedToCamera = true;
        
        timeText = game.add.text(65, 85, "Health: " + health, {font: "20px Arial", fill: "#fff", align: "left"});
        scoreText = game.add.text(65, 30, "Score: " + score, {font: "20px Arial", fill: "#fff", align: "left"});
        gemText = game.add.text(205, 30, gemsCollected+"/"+totalGems, {font: "30px Arial", fill: "#fff", align: "left"});
        timeText.fixedToCamera = true;
        scoreText.fixedToCamera = true;
        gemText.fixedToCamera = true;

        // The player and its settings
        
        //player.scale.setTo(2);

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        
        game.camera.follow(player);
        //game.camera.deadzone = new Phaser.Rectangle(100, 150, 500, 300);
        game.camera.focusOnXY(0, 0);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        
    },
    
    
    updateTimer: function () {
        "use strict";
        time += 1;
        
    },
    
    
    fireSnowball: function (speedX, speedY, positionX, positionY) {
        "use strict";
        var b = snowballs.create(positionX, positionY, 'snowball');
        b.body.velocity.x = speedX;
        b.body.velocity.y = speedY;
    },

    update: function () {
        "use strict";
        scoreText.text = "Score: " + score;
        timeText.text = "Health: " + health;
        // Here we update the game 60 times per second
        game.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(player, blocks);
        game.physics.arcade.collide(treasure, platforms);
        game.physics.arcade.collide(treasure, blocks);

        
        game.physics.arcade.overlap(player, treasure, this.collectJem, null, this);
        game.physics.arcade.overlap(player, snowballs, this.hitPlayer, null, this);
        game.physics.arcade.overlap(platforms, snowballs, this.hitWall, null, this);
        game.physics.arcade.overlap(player, exit, this.endScreen, null, this);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //player.animations.play('left');
            player.body.velocity.x = -290;
        } else if (cursors.right.isDown) {
            //player.animations.play('right');
            player.body.velocity.x = 290;
        } else {
            
            //player.animations.stop();
        }
        
        if (cursors.down.isDown) {

            player.body.velocity.y = 300;
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
            player.body.velocity.y = -350;
        }
    },
    
    hitPlayer: function (player, ball) {
        "use strict";
        ball.kill();
        if (health > 10) {
            health -= 10;
            score -= 15;
        } else {
            game.state.start('end', true, false, false);
        }
    },
    
    hitWall: function (player, ball) {
        "use strict";
        ball.kill();
    },
    
    collectJem: function (player, gem) {
        "use strict";
        gem.kill();
        gemsCollected++;
        gemText.text = gemsCollected+"/"+totalGems;
        score += 50;
    },
    
    endScreen: function () {
        "use strict";
        game.state.start('end', true, false, true);
    },
};