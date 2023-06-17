'use strcict'
const express = require('express')
const app = express()
const port = 3000

app
  .get("/", (req, res) => {
    // Mandando un archivo html a traves de express
    console.dir(req.ip);
    res.sendFile(`${__dirname}/assets/index.html`);
  })
  // Mandamos dos parametros, pero el formato en la URL debe ser exactamente como esta estipulado :
  // Forma 1>>>>>>>>>>>
  // http://localhost:3000/user/Parametro1-Parametro2
  // .get('/user/:nombreDelParametro-:nombreParametro2', (req, res) => {
  // >>>>>>>>>>>>>>>>
  // Forma 2>>>>>>>>>>>
  // http://localhost:3000/user/1&Tony&antonio
  .get("/user/:idUsuario&:nombre&:Apellido", (req, res) => {
    // >>>>>>>>>>>>>>>>
    // Mandando un archivo html a traves de express
    console.dir(req.ip);
    res.end(
      `<h1>Hola ${req.params.idUsuario} ${req.params.nombre} ${req.params.Apellido}</h1>`
      // Resultado Hola Parametro1 Parametro2
     );
  })

app.get("/user", (req, res) => {
  var name = req.query.name;
  var isAuthor = req.query.isAuthor;
//   res.json({
//     name,
//     isAuthor,
//   });
   res.end(`<h1><b>Hola ${name} ${isAuthor}</b></h1>`);
   console.log(name);
   console.log(isAuthor);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Estamos realizando la impresion del nombre del directorio principal
console.log(__dirname);
