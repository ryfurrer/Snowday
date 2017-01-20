var gameProperties = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,

    scaleRatio: window.devicePixelRatio/3,

};

var bootState = {
    
    preload: function () {
        game.load.image('ground', 'assets/ground.png');
        game.load.spritesheet('player', 'assets/peng.png');
        game.load.image('platform', 'assets/snow-block.png');
        game.load.image('block', 'assets/icleblock.png');
        game.load.image('gem', 'assets/diamond.png');
        game.load.image('background', 'assets/airadventurelevel4-1.png');
        game.load.image('sign', 'assets/sign2.png');
        game.load.image('exit', 'assets/castledoors.png');
        game.load.image('snowball', 'assets/snowball2.png');
        game.load.image('snowman', 'assets/snowman2.png');
        game.load.image('rock', 'assets/rock_snowy_1.png');
        game.load.image('playButton', 'assets/button.png');
        game.load.image('orangePlay', 'assets/clickMe.png');
    },
    
    create: function () {
        "use strict";
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        this.input.maxPointers = 1;
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, gameProperties.screenWidth, window.innerHeight);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, gameProperties.screenWidth, window.innerHeight);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
        }
        
        game.state.start('main');
    }
};

var game = new Phaser.Game(1066, 600);

game.state.add('boot', bootState);
game.state.add('main', mainState);
game.state.add('end', endState);
//	Now start the Boot state.
game.state.start('boot');