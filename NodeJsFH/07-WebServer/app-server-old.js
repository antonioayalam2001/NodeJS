const http = require('http')

// //MAS INFORMACION ACERCA DE LOS METODOS EN NOTION O EN EL DOCUMENTO DE TEMAS
// http.createServer((req,res)=> {
//       // console.log(req);
//       //Accediendo a los headers
//       // console.log(req.headers);
//       //El token fue mandado mediante postman
//       let {token} = req.headers;
//       console.log(token)
//       if(token){
//             res.writeHead(302, {
//                   'Location': 'http://google.com'
//             });
//             res.end();
//       }else if (!token){
//             // res.writeHead(202,{'Content-Type' : 'text/plain'})
//             // req.url === '/page2' ? res.write('Page number 2') :
//             //     res.write('Hola Mundo');
//             if (req.url === '/page-json'){
//                   const person = {
//                         name : 'Antonio',
//                         age : 21
//                   }
//                   console.log('RESPONSE')
//                   /*
//                   * Indica que se va a descargar un archivo con el filename especificado
//                   * Podemos especificar el tipo de archivo que queremos que sea
//                   * .txt -> archivo de texto
//                   * .csv -> Archivo de excel
//                   * */
//                   res.setHeader('Content-Disposition','attachment; filename = lista.xlsx')
//                   res.writeHead(202,{'Content-Type' : 'application/csv'})
//
//                   res.write('id, nombre\n')
//                   res.write('1, Fernando\n')
//                   res.write('2, Mario\n')
//                   res.write('3, Antonio\n')
//                   // res.write(JSON.stringify(person))
//                   res.end()
//             }
//             //We must be specifying that we already finished
//             res.end();
//       }
// })
//     .listen(3000)

http.createServer((req,res)=>{
      res.write('Hola a todos')
      res.end()
}).listen(3000)



console.log('Escuchando')