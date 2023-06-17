const inquirer = require('inquirer')
require('colors')

const menuOptions = [{
      type: 'list', //    Como es que queremos que se ubique la opcion
      name: 'opcion', message: '¿Que te gustaría hacer?', choices: [{
            value: '1', name: `${'1'.green} Crear una Tarea`
      }, {
            value: '2', name: `${'2'.green} Listar Tareas`
      }, {
            value: '3', name: `${'3'.green} Listar tareas Completadas `
      }, {
            value: '4', name: `${'4'.green} Listar Tareas Pendientes`
      }, {
            value: '5', name: `${'5'.green} Completar Tarea (s)`
      }, {
            value: '6', name: `${'6'.green} Borrar Tarea`
      }, {
            value: '0', name: `${"Salir".red}`
      },]
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

const listadoTareasBorrar = async (tareas = []) => {
      //HACIENDO ESTE
      // {
      //       value: tarea.id
      //           name: `${'1'.green} Crear una Tarea`
      // },
      const choices = tareas.map((tarea, index) => {
            const {id, description} = tarea
            return {
                  value: id, name: `${index + 1}`.green + `${description}`
            }
      })
      //Opcion de cancelar
      choices.push({
            value: 0, name: `Return`.red
      })
      const {id} = await inquirer.prompt([{
            type: 'list', name: "id", message: "Elige que opcion deseeas borrar", choices: choices
      }])
      return id
}

const mostrarListadoCheck = async (tareas = []) => {
      const choices = tareas.map((tarea, index) => {
            const {id, description, completed} = tarea
            return {
                  value: id, name: `${index + 1}`.green + `${description}`, checked: completed ? true : false
            }
      })
      const pregunta = [{
            type: 'checkbox',
            name: "ids",
            message: "Elige las opciones que desees Completar",
            choices
      }]
      const {ids} = await inquirer.prompt(pregunta)
      return ids
}


module.exports = {inquirerMenu, pause, leerInput, listadoTareasBorrar, confirm, mostrarListadoCheck}
