require('dotenv').config();
const mongoose = require('mongoose');
const dbConnection = async () => {
      try {
            //If passwords has some charachter as @ or something like that you must change it to the code of URLEncoded
            await mongoose.connect(process.env.MONGODB_CNN, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            })
            console.log('Connection Success')
      } catch (e) {
            // console.log(e)
            throw new Error('Sorry database connection error')
      }
}
module.exports = {
      dbConnection
}