Sharks = function(game){
	this.game = game;
	this.sprite = null;
};

Sharks.prototype = {
	create: function(){
		this.sprite = this.game.add.group();
		this.sprite.enableBody = true;
		this.sprite.createMultiple(2, "shark");
		this.sprite.callAll('animations.add', 'animations', 'swim', [0, 1, 2, 1, 0, 3, 4, 3], 5, true);
		this.sprite.callAll('animations.play', 'animations', 'swim');
	},
	update: function(){
		this.createShark();
	},
	createShark: function(){
		var shark = this.sprite.getFirstDead();
		
		if(shark){
			shark.revive();
			
			var x = Math.random() + 0.5 > 1 ? this.game.width : 0;
			var y = Math.random() * (this.game.height);
			shark.reset(x, y);
			
			var sharkspeed = 200;
			
			if(x === 0){
				shark.body.velocity.x = sharkspeed;
				shark.scale.x = -1;
			}
			else{
				shark.body.velocity.x = -sharkspeed;
				shark.scale.x = 1;
			}
			
			shark.checkWorldBounds = true;
			shark.outOfBoundsKill = true;
		}
	}
};