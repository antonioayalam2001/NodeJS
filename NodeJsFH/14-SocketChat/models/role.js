const {Schema, model} = require('mongoose');

const roleSchema = Schema({
      rol: {
            type: String,
            required: [true, "Rol Obligatorio"]
      }
});

module.exports = model('Role', roleSchema)