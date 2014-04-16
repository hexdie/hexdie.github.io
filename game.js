var game = new Phaser.Game(800, 400, Phaser.AUTO, "gamediv");

game.state.add("load", load_state);
game.state.add("play", play_state);
game.state.add("gameover", gameover_state);

game.state.start("load");