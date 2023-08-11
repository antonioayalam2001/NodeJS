import fs from 'node:fs';


console.log("Leer archivo 1");
const text = fs.readFile('./archivoPrueba1.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
});
console.log(text);
console.log("Leyendo archivo 2");
const text2 = fs.readFile('./archivoPrueba2.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
});
console.log(text2);

