var load_state = {
	preload: function(){
		this.game.stage.backgroundColor = 0xACD3E3;
		this.game.load.spritesheet("player", "assets/squidboy.png", 40, 48, 3);
		this.game.load.spritesheet("shark", "assets/loanshark.png", 96, 66, 5);
		this.game.load.spritesheet("paper", "assets/document.png", 18, 20, 1);
		this.game.load.spritesheet("faxMachine", "assets/faxmachine.png", 40, 40, 9);
		this.game.load.image("progressBarOutline", "assets/progressBarOutline.png");
		this.game.load.image("progressBarFiller", "assets/progressBarFiller.png");
		this.game.load.image("progressBarBackground", "assets/progressBarBackground.png");
	},
	create: function(){
		this.game.state.start("play");
	}
};