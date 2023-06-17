'use strict'
const fs = require('fs');
const colors = require('colors')
//si no manda la base por defecto 5
const crearArchivo = async (base, listar,limite) => {
      let consola = ''
      let salidaArchivo=''
      if (listar) {
            console.log(colors.bgBrightBlue('========================='))
            console.log(colors.bgMagenta(`Tabla del ${base}`                  ))
            console.log(colors.bgBrightBlue('========================='))

            for (let i = 0; i <= limite; i++) {
                  consola += (`${colors.magenta.bgWhite.bold.italic(base)}  ${'x'.brightMagenta.italic.bold}    ${i}= ${colors.red.underline(base * i)} \n`)
                  salidaArchivo += (`${(base)}   x    ${i}= ${(base * i)} \n`)
            }
            console.log(consola)
      }
      try {
            fs.writeFileSync(`tablaDel${base}.txt`, salidaArchivo)
            return colors.bgWhite.magenta.bold.underline(`tablaDel${base}.txt creado`)
      } catch (err) {
            throw new Error(colors.red('Algo salio terriblemente mal'))
      }
}

module.exports = {
      crearArchivo, 'nombre': 'Antonio'
}