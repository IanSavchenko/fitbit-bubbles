import {Bubble} from './bubble';
import document from 'document';
import {BubbleColors} from './bubble-colors';
import {SettingsManager} from './settings-manager';
import {Scoreboard} from './scoreboard';
import {vibration} from 'haptics';

function _bubblesFromElements(): Array<Bubble> {
  let bubbleEls = document.getElementsByClassName('bubble');
  bubbleEls = bubbleEls.slice(1); // skip first one which is the symbol itself
  
  const bubbles = bubbleEls.map(function(bubble) {
    return new Bubble(bubble as GraphicsElement);
  });

  return bubbles;
}

export function createBubbles(settingsManager: SettingsManager, scoreboard: Scoreboard): Array<Bubble> {
  const bubbles = _bubblesFromElements();
  const colors = Object.keys(BubbleColors).filter(k => typeof BubbleColors[k as any] === 'number');
    
  for(let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i];

    // set color
    bubble.color = BubbleColors[colors[i]];

    // vibrate when popped by user
    bubble.onPop.push(function({isUserInitiated}) {
      if (!settingsManager.data.vibrateOnPopEnabled) {
        return;
      }

      if (isUserInitiated) {
        vibration.start('bump');
      }
    });

    // add points to scoreboard when popped by user
    bubble.onPop.push(function({isUserInitiated}) {
      if (!settingsManager.data.keepScoreEnabled) {
        return;
      }
      
      if (isUserInitiated) {
        scoreboard.addBubble();
      }
    });
  }
  
  return bubbles;
}