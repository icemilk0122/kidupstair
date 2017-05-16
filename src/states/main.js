class Main extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    var coverBg = this.add.sprite(this.world.centerX, 0, 'coverBg');
    coverBg.anchor.set(0.5, 0);
    var logo = this.add.sprite(this.world.centerX, 150, 'index_logo');
    logo.anchor.set(0.5, 0);
    var join_Btn = this.add.sprite(this.world.centerX, 600, 'join_btn');
    join_Btn.anchor.set(0.5, 0);
    join_Btn.inputEnabled = true;
    join_Btn.events.onInputDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('menu');
  }

}

export default Main;
