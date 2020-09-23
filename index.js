const bot = require("./src/bot");
const child_exec = require("child_process").exec;
const recognizeText = require("./src/ocr");

// start the bot
bot.login(require("./src/token"));
// the image capture script
const pythonProcess = child_exec("py ./src/screen_capture.py");
//
setInterval(updateState, 5000);

function updateState() {
  console.log("starting update");
  pythonProcess.stdout.on("data", (data) => {
    if (data == "done_capture\r\n") {
      // OCR the screen capture
      recognizeText()
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
    } else {
      console.log(data);
    }
  });
}
