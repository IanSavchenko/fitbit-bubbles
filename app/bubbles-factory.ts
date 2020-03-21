import { Bubble } from './bubble';
import document from 'document';
import {BubbleColors} from './bubble-colors';

export function createBubbles() : Array<Bubble> {
    let bubbleEls = document.getElementsByClassName('bubble');
    bubbleEls = bubbleEls.slice(1); // skip first one which is the symbol itself
  
    const bubbles = bubbleEls.map(function(bubble) {
      return new Bubble(bubble as GraphicsElement);
    });
  
    const colors = Object.keys(BubbleColors).filter(k => typeof BubbleColors[k as any] === 'number');
    
    let i = 0;
    for(const bubble of bubbles) {
      bubble.color = BubbleColors[colors[i]];
      bubble.hide();  
      i++;
    }
  
    return bubbles;
}