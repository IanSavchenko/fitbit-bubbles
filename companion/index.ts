import messaging from 'messaging';
import {settingsStorage} from 'settings';
import {SettingsData} from '../common/settings-data';

function _sendMessage(type: string, detail: object): void {
  const data = {
    type,
    detail
  };

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

function _fetchSettings(): SettingsData {
  const settings = new SettingsData();
  const keys = Object.keys(settings);

  for (const key of keys) {
    let value = settingsStorage.getItem(key);
    if (value === null) {
      continue;
    }

    // desirialize
    // a simplified case for only Boolean values
    value = JSON.parse(value); 
    
    settings[key] = value;
  }

  return settings;
}

function _sendSettings(): void {
  const settingsData = _fetchSettings();
  _sendMessage('settings', settingsData);
}

function _setDefaultSettings(): void {
  const defaults = new SettingsData();
  const keys = Object.keys(defaults);

  for (const key of keys) {
    if (settingsStorage.getItem(key) === null) {
      settingsStorage.setItem(key, JSON.stringify(defaults[key]));
    }
  }
}

function main(): void {
  settingsStorage.onchange = function(): void {
    _sendSettings();
  };
  
  messaging.peerSocket.onopen = function(): void {
    _sendSettings();
  };
  
  messaging.peerSocket.onerror = function(err): void {
    console.error('Connection error: ' + err.code + ' - ' + err.message);
  };
  
  _setDefaultSettings();
}

main();
