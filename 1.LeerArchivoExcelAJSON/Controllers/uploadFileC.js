const excelToJson = require ( 'convert-excel-to-json' );
const { request : req , response : res } = require ( 'express' );
const fs = require ( 'fs' );
const path = require ( "path" );
const home = ( req , res ) => {
      res.render ( 'index' )
}

const uploadFile = ( req , res ) => {
      const excelData = excelToJson ( {
            sourceFile : req.file.path ,
            header : {
                  rows : 1
            } ,
            columnToKey : {
                  A : 'Name' ,
                  B : 'SEPT' ,
                  C : 'OCT' ,
                  D : 'NOV' ,
                  E : 'DIC'
            }
      } );

      const fileName = path.join ( __dirname ,'../uploads' ,`${ req.file.originalname }` )

      fs.copyFileSync ( req.file.path , fileName  )

      fs.rm(req.file.path , (err)=> {
            if ( ! err ) console.log ('No hubo error')
      });

      res.status ( 200 ).json ( excelData );
}


module.exports = {
      home ,
      uploadFile
}
//
// {
//      fieldname: 'file',
//     originalname: 'tables.xlsx',
//     encoding: '7bit',
//     mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     destination: 'uploads/',
//     filename: '36394f78035b887901fb4de8ed311920',
//     path: 'uploads\\36394f78035b887901fb4de8ed311920',
//     size: 20728
// }