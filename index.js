const bot = require("./src/bot").client;
const { unmuteAll, muteAll } = require("./src/bot");
const doOCR = require("./src/ocr");
const { PythonShell } = require('python-shell');

const DISCUSSION_INTERVAL = 75 // secs
var hookMessage = null;
// const child_exec = require("child_process").exec;
// const pythonProcess = child_exec("py ./src/screen_capture.py");

// start the bot
bot.login(require("./src/token"));
bot.on('message', msg => {
  if (msg.content == "$start-hook") {
    try {
      let voiceChannel = msg.member.voice.channel;
      let members = voiceChannel.members.array();
      // the first two lines are to intentionally throw an error and 
      // detect if the user is connected to voice.
      // promise rejections are depreciated

      hookMessage = msg;
      console.log(`Hooked on ${msg.member.displayName}`)
    } catch (e) {
      msg.reply("connect to a voice channel before issuing commands.");
    }
  }
  else if (msg.content == "$end-hook") {
    hookMessage = null;
    console.log(`unhooked ${msg.member.displayName}`)
  }
});


// screencap and ocr every 2 secs
setInterval(updateState, 2000);

function updateState() {
  console.log("======Checking======");
  PythonShell.run('./src/screen_capture.py', null, function (err) {
    if (err) throw err;
    doOCR()
      .then((str) => {
        if (str.toLowerCase().includes("body")) {
          console.log("-------BODY REPORTED!-------");
          if (hookMessage != null) {
            unmuteAll(hookMessage);
            setTimeout(
              function () { muteAll(hookMessage) }, 
              (DISCUSSION_INTERVAL * 1000)
            )
          }
        } else {
          // console.log(`Detected text: ${str}`);
        }
      })
      .catch((err) => {
        throw err;
      });
  });
}
