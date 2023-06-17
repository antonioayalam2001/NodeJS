'use strict'
const colors = require('colors')


const showMenu = () => {
      return new Promise(resolve => {

            `${'1'.green} Crear una Tarea``${'2'.green} Listar Tareas``${'3'.green} Listar tareas Completadas ``${'4'.green} Listar Tareas Pendientes``${'5'.green} completar Tarea (s)``${'6'.green} Borrar Tarea``${'0'.green} Salir \n`

            const readLine = require('readline').createInterface({
                  input: process.stdin, output: process.stdout
            })

            readLine.question('Selecciones una opción: ', (opt) => {
                  readLine.close();
                  resolve(opt)
            })
      })
}

const pause = () => {
      return new Promise(resolve => {
            const readLine = require('readline').createInterface({
                  input: process.stdin, output: process.stdout
            })

            readLine.question(`\nPresione ${'Enter'.bold.magenta}`, (opt) => {
                  readLine.close()
                  resolve(opt)
            })
      })
}
module.exports = {showMenu, pause}