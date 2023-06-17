var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Aqui lo estamos exportando con el nomrbe de router, cuando hagamos un require, podemos solicitarlo
// con cualquier nombre que nosotros queramos
module.exports = router;
