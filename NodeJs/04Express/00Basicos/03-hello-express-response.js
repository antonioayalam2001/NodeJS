'use strict'
const express = require('express');
const app = express();
const port = 3000;
app
   .get('/', (req, res) => { 
      res.sendFile((__dirname + '/assets/server.html'));
      console.log(__dirname);
   })
   .get('/home', (req, res) => { 
      res.set("Content-Type", "text/html; charset=ISO-8859-1");
      res.send('<h1>Bienvenido a la página de inicioñññññ</h1>');
   })
   // Error
   .get('/otro/', (req, res) => { 
      res.status(404).send("<h1>Sorry, we cannot find that opción!</h1>");
   })
   .get('/redireccion', (req, res) => { 
      // 301 Redireccionamiento Permanente
      res.redirect(301, '/home');
   })
   .get('/json', (req, res) => { 
      res.json({
         name: "Tony",
         lastName: "Antonio",
         age: "30",
      })
   })

   // La vista no tiene nada que ver con la ruta
   .get('/render', (req, res) => { 
      // Renderizar la vista que estamos especificando, pero debe ser configurada previavemnte con las opciones correspondientes
      res.render('assets/server.html')
   })
   .listen(port)

