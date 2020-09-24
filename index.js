const bot = require("./src/bot").client;
const unmuteAll = require("./src/bot").unmuteAll;
const doOCR = require("./src/ocr");
const { PythonShell } = require('python-shell');

var hookMessage = null;
// const child_exec = require("child_process").exec;
// const pythonProcess = child_exec("py ./src/screen_capture.py");

// start the bot
bot.login(require("./src/token"));
bot.on('message', msg => {
  if (msg.content == "$start-hook") {
    hookMessage = msg;
    console.log(`Hooked on ${msg.author}`)
  }
  else if (msg.content == "$end-hook") {
    hookMessage = null;
    console.log(`unhooked ${hookMessage.author.username}`)
  }
});


// screencap and ocr every 3 secs
setInterval(updateState, 3000);

function updateState() {
  console.log("======STARTING NEW UPDATE======");
  PythonShell.run('./src/screen_capture.py', null, function (err) {
    if (err) throw err;
    doOCR()
      .then((str) => {
        if (str.toLowerCase().includes("body")) {
          console.log("-------BODY REPORTED!-------");
          if (hookMessage != null) {
            unmuteAll(hookMessage);
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
