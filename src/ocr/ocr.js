const { createWorker } = require('tesseract.js');

const worker = createWorker({
  langPath: "./src/ocr/", 
  logger: m => console.info(m),
});

async function doOCR() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize("./src/screengrab/screencap.jpg");
  await worker.terminate();
  return text;
}
doOCR().then((str) => {console.log(str)});

module.exports = doOCR;