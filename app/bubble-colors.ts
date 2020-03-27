export enum BubbleColors {
    Green,
    Red,
    Blue,
    Yellow,
    Purple,
}

interface BubbleColorsSet {
    base: string;
    innerRim: string;
}

export function colorToColorsSet(color: BubbleColors): BubbleColorsSet {
  switch(color) {
  case(BubbleColors.Blue):
    return {
      base: 'fb-blue',
      innerRim: 'lightcyan'
    };
  case(BubbleColors.Red):
    return {
      base: 'fb-red',
      innerRim: 'pink'
    };
  case(BubbleColors.Green):
    return {
      base: 'fb-mint',
      innerRim: 'lightgreen'
    };
  case(BubbleColors.Yellow):
    return {
      base: 'fb-peach',
      innerRim: 'lightyellow'
    };
  case(BubbleColors.Purple):
    return {
      base: 'fb-purple',
      innerRim: 'plum'
    };
  default: 
    throw new Error(`Color: ${color} (${BubbleColors[color]}) unknown`);
  }
}