import {ScreenSize} from './screen-size';
import {Bubble} from './bubble';

export interface ScreenCoordinates {
    x: number;
    y: number;
}

export interface RelativePaddingBox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export class PositionGenerator {
    _screenSize: ScreenSize;
    _bubbles: Array<Bubble>;
    
    readonly _maxTries = 5;
    readonly _acceptedDistance: number;

    constructor(screenSize: ScreenSize, bubbles: Array<Bubble>) {
      this._screenSize = screenSize;
      this._bubbles = bubbles;
      this._acceptedDistance = Math.min(screenSize.heightPx, screenSize.widthPx) / 2;
    }

    public getNext(box: RelativePaddingBox): ScreenCoordinates {
      const takenPositions = this._bubbles.map(function(b) {
        return {
          x: b.cx,
          y: b.cy
        };
      });

      const options = [];
      let iteration = 0;
      while (iteration++ < this._maxTries) {
        const point = {
          x: this._screenSize.widthPx * 
                    (box.left + Math.random() * (1 - box.left - box.right)),
          y: this._screenSize.heightPx *
                    (box.top + Math.random() * (1 - box.top - box.bottom))
        };

        const distances = takenPositions.map((pos) => {
          return this._distance(pos, point);
        });

        if (distances.every(d => d > this._acceptedDistance)) {
          return point;
        }

        const distance = Math.min(...distances);

        const option = {
          distance,
          point
        };

        options.push(option);
      }

      return options.reduce(
        function(prev, cur) { 
          return prev.distance > cur.distance ? prev : cur; 
        }, {
          distance: 0
        })
        .point;
    }

    private _distance(a: ScreenCoordinates, b: ScreenCoordinates): number {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
}