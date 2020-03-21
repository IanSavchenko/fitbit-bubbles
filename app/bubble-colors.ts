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
      base: 'blue',
      innerRim: 'lightcyan'
    };
  case(BubbleColors.Red):
    return {
      base: 'red',
      innerRim: 'pink'
    };
  case(BubbleColors.Green):
    return {
      base: 'green',
      innerRim: 'lightgreen'
    };
  case(BubbleColors.Yellow):
    return {
      base: 'yellow',
      innerRim: 'lightyellow'
    };
  case(BubbleColors.Purple):
    return {
      base: 'purple',
      innerRim: 'plum'
    };
  default: 
    throw new Error(`Color: ${color} (${BubbleColors[color]}) unknown`);
  }
}