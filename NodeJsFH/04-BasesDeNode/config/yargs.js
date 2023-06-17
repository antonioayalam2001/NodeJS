const argv = require('yargs')
    //Dando un alias a la forma en que mandamos el argumento
    //node app --b=10
    .option('b',{
          alias : 'base',
          type : 'number',
          //Forzando a que se ingrese
          demandOption : true,
          default : 1,
          describe : 'Parametro de la base que quieres multplicar'
    })
    .option('l',{
          alias : 'listar',
          type : 'boolean',
          demandOption : true,
          default : false,
          describe : 'Te gustria ver la tabla en consola?'
    })
    .option('h',{
          alias : 'hasta',
          type : 'number',
          demandOption : false,
          default : 10,
          describe : 'Limite'
    })
    .check((argv,options)=>{
          if (isNaN(argv.b) || isNaN(argv.h)){
                throw 'La base tiene que ser un numero'
          }
          return true
    })
    .argv;

module.exports = argv;