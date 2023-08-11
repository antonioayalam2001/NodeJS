import { readFile } from 'node:fs/promises';

console.log("Inicio");

Promise.all([
    readFile('./archivoPrueba1.txt', { encoding: 'utf-8' }),
    readFile('./archivoPrueba2.txt', { encoding: 'utf-8' })
]).then((data) => { 
    console.log(data[0]);
    console.log(data[1]);
})


console.log("Fin");