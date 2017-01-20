var win, menuTop, menuRight;

var endState = {

    init: function (outcome) {
        "use strict";
        win = outcome;
        game.scale.setGameSize(gameProperties.screenWidth, gameProperties.screenHeight);
    },
    
    preload: function () {
        "use strict";
        this.game.stage.backgroundColor = '#fff';
        menuTop = (gameProperties.screenHeight - (256 * gameProperties.scaleRatio * 8)) * 0.5;
        menuRight = gameProperties.screenWidth * 0.25;
        this.menuCenter = gameProperties.screenWidth * 0.5;
        this.spacer = 256 * gameProperties.scaleRatio;
    },
    
    create: function () {
        "use strict";
        
        var bar = game.add.graphics();
        bar.beginFill(0x1E8F39, 1);
        bar.drawRect(0,0,gameProperties.screenWidth, 50);
        
         var resultStyle = {font: "bold 30px Arial", fill: "#000"}, headingStyle = {font: " 24px Arial", fill: "#000"};
        //var itemStyle = {font: " 18px Arial", fill: "#000"};

        if (win) {
            game.add.text(window.innerWidth / 2 - 130, menuTop, "You Win!", {font: "60px Arial", fill: "#000", align: "center"});
        } else {
            game.add.text(window.innerWidth / 2 - 140, 100, "You Died!", {font: "60px Arial", fill: "#000", align: "center"});
        }
        
        game.add.text(menuRight, 200, "Score: " + score + "\nGems Collected: "+ gemsCollected + "/" + totalGems, resultStyle);
        this.add.button(window.innerWidth/2 - 110, 400, 'orangePlay', this.startGame, this);
        game.add.text(window.innerWidth/2 - 32, 412, "Retry", headingStyle);
        
        //game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        
    },
    
    startGame: function (pointer) {

		//	And start the actual game
		this.state.start('main');

	}
};
