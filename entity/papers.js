Papers = function(game, gameState){
	this.game = game;
	this.gameState = gameState;
};

Papers.prototype = {
	create: function(){
		this.sprite = this.game.add.group();
		this.sprite.enableBody = true;
		this.sprite.createMultiple(1, "paper");
	},
	update: function(){
		this.createPaper();
	},
	createPaper: function(){
		var paper = this.sprite.getFirstDead();
		
		if(paper){
			paper.revive();
			
			var x = Math.random() * (this.game.width - paper.width);
			var y = Math.random() * (this.game.height - paper.height);
			paper.reset(x, y);
		}
	}
};