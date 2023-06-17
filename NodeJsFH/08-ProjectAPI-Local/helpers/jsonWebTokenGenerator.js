require('dotenv').config()
const JWT = require('jsonwebtoken');

//UID -> User Identifier lo unico que vamos a almacenar en el Payload
//Podemos almacenar to do lo que queramos
const JsonWebTokenGenerator = (uid = '') => {
      return new Promise((resolve, reject) => {
            const payload = {uid}
            //process.env.SECRETORPUBLICKEY -> Llave que utilizamos para poder firmar y corroborar que somos nosotros
            JWT.sign(payload, process.env.SECRETORPUBLICKEY, {
                  expiresIn: 120
            }, (error, token) => {
                  if (error) {
                        console.log(error);
                        reject('Could not generate Token');
                  } else {
                        resolve(token)
                  }
            })
      })
}
module.exports = {JsonWebTokenGenerator};