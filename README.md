# "Bubbles" for Fitbit

[![CircleCI](https://circleci.com/gh/IanSavchenko/fitbit-bubbles.svg?style=svg)](https://circleci.com/gh/IanSavchenko/fitbit-bubbles)
![GitHub package.json version](https://img.shields.io/github/package-json/v/IanSavchenko/fitbit-bubbles)

Pop as many bubbles as you can!

This is a small game that I made for my 1-year-old daughter. 
It (hopefully) keeps her busy for a couple of minutes and with a "baby lock" 
feature prevents her from starting workouts, etc.

![Application icon](/resources/icon_store_small.png "Application icon")

Install the app on your Fitbit Ionic or Fitbit Versa from [Fitbit Gallery](https://gallery.fitbit.com/details/099ca12c-5269-44cb-a19d-d164fa4ab24c) (open the link on your phone).

## How it looks

![Application GIF](/screenshots/bubbles_15fps.gif) 

## Settings

+ "Baby lock" prevents an accidental exit from the app. 
It is still possible to open the notifications drawer with a swipe down
from the top edge though :(
+ You can disable scoreboard so the game just runs indefenitely without 
interruptions.
+ You can disable bubbles falling down.
+ You can disable vibration when a bubble pops.

## Contributing

Run `npm install` to install dependencies. On Linux you may also need to [install](https://github.com/atom/node-keytar#on-linux) native deps for `keytar` before that.

Supported commands: 

`npm run build`

`npm run lint`

`npm run test`

To deploy and debug the app on a device or simulator, run `npm run debug` and follow hints of the Fitbit CLI.

## Links

+ Fitbit OS development: [Fitbit SDK Guides](https://dev.fitbit.com/build/guides/),
[Fitbit SDK Examples](https://dev.fitbit.com/build/tutorials/examples/),
[Fitbit SDK Forum](https://community.fitbit.com/t5/SDK-Development/bd-p/sdk).
+ GIF-screenshots made with an awesome utility [Kap](https://getkap.co/).

License: [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt)

Like it? Dislike it? [Let me know](https://iansavchenko.com)!