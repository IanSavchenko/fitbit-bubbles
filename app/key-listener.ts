import document from 'document';

export class KeyListener {
  private _listeners: Array<(event: KeyboardEvent) => boolean> = [];

  private constructor() {
    document.onkeypress = this._onKeyPress.bind(this);
  }

  private static _instance: KeyListener;
  public static get instance(): KeyListener {
    if (!KeyListener._instance) {
      KeyListener._instance = new KeyListener();
    }

    return KeyListener._instance;
  }

  public addListener(listener: (event: KeyboardEvent) => boolean): void {
    this._listeners.push(listener);
  }

  private _onKeyPress(e: KeyboardEvent): void {
    for(const listener of this._listeners) {
      if (listener(e) === false) {
        break;
      }
    }
  }
}