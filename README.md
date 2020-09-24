# VoiceManager - AmongUs
This is a Discord Bot / utility that OCR reads a center part of your screen to detect whether a dead body has been reported and unmutes everyone in the server automatically, shortly muting every back after the discussion (based on a internal timer).

The Bot is written with discord.js, the OCR is done with tesseract.js, The screencapture is done with python's Pillow module. The Bot uses python-shell to execute the script for a easier time than messing with child_process node module.

## Installation
Requires the latest version of node and python3 installed
The project was developed with node 12.18 and python 3.8.5

Clone the repo and extract the folder

Install the Pillow dependency with
`pip install Pillow`

Install the node package dependencies with
`npm install`

Also a `token.js` file is required in the src folder that `module.exports` the bot's token that you've generated [here](https://discord.com/developers/applications)

## Running
Invite the bot to your server with the "mute members" and "view channels" permissions. Generate the invite like at the discord developer portal > your application > oauth2.

`npm start` in the root of the clone directory will start the application assuming every dependency is met.

## Commands

`$mute` -- to manually mute everyone in the connected channel.
`$unmute` -- to manually unmute everyone in the connected channel.
`$toggle` -- to manually toggle the mute status of everyone in the channel.
`$start-hook` -- to auto mute and unmute based on your screencap.
`$end-hook` -- to stop auto modifying the mute state of everyone in the channel.

### Credits
This project was made my [dem1se](https://github.com/dem1se) over the course of two nights.

### License
The Project is licensed under the permissive MIT License.
Check the LICENSE file at the root of the repo for more info.
