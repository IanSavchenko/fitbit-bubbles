

export class SettingsData {
    public keepScoreEnabled = true;
    public vibrateOnPopEnabled = true;
    public bubblesFallingEnabled = true;
    public babyLockEnabled = false;

    public static fromObject(data: object): SettingsData {
      const result = new SettingsData();
      const keys = Object.keys(result);

      for (const key of keys) {
        const value = data[key];
        if (value === undefined) {
          continue;
        }
    
        result[key] = value;
      }

      return result;
    }
}