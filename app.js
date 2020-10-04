import { pipeline, Transform } from 'stream';
import commander from 'commander';
import { program } from 'commander';
import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';

program
  .option('-a, --action2 <type>')
  .option('-s, --shift <shift>')
  .option('-i, --input <file>')
  .option('-o, --output <file>')
  .parse(process.argv);
  
  const { action2, shift, input, output } = program;
  const rl = createInterface({ input: process.stdin, output: process.stdout });

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});


const outputHandler = () => {
  if (output) {
    createWriteStream(program.output.toString());
    rl.close();
  } else {
    return new Promise((resolve) =>
    rl.question(query, (ans) => {
      //         // rl.close();
      resolve(ans);
    })
  );
  }

if (input) {
  pipeline(
    createReadStream(input.toString()),
    myTransform,
    outputHandler(),
    // createWriteStream(program.output.toString()),
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
}

// const readline = require('readline');

// function askQuestion(query) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });

//     return new Promise(resolve => rl.question(query, ans => {
//         // rl.close();
//         resolve(ans);
//     }))
// }


// const ans = askQuestion("Are you sure you want to deploy to PRODUCTION? ");