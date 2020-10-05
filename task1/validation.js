import { existsSync, lstatSync } from 'fs';

export const validation = ({ action, shift, input, output }) => {
    let errorMessage = '';

    if (!['encode', 'decode'].includes(action)) {
        errorMessage = 'Action is required options and must be one of a type: "encode" or "decode".';
    } else if (isNaN(shift) || shift < 0) {
        errorMessage = 'Shift is required options and must a positive number.';
    } else if (input && (!existsSync(input) || !lstatSync(input).isFile())) {
        errorMessage = `Input file ${input} doesn't exist!`;
    } else if (output && (!existsSync(output) || !lstatSync(output).isFile())) {
        errorMessage = `Output file ${output} doesn't exist!`;
    }

    if (errorMessage) {
        console.error(errorMessage);
        process.exit(1);
    }
}

export const pipeMessageHandler = (action) => (err) => {
    if (err) {
        console.error('File does not exist or cannot be accessed');
    } else {
        console.log(`Data successful ${action}d.`);
    }
}