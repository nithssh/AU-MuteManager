const bot = require("./src/bot");
const { PythonShell } = require('python-shell');
const doOCR = require("./src/ocr");

// const child_exec = require("child_process").exec;
// const pythonProcess = child_exec("py ./src/screen_capture.py");

// start the bot
bot.login(require("./src/token"));

// screencap and ocr every 5 secs
setInterval(updateState, 5000);

function updateState() {
  console.log("======STARTING NEW UPDATE======");
  PythonShell.run('./src/screen_capture.py', null, function (err) {
    if (err) throw err;
    doOCR()
      .then((str) => {
        if (str.includes("body")) {
          console.log("BODY REPORTED!");
        } else {
          console.log(`Detected text: ${str}`);
        }
      })
      .catch((err) => {
        throw err;
      });
  });
}
