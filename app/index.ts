import {display} from 'display';
import {createBubbles} from './bubbles-factory';
import {Renderer} from './renderer';
import {BabyLock} from './baby-lock';
import {Scoreboard} from './scoreboard';
import {SettingsManager} from './settings-manager';

function main(): void {
  display.autoOff = false;

  const settingsManager = new SettingsManager();
  const scoreboard = new Scoreboard();
  const bubbles = createBubbles(settingsManager, scoreboard);
  const renderer = new Renderer(settingsManager, bubbles);

  function applySettings(): void {
    BabyLock.instance.isEnabled = settingsManager.data.babyLockEnabled;
    scoreboard.isEnabled = settingsManager.data.keepScoreEnabled;
  }

  settingsManager.onChange.push(applySettings);

  applySettings();
  renderer.start();
}

main();