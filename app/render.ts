import {ScreenSize} from './screen-size';
import {Bubble, BubbleState} from './bubble';
import {PositionGenerator} from './position-generator';
import {SettingsManager} from './settings-manager';

export interface RenderContext {
    screenSize: ScreenSize;
    bubbles: Array<Bubble>;
    positionGenerator: PositionGenerator;
    msDiff: number;
    settingsManager: SettingsManager;
}

const BUBBLE_POP_SCALE = 0.8;
const BUBBLE_SHOW_SCALE_BASE = 0.3;
const BUBBLE_SHOW_SCALE_RANDOM = 0.4;
const BUBBLE_POP_SCALE_DIFF = 0.3;

const BUBBLE_MOVING_SHOW_BOX = {
  left: 0.05,
  right: 0.05,
  top: -0.1,
  bottom: 0.2
};

const BUBBLE_STATIC_SHOW_BOX = {
  left: 0.05,
  right: 0.05,
  top: 0.05,
  bottom: 0.05
};

function _bringBubbleOnTop(bubble: Bubble, ctx: RenderContext): void {
  // lower z of every bubble
  for(const b of ctx.bubbles) {
    b.z -= 1;
  }

  bubble.z = ctx.bubbles.length;
}

function _showBubble(bubble: Bubble, ctx: RenderContext): void {
  _bringBubbleOnTop(bubble, ctx);

  bubble.scale = BUBBLE_SHOW_SCALE_BASE + Math.random() * BUBBLE_SHOW_SCALE_RANDOM;

  const box = ctx.settingsManager.data.bubblesFallingEnabled 
    ? BUBBLE_MOVING_SHOW_BOX 
    : BUBBLE_STATIC_SHOW_BOX;

  const pos = ctx.positionGenerator.getNext(box);
  bubble.cx = pos.x;
  bubble.cy = pos.y;

  bubble.show();
}

function _updateNormalBubble(bubble: Bubble, ctx: RenderContext): void {
  bubble.scale += 0.00002 * ctx.msDiff;
  if (bubble.scale >= BUBBLE_POP_SCALE) {
    bubble.pop(false);
    return;
  }

  if (ctx.settingsManager.data.bubblesFallingEnabled) {
    // move bubble downwards
    bubble.cy += 0.02 * ctx.msDiff;
  }

  // move bubble to top when outside of view
  if (bubble.cy > ctx.screenSize.heightPx + bubble.actualRadius) {
    bubble.cy = -bubble.actualRadius;
  }
}

function _updatePoppingBubble(bubble: Bubble, ctx: RenderContext): void {
  if (bubble.scale < bubble.popScale + BUBBLE_POP_SCALE_DIFF) {
    // upscaling stage
    bubble.scale += 0.002 * ctx.msDiff;
    bubble.opacity -= 0.002 * ctx.msDiff;
  } else {
    // dimming stage
    bubble.opacity -= 0.001 * ctx.msDiff;
  }

  // bubble not visible = hide
  if (bubble.opacity <= 0) {
    bubble.hide();
  }
}

function _renderBubble(bubble: Bubble, ctx: RenderContext): void {
  switch(bubble.state) {
  case(BubbleState.Hidden): 
    _showBubble(bubble, ctx);
    break;
  case(BubbleState.Normal): 
    _updateNormalBubble(bubble, ctx);
    break;
  case(BubbleState.Popping): 
    _updatePoppingBubble(bubble, ctx);
    break;
  default:
    throw new Error(`Unknown state: ${bubble.state} (${BubbleState[bubble.state]})`);
  }

  bubble.render();
}

export function render(ctx: RenderContext): void {
  for(const bubble of ctx.bubbles) {
    _renderBubble(bubble, ctx);
  }
}