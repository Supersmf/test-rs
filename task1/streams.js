import { createReadStream, createWriteStream } from 'fs';

export const inputHandler = (input) => input
  ? createReadStream(input.toString())
  : process.stdin;

export const outputHandler = (output) => output
  ? createWriteStream(output.toString(), { flags: 'a' })
  : process.stdout;
