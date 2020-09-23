const { createWorker } = require('tesseract.js');
const path = require('path');

const worker = createWorker({
  langPath: "./src/ocr/", 
  logger: m => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize("./src/screengrab/screencap.jpg");
  console.log(text);
  await worker.terminate();
})();