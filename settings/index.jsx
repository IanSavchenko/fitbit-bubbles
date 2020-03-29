function Settings(props) {
  return (
    <Page>
      <Section title="Keep Score" 
        description="You will need to pop as many bubbles as you can in a limited time of 30 seconds.">
        <Toggle
          settingsKey="keepScoreEnabled"
          label={props.settings.keepScoreEnabled === 'true' ? 'Enabled' : 'Disabled'}
        />
      </Section>

      <Section title="Vibrate On Pop">
        <Toggle
          settingsKey="vibrateOnPopEnabled"
          label={props.settings.vibrateOnPopEnabled === 'true' ? 'Enabled' : 'Disabled'}
        />
      </Section>

      <Section title="Bubbles Falling Down" 
        description="When disabled, bubbles won't be moving.">
        <Toggle
          settingsKey="bubblesFallingEnabled"
          label={props.settings.bubblesFallingEnabled === 'true' ? 'Enabled' : 'Disabled'}
        />
      </Section>

      <Section title="Baby Lock" 
        description={'When enabled, double-press "back" button to exit the game.'}>
        <Toggle
          settingsKey="babyLockEnabled"
          label={props.settings.babyLockEnabled === 'true' ? 'Enabled' : 'Disabled'}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);
