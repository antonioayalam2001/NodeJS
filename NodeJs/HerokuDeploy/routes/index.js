'use strict'

let express = require('express'),
    router = express.Router();


router.get('/',(req, res)=>{
    res.render('index',{titulo: 'Bienvenido'})
})

module.exports = router;



