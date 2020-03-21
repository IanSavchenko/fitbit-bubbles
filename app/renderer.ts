import { Bubble } from './bubble';
import { ScreenSize } from './screen-size';
import { PositionGenerator } from './position-generator';
import { IRenderContext, IRenderFunction } from './render';

export class Renderer {
    _renderFunction: IRenderFunction;
    _renderContext: IRenderContext;

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
        let rafFunc = (timestamp) => {
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