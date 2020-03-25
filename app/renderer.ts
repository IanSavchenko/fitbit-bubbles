import {Bubble} from './bubble';
import {ScreenSize} from './screen-size';
import {PositionGenerator} from './position-generator';
import {RenderContext, IRenderFunction} from './render';

export class Renderer {
    _renderFunction: IRenderFunction;
    _renderContext: RenderContext;

    constructor(
      bubbles: Array<Bubble>, 
      screenSize: ScreenSize, 
      positionGenerator: PositionGenerator, 
      renderFunction: IRenderFunction) {
      this._renderFunction = renderFunction;
      this._renderContext = {
        bubbles,
        screenSize,
        positionGenerator,
        msDiff: 0
      };
    }

    start() {
      let prevTimestamp;
      const rafFunc = (timestamp) => {
        if (prevTimestamp && timestamp - prevTimestamp < 1000) {
          this._renderContext.msDiff = timestamp - prevTimestamp;
          this._renderFunction(this._renderContext);
        }

        prevTimestamp = timestamp;
        requestAnimationFrame(rafFunc);
      };

      requestAnimationFrame(rafFunc);
    }
}