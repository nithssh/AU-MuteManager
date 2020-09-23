// Start the bot
const bot = require("./src/bot");
bot.login(require('./src/token'));

// State detection routine
const exec = require("child_process").exec;
const pythonProcess = exec('py ./src/screengrab/screen_capture.py');

pythonProcess.stdout.on('data', (data) => {
  if (data == "done_capture\r\n") {
    const recognizer = require("./src/ocr/ocr");
    recognizer().then((str) => {
      if (str.includes("body")) {
        console.log("BODY REPORTED!")
        // if the hook is engaged, unmute all
      }
    });
  }
  else {
    console.log(data);
  }
});