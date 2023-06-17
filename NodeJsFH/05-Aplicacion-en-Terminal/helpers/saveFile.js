'use strict'
const fs = require('fs')
const buffer = require("buffer");
const filePath = './db/tareas.json';

const saveDB = (data) => {
      try {
            fs.writeFileSync(filePath , JSON.stringify(data));
      } catch (e) {
            console.log(e);
      }
}

const readDB = () => {
      if (!fs.existsSync(filePath)){
            return null
      }
      //Por defecto regresa bytes
      const info = fs.readFileSync(filePath,'utf-8')
      //Regresando la información en formato JSON
      return JSON.parse(info)
}

module.exports = {saveDB , readDB};