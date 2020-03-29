import {Bubble} from './bubble';
import {getScreenSize} from './screen-size';
import {PositionGenerator} from './position-generator';
import {RenderContext, render} from './render';
import {SettingsManager} from './settings-manager';

export class Renderer {
    _renderContext: RenderContext;

    constructor(settingsManager: SettingsManager, bubbles: Array<Bubble>) {
      const screenSize = getScreenSize();
      const positionGenerator = new PositionGenerator(screenSize, bubbles);

      this._renderContext = {
        bubbles,
        screenSize: getScreenSize(),
        positionGenerator,
        msDiff: 0,
        settingsManager
      };
    }

    public start(): void {
      let prevTimestamp;
      const rafFunc = (timestamp): void => {
        if (prevTimestamp && timestamp - prevTimestamp < 1000) {
          this._renderContext.msDiff = timestamp - prevTimestamp;

          render(this._renderContext);
        }

        prevTimestamp = timestamp;
        requestAnimationFrame(rafFunc);
      };

      requestAnimationFrame(rafFunc);
    }
}