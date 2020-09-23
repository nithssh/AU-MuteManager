const bot = require("./src/bot");
const doOCR = require("./src/ocr/ocr")
bot.login(require('./src/token'));

var isBusy = false;
var readText = "";
while (!isBusy) {
  isBusy = true;
  doOCR().then((str) => {readText = str; isBusy = false;});
  console.log(readText);
}