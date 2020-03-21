import { ScreenSize } from './screen-size';
import { Bubble } from './bubble';

export interface ScreenCoordinates {
    x: number;
    y: number;
}

export class PositionGenerator {
    _screenSize: ScreenSize;
    _bubbles: Array<Bubble>;
    
    readonly _maxTries = 5;
    readonly _acceptedDistance : number; 
    readonly _box;

    constructor(screenSize: ScreenSize, bubbles: Array<Bubble>) {
        this._screenSize = screenSize;
        this._bubbles = bubbles;
        this._acceptedDistance = Math.min(screenSize.heightPx, screenSize.widthPx) / 2;
        this._box = {
            left: 0.05,
            right: 0.05,
            top: -0.1,
            bottom: 0.2
        }
    }

    public getNext() {
        let takenPositions = this._bubbles.map(function(b) {
            return {
                x: b.cx,
                y: b.cy
            }
        });

        let options = [];
        let iteration = 0;
        while (iteration++ < this._maxTries) {
            let point = {
                x: this._screenSize.widthPx * 
                    (this._box.left + Math.random() * (1 - this._box.left - this._box.right)),
                y: this._screenSize.heightPx *
                    (this._box.top + Math.random() * (1 - this._box.top - this._box.bottom))
            };

            let distances = takenPositions.map((pos) => {
                return this._distance(pos, point);
            });

            if (distances.every(d => d > this._acceptedDistance)) {
                return point;
            }

            let distance = Math.min(...distances);

            let option = {
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

    private _distance(a: ScreenCoordinates, b: ScreenCoordinates) : number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
}