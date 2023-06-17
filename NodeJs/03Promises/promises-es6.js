'use strict'

const fs = require('fs')
let file = './03Promises/assests/nombres.txt'
let newFile = "./03Promises/assests/nombres-PromisesCallback.txt";
const promise = new Promise((resolve, reject) => { 
   fs.access(file, fs.constants.F_OK, (error) => { 
      return error ? reject("errorrrr") : resolve('Si se pudo puerk')
   })
})

promise.then((resolve, reject) => { 
      console.log("El archivo existe");
      return new Promise((resolve, reject) => { 
            fs.readFile(file, (err, data) => { 
            return err
              ? reject(new Error("El archivo no se pudo leer"))
              : resolve(data);
         })
      })
   })
   .then((data, reject) => { 
      // Salen los datos del buffer, por lo que vemos los datos en formato hexadecimal 
      console.log(data);
      console.log('El archivo a sido leido de forma exitosa');
      return new Promise((resolve, reject) => {
               fs.writeFile(newFile, data, (err) => {
                 return err
                   ? reject ("El archivo no se pudo escribir")
                   : resolve("Todo salio bien");
               });
       })

   })
   .then((resolve, reject) => {
      console.log(resolve);
    })
   .catch((msgError) => { 
      console.log(msgError);
   })