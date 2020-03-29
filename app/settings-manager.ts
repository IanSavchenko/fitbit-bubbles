import {SettingsData} from '../common/settings-data';
import {readFileSync, writeFileSync} from 'fs';
import {MessagePort} from './message-port';

export class SettingsManager {

  private readonly _fileName = 'settings.v1.json';
  private _data = new SettingsData();

  constructor() {
    this._readFromFile();

    MessagePort.instance.addListener('settings', (detail: object) => {
      const settingsData = SettingsData.fromObject(detail);

      if (!this._update(settingsData)) {
        return;
      }

      for (const cb of this._onChange) {
        cb();
      }
    });
  }

  public get data(): SettingsData {
    return this._data;
  }

  private _onChange: Array<Function> = [];
  public get onChange(): Array<Function> {
    return this._onChange;
  }

  private _update(settingsData: SettingsData): boolean {
    if (JSON.stringify(settingsData) === JSON.stringify(this._data)) {
      return false;
    }

    this._data = settingsData;
    this._saveToFile();
    return true;
  }

  private _readFromFile(): void {
    try {
      const fileData = readFileSync(this._fileName, 'json');
      this._data = SettingsData.fromObject(fileData);
    } catch (_err) {
      // error is ok if file does not exist - only way to know
      return undefined;
    }
  }

  private _saveToFile(): void {
    writeFileSync(this._fileName, this._data, 'json');
  }
}