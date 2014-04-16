Player = function(game, gameState){
	this.game = game;
	this.gameState = gameState;
	this.sprite = null;
};

Player.prototype = {
	create: function(){
		this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, "player");
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.x = (this.game.width / 2) - (this.sprite.width / 2);
		this.sprite.y = (this.game.height / 2) - (this.sprite.height / 2);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.animations.add("stopped", [0, 1]);
		this.sprite.animations.play("stopped", 1, true);
	},
	update: function(){
		this.checkPlayerAcceleration();
		this.checkInput();
	},
	checkInput: function(){
		var velocityValue = 150;
		var accelerationValue = 200;
		
		var velocity = this.sprite.body.velocity;
		var acceleration = this.sprite.body.acceleration;
		
		//In each of these checks, if the player is already moving in the opposite axis
		//then the player's acceleration and velocity in the direction the player wishes to move
		//is set to the acceleration and velocity of that the player is already moving in 
		//the opposite axis.
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && acceleration.y <= 0){
			if(velocity.x != 0){
				velocity.y = Math.min(velocity.x, (velocity.x * -1));
				acceleration.y = Math.max(acceleration.x, (acceleration.x * -1));
			}
			else{
				velocity.y = -velocityValue;
				acceleration.y = accelerationValue;
			}
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && acceleration.y >= 0){
			if(velocity.x != 0){
				velocity.y = Math.max(velocity.x, (velocity.x * -1));
				acceleration.y = Math.min(acceleration.x, (acceleration.x * -1));
			}
			else{
				velocity.y = velocityValue;
				acceleration.y = -accelerationValue;
			}
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && acceleration.x <= 0){
			if(velocity.y != 0){
				velocity.x = Math.min(velocity.y, (velocity.y * -1));
				acceleration.x = Math.max(acceleration.y, (acceleration.y * -1));
			}
			else{
				velocity.x = -velocityValue;
				acceleration.x = accelerationValue;
			}
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && acceleration.x >= 0){
			if(velocity.y != 0){
				velocity.x = Math.max(velocity.y, (velocity.y * -1));
				acceleration.x = Math.min(acceleration.y, (acceleration.y * -1));
			}
			else{
				velocity.x = velocityValue;
				acceleration.x = -accelerationValue;
			}
		}
	},
	checkPlayerAcceleration: function(){
		var velocity = this.sprite.body.velocity;
		var acceleration = this.sprite.body.acceleration;
	
		if(acceleration.y > 0 && velocity.y > 0){
			velocity.y = 0;
			acceleration.y = 0;
		}
		else if(acceleration.y < 0 && velocity.y < 0){
			velocity.y = 0;
			acceleration.y = 0;
		}
		if(acceleration.x > 0 && velocity.x > 0){
			velocity.x = 0;
			acceleration.x = 0;
		}
		else if(acceleration.x < 0 && velocity.x < 0){
			velocity.x = 0;
			acceleration.x = 0;
		}
	}
};