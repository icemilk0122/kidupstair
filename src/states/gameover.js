class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var endBg = this.add.sprite(this.world.centerX, 0, 'endBg');
    endBg.anchor.set(0.5, 0);
    var endlogo = this.add.sprite(this.world.centerX, 150, 'endlogo');
    endlogo.anchor.set(0.5, 0);
    var replay_Btn = this.add.sprite(this.world.centerX, 600, 'replay_Btn');
    replay_Btn.anchor.set(0.5, 0);
    replay_Btn.inputEnabled = true;
    replay_Btn.events.onInputDown.add(this.restartGame, this);

    this.saveVarsToLocalStorage();
  }

  saveVarsToLocalStorage(){

  }

  resetGlobalVariables(){

  }

  update() {}

  restartGame () {
    this.resetGlobalVariables();
    this.game.state.start('main');
  }

}

export default Menu;
