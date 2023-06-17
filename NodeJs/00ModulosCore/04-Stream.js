"use strict";

let fs = require("fs");
let readStream = fs.createReadStream("00ModulosCore/assets/nombres.txt");
let writeStream = fs.createWriteStream("00ModulosCore/assets/nombrescopia.txt");

// pipe permite desencadenar el flujo de datos entre los streams tal como la escritura y la lectura entre ambos archivos
readStream.pipe(writeStream);

// Asignando evenetos el readStream
// Mientras haya datos se realiza la impresión
// readStream.on('data', (chunk) => {
//     console.log("Tipo de datos" + typeof (chunk));
//     console.log(chunk);
//     console.log(`${chunk.length} bytes`);
//     console.log(chunk.toString());
//     console.log(`${chunk.toString().length} caracteres`);
//     console.log("Mientras hay datos se imprime");
// })

readStream.pipe(writeStream);

readStream
  .on("data", (chunk) => {
    console.log(`He leido caracteres ${chunk.length}`);
  })
  .on("end", (listener) => {
    console.log(`Termine de leer el archivo ${2 + 2}`);
  });

  