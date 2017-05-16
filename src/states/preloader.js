class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  update() {
      if (this.ready) {
        this.game.state.start('main');
      }
  }

  loadResources() {
      // load your resources here
      this.load.image('coverBg', 'assets/Start Background.png');
      this.load.image('index_logo', 'assets/logo.png');
      this.load.image('join_btn', 'assets/start.png');
      this.load.image('menuBg', 'assets/Choose Background.png');
      this.load.image('menuTitle', 'assets/choose-name.png');
      this.load.image('menuStage1', 'assets/Food shoes.png');
      this.load.image('menuStage2', 'assets/Hospital shoes.png');
      this.load.image('menuStage3', 'assets/Shaping shoes.png');
      this.load.image('menuStage4', 'assets/Time shoes.png');
      this.load.image('endBg', 'assets/End Background.png');
      this.load.image('endlogo', 'assets/END PAGE game over.png');
      this.load.image('replay_Btn', 'assets/Again.png');

  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
