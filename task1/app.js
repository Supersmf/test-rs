import { pipeline } from 'stream';
import { program } from 'commander';
import { validation, pipeMessageHandler } from './validation';
import { transformStream } from './transform-stream';
import { inputHandler, outputHandler } from './streams';

const LETTERS_COUNT = 26;

program
  .storeOptionsAsProperties(true)
  .option('-a, --action <type>')
  .option('-s, --shift <shift>')
  .option('-i, --input <file>')
  .option('-o, --output <file>')
  .parse(process.argv);

const { action, shift, input, output } = program;
validation({ action, shift, input, output });

pipeline(
  inputHandler(input),
  transformStream(action, shift % LETTERS_COUNT),
  outputHandler(output),
  pipeMessageHandler(action),
);