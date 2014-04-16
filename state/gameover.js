var gameover_state = {
	create: function(){
		this.gameOverText = game.add.text(this.game.width, 10, "GAME OVER", {
			font: "40px Arial",
			fill: "#ffffff"
		});
		this.playAgainText = game.add.text(this.game.width, 10, "Press enter to play again", {
			font: "15px Arial",
			fill: "#ffffff"
		});
		this.gameOverText.position.x = (this.game.width / 2) - (this.gameOverText.width / 2);
		this.playAgainText.position.x = (this.game.width / 2) - (this.playAgainText.width / 2);
		this.playAgainText.position.y = (this.game.height * 0.2);
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start("play");
		}
	}
};