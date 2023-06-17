const {Schema , model} = require('mongoose');

const productSchema = Schema({
      available : {
            type : Boolean,
             default : true
      },
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
      price : {
            type : Number,
            default: 0
      },
      category : {
            type : Schema.Types.ObjectId,
            ref:'Category',
            required : true
      },
      img : {type:String}
})

productSchema.methods.toJSON = function ( ){
      const {state,__v, _id , ...rest} = this.toObject();
      return rest
}
module.exports = model('Product',productSchema)