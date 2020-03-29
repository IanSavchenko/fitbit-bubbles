import document from 'document';
import {Popup} from './popup';

export class Scoreboard {
    private _gameStartTime: number;
    private _score: number;
    private _updateInterval: number;

    private _scoreElement: TextElement;
    private _timeElement: TextElement;

    readonly GAME_TIME_SECONDS = 30;

    constructor() {
      this._scoreElement = document.getElementById('score-text') as TextElement;
      this._timeElement = document.getElementById('time-text') as TextElement;

      this._updateUi();

      this.onGameOver.push(() => {
        Popup.instance.show(
          'Game Over', 
          `Your score is ${this.score}.`, 
          'Try again', () => {
            this.reset();
          });
      });
    }

    private _isEnabled = false;
    public get isEnabled(): boolean {
      return this._isEnabled;
    }
    public set isEnabled(v: boolean) {
      if (v === this._isEnabled) {
        return;
      }

      this._isEnabled = v;
      this._scoreElement.style.display = v ? 'inline' : 'none';
      this._timeElement.style.display = v ? 'inline' : 'none';

      if (this._isEnabled) {
        this.reset();
      } else {
        this.stop();
      }
    }
    
    private _onGameOver: Array<Function> = [];
    public get onGameOver(): Array<Function> {
      return this._onGameOver;
    }

    public get score(): number {
      return this._score;
    }

    public get secondsLeft(): number {
      const now = Date.now();
      let v = Math.floor(this.GAME_TIME_SECONDS - (now - this._gameStartTime) / 1000);

      if (v < 0) {
        v = 0;
      }

      return v;
    }

    public stop(): void {
      if (this._updateInterval) {
        clearInterval(this._updateInterval);
        this._updateInterval = undefined;
      }
    }

    public reset(): void {
      this.stop();

      if (!this.isEnabled) {
        return;
      }

      this._score = 0;
      this._gameStartTime = Date.now();

      this._updateInterval = setInterval(this._onTick.bind(this), 200);
    }

    public addBubble(): void {
      this._score++;
    }

    private _onTick(): void {
      if (this.secondsLeft === 0) {
        for (const f of this.onGameOver) {
          f();
        }

        clearInterval(this._updateInterval);
      }

      this._updateUi();
    }

    private _updateUi(): void {
      this._scoreElement.text = `Score: ${this.score}`;
      this._timeElement.text = `Time: ${this.secondsLeft}`;
    }
}