const inquirer = require('inquirer')
require('colors')

const menuOptions = [{
      type: 'list', //    Como es que queremos que se ubique la opcion
      name: 'opcion', message: '¿Que te gustaría hacer?', choices: [
            {
                  value: 1, name: `${'1'.green} Buscar ciudad`
            },
            {
                  value: 2, name: `${'2'.green} Historial`
            },
            {
                  value: 0, name: `${"Salir".red}`
            },
      ]
}]


const inquirerMenu = async () => {
      console.clear()
      console.log('=========================='.magenta)
      console.log('--Seleccione una opcion--'.bgWhite.underline.black)
      console.log('==========================\n'.magenta)
      const {opcion} = await inquirer.prompt(menuOptions)
      return opcion
}


const pause = async () => {
      const enterInput = [{
            type: 'input', name: 'TeclaEnter', message: `Presiona la tecla ${"Enter".magenta} para continuar `
      }]
      console.log('\n')
      await inquirer.prompt(enterInput)
}

const leerInput = async (message) => {
      let question = [{
            type: 'input', name: 'desc', message, validate(value) {
                  if (value.length === 0) {
                        return 'Sorry please enter a validate string'
                  }
                  return true
            }
      }];
      const {desc} = await inquirer.prompt(question);
      return desc;
}


const confirm = async (message) => {
      const enterInput = [
            {
                  type: 'confirm',
                  name: 'submit',
                  message,
                  default: false,
            }
      ];
      console.log('\n')
      const {submit} = await inquirer.prompt(enterInput)
      return submit
}

const listarLugares = async (lugares = []) => {
      //HACIENDO ESTE
      // {
      //       value: tarea.id
      //           name: `${'1'.green} Crear una Tarea`
      // },
      const choices = lugares.map((tarea, index) => {
            const {id, place_name} = tarea
            return {
                  value: id, name: `${index + 1}`.green + `    ${place_name}`
            }
      })
      //Opcion de cancelar
      choices.push({
            value: 0, name: `Return`.red
      })
      const {id} = await inquirer.prompt([{
            type: 'list', name: "id", message: "Elige de que lugar deseas mas información: ", choices: choices
      }])
      return id
}


module.exports = {inquirerMenu, pause, leerInput, listarLugares, confirm}
