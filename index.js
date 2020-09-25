const bot = require("./src/bot").client;
const { unmuteAll, muteAll } = require("./src/bot");
const doOCR = require("./src/ocr");
const { PythonShell } = require("python-shell");
const chalk = require("chalk");

const DISCUSSION_INTERVAL = 140; // secs
var hookMessage = null;
var updateRoutine;

// start the bot
bot.login(require("./src/token"));
bot.on("message", (msg) => {
  if (msg.content == "$start-hook") {
    try {
      let voiceChannel = msg.member.voice.channel;
      let members = voiceChannel.members.array();
      // the first two lines are to intentionally throw an error and
      // detect if the user is connected to voice.
      // promise rejections are depreciated
      hookMessage = msg;
      
      // screencap and ocr every 1 secs
      updateRoutine = setInterval(updateState, 1000);

      muteAll(msg);
      msg.react("👌");
      console.log(`Succesfully hooked on ${msg.member.displayName}`);
    } catch (e) {
      msg.reply("connect to a voice channel before issuing commands.");
    }
  } else if (msg.content == "$end-hook") {
    try {
      let voiceChannel = msg.member.voice.channel;
      let members = voiceChannel.members.array();
      // the first two lines are to intentionally throw an error and
      // detect if the user is connected to voice.
      // promise rejections are depreciated
      
      // stop the screen capping
      if (hookMessage != null) {
        clearInterval(updateRoutine);
        hookMessage = null;
        unmuteAll(msg);
        msg.react("👍");
        console.log(`Succesfully unhooked ${msg.member.displayName}`);
      } else {
        msg.react("👎");
      }
    } catch (e) {
      msg.reply("connect to a voice channel before issuing commands.");
    }
  }
});



function updateState() {
  console.log(chalk.gray("----Checking----"));
  PythonShell.run("./src/screen_capture.py", null, function (err) {
    if (err) throw err;
    doOCR()
      .then((str) => {
        console.log("----Checked----");
        if (str.toLowerCase().includes("body")) {
          console.log(chalk.red("-------BODY REPORTED!-------"));
          if (hookMessage != null) {
            unmuteAll(hookMessage);
            // failsafe in case the vote end screen is not read properly
            setTimeout(function () {
              muteAll(hookMessage);
            }, DISCUSSION_INTERVAL * 1000);
          }
        } else if (str.toLowerCase().includes("energenc")) {
          // the handdrawn style of emergency ui doesn't get read properly,
          // this is fairly consistent in my testing.
          console.log(chalk.red("-------Emergency Called-------"));
          if (hookMessage != null) {
            unmuteAll(hookMessage);
            // failsafe in case the vote end screen is not read properly
            setTimeout(function () {
              muteAll(hookMessage);
            }, DISCUSSION_INTERVAL * 1000);
          }
        } else if (
          str.toLowerCase().includes("was ejected") ||
          str.toLowerCase().includes("the impostor")
        ) {
          console.log(chalk.greenBright("--Discussion/Voting Ended--"));
          if (hookMessage != null) {
            muteAll(hookMessage);
          }
        } else {
          // console.log(`Detected text: ${chalk.yellow(str)}`);
        }
      })
      .catch((err) => {
        throw err;
      });
  });
}
