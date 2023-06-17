'use strict'
const colors = require('colors')
// const {showMenu, pause} = require("./helpers/messages");
const {inquirerMenu, pause, leerInput, listadoTareasBorrar, confirm, mostrarListadoCheck} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
const {saveDB, readDB} = require("./helpers/saveFile")

const main = async () => {
      console.clear();
      let opt = '';
      const tareas = new Tareas();
      const tareasDB = readDB();
      if (tareasDB) {
            tareas.loadDataFromArray(tareasDB)
            await pause()
      }
      do {
            opt = await inquirerMenu();
            switch (opt) {
                  case '1' :
                        //Crear Opcion
                        const desc = await leerInput('Please enter the description to your To-Do')
                        tareas.crearTarea(desc)
                        break;
                  case '2' :
                        tareas.listadoCompleto()
                        break;
                  case '3' :
                        tareas.listarPendientesCompletadas()
                        break;
                  case '4' :
                        tareas.listarPendientesCompletadas(false)
                        break;
                  case '5' : //Completado o pendiente
                        console.log()
                        const ids = await mostrarListadoCheck(tareas.listadoArr)
                        console.log()
                        tareas.toggleCompleted(ids)
                        break;
                  case '6' :
                        const id = await listadoTareasBorrar(tareas.listadoArr)
                        if (id === 0) break
                        const submit = await confirm('¿Quieres eliminar?')
                        if (submit) {
                              tareas.borrarTarea(id)
                              console.log('Tarea borrada de forma exitosa'.bold.bgGreen)
                        }
                        break;
            }
            saveDB(tareas.listadoArr);
            await pause()
      } while (opt !== '0')

}
main()
