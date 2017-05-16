import Boot from './states/boot';
import Game from './states/game';
import Game2 from './states/game2';
import Game3 from './states/game3';
import Game4 from './states/game4';
import Main from './states/main';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'kidupstair-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
game.state.add('game2', new Game2());
game.state.add('game3', new Game3());
game.state.add('game4', new Game4());
game.state.add('main', new Main());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());

game.state.start('boot');
