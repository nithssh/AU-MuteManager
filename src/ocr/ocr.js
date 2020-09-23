const { createWorker } = require('tesseract.js');

const worker = createWorker({
  langPath: "./data/", 
  // logger: m => console.info(m),
});

async function doOCR() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize("./data/screencap.png");
  await worker.terminate();
  return text;
}

// debug logging
// doOCR().then((str) => {
//     console.log(str);
// });

module.exports = doOCR;