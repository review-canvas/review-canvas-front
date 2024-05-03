export const fromBase64 = (encoded: string) => Buffer.from(encoded, 'base64').toString('utf8');

export const toBase64 = (text: string) => Buffer.from(text, 'utf8').toString('base64');
