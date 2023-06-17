'use strict'
let express = require('express'),
   router = express.Router()

const pug = (req,res,next) => { 
  let locals = {
    title: 'Pug',
    description: 'Pug is a template engine written in JavaScript.',

  }
  res.render("home", locals);
}

router
   // En el navegador : http://localhost:3000/home
  .get("/", (req, res) => {
    // res.send("Bienvenido al apartado de Home");
    res.render('index', { title: 'Index with PUG',array : [1,2,3,4,5] });
  })
  // En el navegador : http://localhost:3000/home/homeRuta2
  .get("/homeRuta2", (req, res) => {
    // res.send("Home ruta numero 2");
    res.render('page-a', { title: 'Index with PUG',array : [1,2,3,4,5] });
    // res.render(index, { title: 'Index with Jade' });
  });

//   Exportamos todas las direcciones 
module.exports = router;