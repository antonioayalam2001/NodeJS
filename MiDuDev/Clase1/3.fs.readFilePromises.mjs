import fs from 'node:fs/promises';


console.log("Leer archivo 1");
const text = fs.readFile('./archivoPrueba1.txt', { encoding: 'utf-8' })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((err) => { });

console.log(text);
console.log("Leyendo archivo 2");

const text2 = fs.readFile('./archivoPrueba2.txt', { encoding: 'utf-8' })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => { });

