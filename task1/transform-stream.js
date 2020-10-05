import { Transform } from 'stream';

const LOWERCASE = { min: 97, max: 122 };
const UPPERCASE = { min: 65, max: 90 };
const isInclude = (num, { min, max }) => num >= min && num <= max;

export const transformStream = (action, shift) => new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString().trim();
        const result = data.split('').reduce((res, char) => {
            const code = char?.charCodeAt(0);

            if (!isInclude(code, LOWERCASE) && !isInclude(code, UPPERCASE)) {
                res += char;
            } else {
                const { min, max } = isInclude(code, LOWERCASE) ? LOWERCASE : UPPERCASE;
                let nextPosition = action === 'encode'
                    ? parseInt(code) + parseInt(shift)
                    : parseInt(code) - parseInt(shift);

                if (action === 'encode' && nextPosition > max) {
                    nextPosition = nextPosition - max + min - 1
                } else if (action === 'decode' && nextPosition < min) {
                    nextPosition = nextPosition - min + max + 1
                };
                return res += String.fromCharCode(nextPosition);
            }
            return res;
        }, '');

        callback(null, result);
    }
});