import {Popup} from './popup';

export class BabyLock {
    _prevClick: number;
    _enabled = false;

    private constructor() {
      if (BabyLock._instance) {
        throw new Error('Only one instance should be created');
      }
    }

    private static _instance: BabyLock;
    static get instance(): BabyLock {
      if (!BabyLock._instance) {
        BabyLock._instance = new BabyLock();
      }

      return BabyLock._instance;
    }
    
    enable() {
      if (this._enabled) {
        return;
      }

      this._enabled = true;
    }

    disable() {
      if (!this._enabled) {
        return;
      }

      this._enabled = false;
    }

    ignoreExitOnClick() {
      if (!this._enabled) {
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