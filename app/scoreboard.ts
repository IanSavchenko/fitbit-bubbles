import document from 'document';

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
    }

    private _onGameOver: Array<Function> = [];
    public get onGameOver() {
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

    reset() {
      this._score = 0;
      this._gameStartTime = Date.now();

      setInterval(this._onTick.bind(this), 200);
    }

    addBubble() {
      this._score++;
    }

    _onTick() {
      if (this.secondsLeft === 0) {
        for (const f of this.onGameOver) {
          f();
        }

        clearInterval(this._updateInterval);
      }

      this._updateUi();
    }

    _updateUi() {
      this._scoreElement.text = `Score: ${this.score}`;
      this._timeElement.text = `Time: ${this.secondsLeft}`;
    }
}