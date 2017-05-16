class Game4 extends Phaser.State {

  constructor() {
    super();
  }

  init() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.world.setBounds(-this.game.world.centerX+180,0,this.game.world.centerX,1620);

    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 550;
  }

  //load the game assets before the game starts
  preload() {
    this.load.image('bg', 'assets/stage4/images/food-01.png');
    this.load.image('ground', 'assets/stage4/images/ground.png');
    this.load.image('platform', 'assets/stage4/images/platform.png');
    this.load.image('goal', 'assets/stage4/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/stage4/images/arrowButton.png');
    this.load.image('actionButton', 'assets/stage4/images/actionButton.png');
    //this.load.image('barrel', 'assets/images/barrel.png');

    this.load.spritesheet('player', 'assets/stage4/images/player_spritesheet.png', 36, 40, 5, 1, 1);
    //this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);

    this.load.text('level', 'assets/stage4/data/level.json');
  }
  //executed after everything is loaded
  create() {
    this.bg = this.add.sprite(0, 0, 'bg');
    //this.bg.anchor.setTo(0.5,0);
    this.ground = this.add.sprite(0, 1560, 'ground');
    //this.ground.anchor.setTo(0.5,0);
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    //parse the file
    this.levelData = JSON.parse(this.game.cache.getText('level'));

    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    this.levelData.platformData.forEach(function(element){
      this.platforms.create(element.x, element.y, 'platform');
    }, this);

    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.allowGravity', false);

    //fires
    //this.fires = this.add.group();
    //this.fires.enableBody = true;

    //var fire;
    /*this.levelData.fireData.forEach(function(element){
      fire = this.fires.create(element.x, element.y, 'fire');
      fire.animations.add('fire', [0, 1], 4, true);
      fire.play('fire');
    }, this);*/

    //this.fires.setAll('body.allowGravity', false);

    //goal
    this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal');
    //this.goal.anchor.setTo(0.5,0);
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;

    //create player
    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
    //this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    //this.player.body.collideWorldBounds = true;

    this.game.camera.follow(this.player);

    //this.createOnscreenControls();

    //this.barrels = this.add.group();
    //this.barrels.enableBody = true;

    //this.createBarrel();
    //this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this)
  }
  update() {
    this.game.physics.arcade.collide(this.player, this.bg);
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platforms);

    //this.game.physics.arcade.collide(this.barrels, this.ground);
    //this.game.physics.arcade.collide(this.barrels, this.platforms);

    //this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    //this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, (player, goal)=> {
      this.game.world.setBounds(0,0,window.innerWidth, window.innerHeight);
      this.game.state.start('gameover');
    });

    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 3;

    }

    if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }

    /*this.barrels.forEach(function(element){
      if(element.x < 10 && element.y > 600) {
        element.kill();
      }
    }, this);*/
  }
  //*/killPlayer: function(player, fire) {
    //console.log('auch!');
    //game.state.start('GameState');
  //},*/
  win(player, goal) {
    //alert('you win!');
    console.log(this.game);
    this.game.state.start('gameover');
  }
  createBarrel() {
    //give me the first dead sprite
    var barrel = this.barrels.getFirstExists(false);

    if(!barrel) {
      barrel = this.barrels.create(0, 0, 'barrel');
    }

    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1, 0);

    barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
  }
  endGame() {
    this.game.state.start('gameover');
  }
  // render() {
  //   // Camera
  //   this.game.debug.cameraInfo(this.game.camera, 32, 32);
  // }
}

export default Game4;
