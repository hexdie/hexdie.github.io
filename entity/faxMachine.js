FaxMachine = function(game, gameState){
	this.game = game;
	this.gameState = gameState;
	this.sprite = null;
};

FaxMachine.prototype = {
	create: function(){
		this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, "faxMachine");
		this.sprite.x = (this.game.width / 2) - (this.sprite.width / 2);
		this.sprite.y = (this.game.height / 2) - (this.sprite.height / 2);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.animations.add("faxing", [1, 2, 3, 4, 5, 6, 7, 8, 0]);
		this.sprite.frame = 0;
		this.isFaxing = false;
		
		//progress bar
		this.faxProgress = 0;
		this.progressBarBackground = game.add.sprite(0, 0, "progressBarBackground");
		this.progressBarMeter = game.add.sprite(0, 0, "progressBarFiller");
		this.progressBarMeterOutline = game.add.sprite(0, 0, "progressBarOutline");
		this.progressBarMeter.x = (this.game.width / 2) - (this.progressBarMeter.width / 2);
		this.progressBarMeter.y = this.sprite.y - 20;
		this.progressBarMeterOutline.x = this.progressBarMeter.x;
		this.progressBarMeterOutline.y = this.progressBarMeter.y;
		this.progressBarBackground.x = this.progressBarMeter.x;
		this.progressBarBackground.y = this.progressBarMeter.y;
		this.setProgressBarVisibility(false);
		this.progressTimer = game.time.create(false);
		
		this.progressCrop = {
			x: 0,
			y: 0,
			width: 0,
			height: this.progressBarMeter.height,
		};
	},
	update: function(){
		this.updateFax();
		this.updateProgressBar();
	},
	updateProgressBar: function(){
		if(this.isFaxing){
			this.setProgressBarVisibility(true);
			this.progressBarMeter.crop(this.progressCrop);
		}
	},
	faxPapers: function(){
		if(this.gameState.papersCollected > 0 && !this.isFaxing){
			this.isFaxing = true;
			this.sprite.animations.play("faxing", 3, true);
		}
	},
	setProgressBarVisibility: function(visible){
		this.progressBarMeter.visible = visible;
		this.progressBarMeterOutline.visible = visible;
		this.progressBarBackground.visible = visible;
	},
	updateFax: function(){
		if(this.isFaxing){
			if(!this.progressTimer.running){
				this.progressTimer.repeat(1, 100, function(){
					this.faxProgress += 1;
					this.progressCrop.width = this.progressBarMeterOutline.width * (this.faxProgress / 100);
				}, this);
				this.progressTimer.start();
			}
			if(this.faxProgress >= 100){
				this.isFaxing = false;
				this.faxProgress = 0;
				this.sprite.animations.stop();
				this.sprite.frame = 0;
				this.gameState.papersFaxed += 1;
				this.gameState.papersCollected -= 1;
				this.progressTimer.stop();
				this.progressCrop.width = 0;
				this.setProgressBarVisibility(false);
			}
		}
	}
};