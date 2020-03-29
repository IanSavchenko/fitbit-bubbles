import {Popup} from './popup';
import {KeyListener} from './key-listener';

export class BabyLock {
    _prevClick: number;
    _isEnabled = false;

    private constructor() {
      if (BabyLock._instance) {
        throw new Error('Only one instance should be created');
      }

      KeyListener.instance.addListener(this._onKeyPressed.bind(this));
    }

    private static _instance: BabyLock;
    static get instance(): BabyLock {
      if (!BabyLock._instance) {
        BabyLock._instance = new BabyLock();
      }

      return BabyLock._instance;
    }

    public get isEnabled(): boolean {
      return this._isEnabled;
    }
    public set isEnabled(v: boolean) {
      this._isEnabled = v;
    }

    private _onKeyPressed(e: KeyboardEvent): boolean {
      if (!this.isEnabled) {
        return;
      }
  
      if (e.key === 'back' && this._ignoreExitOnClick()) {
        e.preventDefault();
      }
    }
    
    private _ignoreExitOnClick(): boolean {
      if (!this._isEnabled) {
        return false;
      }

      const now = Date.now();
      if (this._prevClick && now - this._prevClick < 300) {
        // let back work as it is
        return false;
      }

      if (this._prevClick && now - this._prevClick < 1200) {
        Popup.instance.show(
          'Baby Lock Enabled', 
          'Double-click back button to exit.');
      }

      this._prevClick = now;
      return true;
    }
}