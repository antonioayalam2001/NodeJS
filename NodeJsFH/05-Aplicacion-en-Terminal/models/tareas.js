//Logica:
/*
_list
      {
            uuid : { id : , desc : completed : },
            uuid : { id : , desc : completed : },
            uuid : { id : , desc : completed : },
       }


*/
const Tarea = require('./tarea')
class Tareas {
      _list = {}
      get listadoArr () {
            const listado = []
            Object.keys(this._list).forEach(property => {
                  listado.push(this._list[property])
            })
            return listado
      }

      constructor() {
            this._list = {};
      };

      loadDataFromArray (tareas) {
            tareas.forEach(tarea => {
                  this._list[tarea.id] = tarea
            })
      }

      crearTarea(desc = '') {
            const tarea = new Tarea(desc);
            this._list[tarea.id] = tarea;
      }

      listadoCompleto () {
            const lista = this.listadoArr
      //      Numero de Color verde : Completado
            //Indicador de completado o pendiente Completado verde, pendiente Rojo
            console.log()
            lista.forEach((tarea , index)=> {
                  const indice = `${index+1}`.green
                  const {description , completed } = tarea
                  const estado = (completed!=null) ? 'Completado'.green.bold : 'Incompleto'.red.bold
                  console.log(`${indice}  ${description} :: ${estado}`)
            })
      }

      listarPendientesCompletadas(completadas = true){
            const lista = this.listadoArr
            //      Numero de Color verde : Completado
            //Indicador de completado o pendiente Completado verde, pendiente Rojo
            console.log()
            lista.forEach((tarea , index)=> {
                  const indice = `${index+1}`.green
                  const {description , completed } = tarea
                  const estado = (completed!=null) ? 'Completado'.green.bold : 'Incompleto'.red.bold
                  if (completadas){
                        if (completed)  console.log(`${indice}  ${description} :: ${estado} --->>Date : ${tarea.completed}`)
                  }else{
                        if (!completed)
                        console.log(`${indice}  ${description} :: ${estado}`)
                  }
            })
      }

      borrarTarea(id = ''){
            if (this._list[id])
                  delete this._list[id]
      }

      toggleCompleted(ids = []){
            ids.forEach(id => {
                        const tarea = this._list[id];
                        if (! tarea.completed){
                              tarea.completed = new Date().toISOString().substring(0,10)
                        }
                })

            this.listadoArr.forEach(tarea => {
                  if (!ids.includes(tarea.id)){
                        this._list[tarea.id].completed = null;
                  }
            })

      }


};
module.exports = Tareas