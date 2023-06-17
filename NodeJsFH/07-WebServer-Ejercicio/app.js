require('dotenv').config()
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

//Handlebars
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', '.hbs');

app.use(express.static('public'))
    .get('/', (req, res) => {
          //Argumentos enviados a la vista
          res.render('home',{
                nombre : 'Antonio',
                titulo : 'Curso de Node'
          });
    })
    .get('/generic', (req, res) => {
          res.render('generic');
    })
    .get('/elements', (req, res) => {
          res.render('elements');
    })
    .get('*', (req, res) => {
          res.render('404');
    })

app.listen(PORT, () => {
      console.log('Server running on PORT : ', PORT);
})