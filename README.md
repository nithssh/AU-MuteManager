# MuteManager - AmongUs
This is a Discord Bot / utility that OCR reads a center part of your screen to detect whether a dead body has been reported or if a emergency meeting has been called and unmutes everyone in the server automatically, shortly muting every back after the voting ends (based on OCR).

The Bot is written with discord.js, the OCR is done with tesseract.js, The screencapture is done with python's Pillow module. The project uses python-shell to have an easier time running the screencapture script in-sync, instead of just using the child_process node module.

## Installation
Requires the latest version of node and python3 installed.
The project was developed with node 12.18 and python 3.8.5

Clone the repo and extract the folder

Install the Pillow dependency with
```pip install Pillow```

Install the node package dependencies with
```npm install```

Also a `token.js` file is required in the src folder that `module.exports` the bot's token that you've generated [here](https://discord.com/developers/applications)
```javascript
// file: ./src/token.js
module.exports = "enter your bot token here";
```

## Running
Invite the bot to your server with the "mute members" and "view channels" permissions. 
Generate the invite like at the discord developer portal > your application > oauth2.

```npm start``` in the root of the cloned directory will start the application assuming every dependency is met and the configuration is right.

## Commands

| Command     |      Use      |
|-------------|:-------------:|
| $mute       | to manually mute everyone in the connected channel. |
| $unmute     | to manually unmute everyone in the connected channel. |
| $toggle     | to manually toggle the mute status of everyone in the channel. |
| $start-hook | to auto mute and unmute based on your screencap. |
| $end-hook   | to stop auto modifying the mute state of everyone in the channel. | 

### License
The Project is licensed under the permissive MIT License.
Check the LICENSE file at the root of the repo for more info.
