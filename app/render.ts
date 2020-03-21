import { getScreenSize, ScreenSize } from './screen-size';
import {Bubble} from './bubble';
import { PositionGenerator } from './position-generator';

export interface IRenderContext {
    screenSize: ScreenSize;
    bubbles: Array<Bubble>;
    positionGenerator: PositionGenerator;
    msDiff: number;
}

export type IRenderFunction = (ctx: IRenderContext) => void;

const BUBBLE_POP_SCALE = 0.7;
const BUBBLE_SHOW_SCALE_BASE = 0.2;
const BUBBLE_POP_SCALE_DIFF = 0.3;

function _bringBubbleOnTop(bubble: Bubble, ctx: IRenderContext) {
    // lower z of every bubble
    for(const b of ctx.bubbles) {
        b.z -= 1;
    }

    bubble.z = ctx.bubbles.length;
}

function _showBubble(bubble: Bubble, ctx: IRenderContext) {
    _bringBubbleOnTop(bubble, ctx);

    bubble.scale = BUBBLE_SHOW_SCALE_BASE + Math.random() * 0.4;

    let pos = ctx.positionGenerator.getNext();
    bubble.cx = pos.x;
    bubble.cy = pos.y;

    bubble.show();
}

function _renderNormalBubble(bubble: Bubble, ctx: IRenderContext) {
    bubble.scale += 0.00002 * ctx.msDiff;
    if (bubble.scale >= BUBBLE_POP_SCALE) {
      bubble.pop(false);
      return;
    }

    // move bubble downwards
    bubble.cy += 0.02 * ctx.msDiff;

    // move bubble to top when outside of view
    if (bubble.cy > ctx.screenSize.heightPx + bubble.actualRadius) {
      bubble.cy = -bubble.actualRadius;
    }
}

function _renderPoppingBubble(bubble: Bubble, ctx: IRenderContext) {
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

function _renderBubble(bubble: Bubble, ctx: IRenderContext) {
    if (!bubble.isVisible) {
        _showBubble(bubble, ctx);
        return;
    }

    if (bubble.isPopping) {
        _renderPoppingBubble(bubble, ctx);
    } else {
        _renderNormalBubble(bubble, ctx);
    }
}

export function render(ctx: IRenderContext) {
  for(const bubble of ctx.bubbles) {
    _renderBubble(bubble, ctx);
  }
}