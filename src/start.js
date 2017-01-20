
var startState = {

    init: function () {
        "use strict";
        game.scale.setGameSize(1066, 600);
    },
    
    create: function () {
        "use strict";
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        game.add.sprite(0, 0, 'background').scale.setTo(0.6);
        
		this.add.button(400, 350, 'playButton', this.startGame, this);

        var txt = "Snowday";
        var text = "Collect all the gems and \nthen get to the exit.";
        game.add.text(533-80/4-22*txt.length-2, 60, txt, {font: "80px Arial", fill: "#000", align: "center"});
        game.add.text(533-40/2/4*text.length, 180, text, {font: "40px Arial", fill: "#000", align: "center"});
        game.add.text(454, 362, "Start Game", {font: "20px Arial", fill: "#000000", align: "center"});
        
    },
    
    startGame: function (pointer) {

		//	And start the actual game
		this.state.start('main', true, false);

	},
    
};