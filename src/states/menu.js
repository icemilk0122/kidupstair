class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var coverBg = this.add.sprite(this.world.centerX, 0, 'menuBg');
  	coverBg.anchor.set(0.5, 0);
  	var logo = this.add.sprite(this.world.centerX, 200, 'menuTitle');
  	logo.anchor.set(0.5, 0);
  	var stage1_Btn = this.add.sprite(this.world.centerX-700, 260, 'menuStage1');
  	stage1_Btn.anchor.set(0.5, 0);
  	stage1_Btn.inputEnabled = true;
  	stage1_Btn.events.onInputDown.add(()=>{this.game.state.start('game');}, this);
    var stage2_Btn = this.add.sprite(this.world.centerX-230, 260, 'menuStage2');
  	stage2_Btn.anchor.set(0.5, 0);
  	stage2_Btn.inputEnabled = true;
  	stage2_Btn.events.onInputDown.add(()=>{this.game.state.start('game2');}, this);
    var stage3_Btn = this.add.sprite(this.world.centerX+230, 260, 'menuStage3');
  	stage3_Btn.anchor.set(0.5, 0);
  	stage3_Btn.inputEnabled = true;
  	stage3_Btn.events.onInputDown.add(()=>{this.game.state.start('game3');}, this);
    var stage4_Btn = this.add.sprite(this.world.centerX+700, 260, 'menuStage4');
  	stage4_Btn.anchor.set(0.5, 0);
  	stage4_Btn.inputEnabled = true;
  	stage4_Btn.events.onInputDown.add(()=>{this.game.state.start('game4');}, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;
