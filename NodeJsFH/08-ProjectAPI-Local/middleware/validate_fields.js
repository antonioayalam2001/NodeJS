const {validationResult} = require("express-validator");
//Next se llama cuando todo esta correcto
const  validateField = (req,res,next)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json(errors);
      }
      next();
}
module.exports = {
      validateField
}