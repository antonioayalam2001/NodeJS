require('dotenv').config()
const JWT = require('jsonwebtoken');
const {Usuario} = require('../models')

//UID -> User Identifier lo unico que vamos a almacenar en el Payload
//Podemos almacenar to do lo que queramos
const JsonWebTokenGenerator = (uid = '') => {
      return new Promise((resolve, reject) => {
            const payload = {uid}
            //process.env.SECRETORPUBLICKEY -> Llave que utilizamos para poder firmar y corroborar que somos nosotros
            JWT.sign(payload, process.env.SECRETORPUBLICKEY, {
                  expiresIn: '1h'
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

const validateJWT = async (token = ' ') => {
      try {
            if (token < 10) {
                  return null;
            }
            const {uid} = JWT.verify(token, process.env.SECRETORPUBLICKEY);
            const user = await Usuario.findById(uid);
            if (user && user.state === true) {
                  return user;
            } else {
                  return null;
            }
      } catch (e) {
            return null;
      }
}
module.exports = {JsonWebTokenGenerator,validateJWT };