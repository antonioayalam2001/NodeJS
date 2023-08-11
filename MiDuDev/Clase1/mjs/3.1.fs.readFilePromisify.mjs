import fs from 'node:fs';
import { promisify } from 'node:util';

const readFile = promisify(fs.readFile);

console.log("Leer archivo 1");
const text = readFile('./archivoPrueba1.txt', { encoding: 'utf-8' })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((err) => { });

console.log(text);
console.log("Leyendo archivo 2");

const text2 = readFile('./archivoPrueba2.txt', { encoding: 'utf-8' })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => { });

