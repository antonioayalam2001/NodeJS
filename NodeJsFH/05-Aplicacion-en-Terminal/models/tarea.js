const {v4: uuidV4} = require('uuid')

class Tarea {
      id = ' ';
      description = ' ';
      completed = null;

      //Ejecutado cunaod se realiza una nueva instancia
      //Asignar identificador unico por tarea
      constructor(description) {
            //Tarea del objeto instanciado // descripcion recibida
            this.id = uuidV4();
            this.description = description;
            this.completed = null;
      }
};

module.exports = Tarea;