var play_state = {
	create: function(){
		this.debugDisplay = false;
	
		//scores
		this.papersCollected = 0;
		this.papersFaxed = 0;
		
		//score text
		this.paperCountText = game.add.text(this.game.width, 10, "Papers: 0", {
			font: "15px Arial",
			fill: "#ffffff"
		});
		this.paperFaxedText = game.add.text(this.game.width, 30, "Faxed: 0", {
			font: "15px Arial",
			fill: "#ffffff"
		});
		this.paperCountText.position.x = this.game.width - this.paperCountText.width - 10;
		this.paperFaxedText.position.x = this.game.width - this.paperFaxedText.width - 10;
		
		//create entities
		this.player = new Player(this.game, this);
		this.faxMachine = new FaxMachine(this.game, this);
		this.sharks = new Sharks(this.game, this);
		this.papers = new Papers(this.game, this);
		
		this.entities = [this.faxMachine, this.papers, this.player, this.sharks];
		this.entities.forEach(function(entity){
			entity.create();
		});
	},
	render: function(){
		if(this.debugDisplay){
			this.entities.forEach(function(entity){
				if(entity.sprite instanceof Phaser.Group){
					entity.sprite.forEach(function(entityGroupMember){
						game.debug.spriteBounds(entityGroupMember);
					});
				}
				else{
					game.debug.spriteBounds(entity.sprite);
				}
			});
		}
	},
	update: function(){
		this.entities.forEach(function(entity){
			entity.update();
		});
		this.checkCollision();
		this.updateUI();
	},
	checkBounds: function(sprite1, sprite2){
		return Phaser.Rectangle.intersects(sprite1.getBounds(), sprite2.getBounds());
	},
	checkCollision: function(){
		game.physics.arcade.collide(this.player.sprite, this.papers.sprite, this.collectPaper, null, this);
		
		if(this.checkBounds(this.player.sprite, this.faxMachine.sprite)){
			this.faxMachine.faxPapers();
		}
		var selfref = this;
		this.sharks.sprite.forEach(function(shark){
			if(selfref.checkBounds(selfref.player.sprite, shark)){
				selfref.collideEnemy();
			}
		});
	},
	collideEnemy: function(){
		game.state.start("gameover");
	},
	collectPaper: function(player, paper){
		paper.kill();
		this.papersCollected += 1;
	},
	updateUI: function(){
		this.paperCountText.setText("Papers: " + this.papersCollected);
		this.paperCountText.position.x = this.game.width - this.paperCountText.width - 10;
		this.paperFaxedText.setText("Faxed: " + this.papersFaxed);
		this.paperFaxedText.position.x = this.game.width - this.paperFaxedText.width - 10;
	}
};