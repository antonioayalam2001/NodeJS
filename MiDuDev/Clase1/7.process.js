// Proporciona informacion y control sobre el proceso actual de Node.js
const process = require('process')
// Brinda informacion relacionada con el sistema operativo y el proceso actual

// 1.Recuparando los parametros
console.log(process.argv)

// Controlar proceso y su salida
process.on('beforeExit', () => {
  // console.log('El proceso va a terminar');
  // Limpiar consola
  // console.clear();
})

console.log(process.env)

console.log('---------------------------------------------')
console.log('         EL PROCESO DE NODE.JS         ')
console.log('Id del proceso ........... ' + process.pid)
console.log('Título.................... ' + process.title)
console.log('Directorio de Node........ ' + process.execPath)
console.log('Directorio Actual......... ' + process.cwd())
console.log('Versión de Node........... ' + process.version)
console.log('Versiones Dependencias.... ' + process.versions)
console.log('Plataforma (S.O.)......... ' + process.platform)
console.log('Arquitectura (S.O.)....... ' + process.arch)
console.log('Tiempo activo de Node..... ' + process.uptime())
console.log('Argumentos del proceso.... ' + process.argv)
console.log('---------------------------------------------')
