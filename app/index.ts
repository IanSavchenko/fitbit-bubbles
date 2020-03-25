import {getScreenSize} from './screen-size';
import {display} from 'display';
import {PositionGenerator} from './position-generator';
import {render} from './render';
import {createBubbles} from './bubbles-factory';
import {Bubble} from './bubble';
import {vibration} from 'haptics';
import {Renderer} from './renderer';
import {BabyLock} from './baby-lock';
import document from 'document';
import {Scoreboard} from './scoreboard';
import {Popup} from './popup';

function _setupBabyLock() {
  BabyLock.instance.enable();

  const onKeyPress = function(e: KeyboardEvent) {
    if (e.key === 'back' && BabyLock.instance.ignoreExitOnClick()) {
      e.preventDefault();
    }
  };

  document.onkeypress = onKeyPress;
}

function _addVibrateOnPop(bubbles: Array<Bubble>) {
  for(const bubble of bubbles) {
    bubble.onPop.push(function({isUserInitiated}) {
      if(isUserInitiated) {
        vibration.start('bump');
      }
    });
  }
}

function _addPointsOnPop(bubbles: Array<Bubble>, scoreboard: Scoreboard) {
  for(const bubble of bubbles) {
    bubble.onPop.push(function({isUserInitiated}) {
      if(isUserInitiated) {
        scoreboard.addBubble();
      }
    });
  }
}

function _setupGame() {
  const bubbles = createBubbles();
  _addVibrateOnPop(bubbles);

  const scoreboard = new Scoreboard();
  _addPointsOnPop(bubbles, scoreboard);
  scoreboard.onGameOver.push(function() {
    Popup.instance.show(
      'Game Over', 
      `Your score is ${scoreboard.score}.`, 
      'Try again', function() {
        scoreboard.reset();
      });
  });
  
  const screenSize = getScreenSize();
  const positionGenerator = new PositionGenerator(screenSize, bubbles);
  const renderer = new Renderer(bubbles, screenSize, positionGenerator, render);

  renderer.start();
  scoreboard.reset();
}

function main() {
  display.autoOff = false;

  _setupBabyLock();
  _setupGame();
}

main();