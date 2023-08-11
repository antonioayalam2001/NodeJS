import { readFile } from 'node:fs/promises';


console.log("Leer archivo 1");

const text = await readFile('./archivoPrueba1.txt', { encoding: 'utf-8' })
console.log(text);


console.log("Leyendo archivo 2");
(async function readSecondFile() {
    const text2 = await readFile('./archivoPrueba2.txt', { encoding: 'utf-8' })
    console.log(text2);
})()
