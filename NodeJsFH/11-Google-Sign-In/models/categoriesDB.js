const {Schema , model } = require('mongoose');

const categorySchema = Schema({
      name : {
            type : String,
            required : [true ,"Name must be provided"]
      },
      state : {
            type : Boolean,
            default : true,
            required : [true ,"State must be provided"]
      },
      user : {
            type : Schema.Types.ObjectId,
            ref : 'Usuario',
            required : true
      },
      description : {
            type : String,
            required : [true ,"Description must be provided"]
      },
})

categorySchema.methods.toJSON = function () {
      const {_id,__v, state ,...category} = this.toObject();
      return category;
}


module.exports = model('Category',categorySchema);