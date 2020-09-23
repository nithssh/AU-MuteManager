const { createWorker, createScheduler } = require('tesseract.js');

const worker = createWorker({
  langPath: "./data/", 
  // logger: m => console.info(m),
});
// const scheduler = createScheduler();

// (async () => {
//   console.log("Initializing Tesseract")
//   for (let i = 0; i < 4; i++) {
//     const worker = createWorker({langPath: "."});
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     scheduler.addWorker(worker);
//   }
//   console.log("Initialized Tesseract")
//   // setInterval(doOCR, 1000);
//   // doOCR().then((str) => (console.log(str)));
// })();

// const doOCR = async () => {
//   const 1 data: { text } } = await scheduler.addJob('recognize', "./data/screencap.png");
//   // console.log(text);
//   return text;
// }


async function doOCR() {
  // const start = new Date();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize("./data/screencap.png");
  // const end = new Date();
  // await console.log(`[${start.getMinutes()}:${start.getSeconds()} - ${end.getMinutes()}:${end.getSeconds()}], ${(end - start) / 1000} s`)
  await worker.terminate();
  return text;
}

// debug logging
// doOCR().then((str) => {
//     console.log(str);
// });

module.exports = doOCR;