'use strict'
const {crearArchivo, nombre} = require('./modules/multiplicador');
const argv = require('./config/yargs')

console.clear();


crearArchivo(argv.base , argv.listar,argv.h)
    .then(fileName => {
          console.log(`El nombre del archivo es : ${fileName}`)
    })
    .catch(err => console.log(err))