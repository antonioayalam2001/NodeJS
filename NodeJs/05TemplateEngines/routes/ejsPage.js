const express = require('express');
const router = express.Router();

//Creacion de error 404
//Debe ser definido al final
//Controla errores encontrados
//Nos proporcionara los errores para todas las rutas que sean derivadas de las definidas en la ruta
//del router

//  Router-> /ejsPage ->Proporciona pajeEjs -> http://localhost:3000/ejsPage/hola/adios
//  Ruta http://localhost:3000/ejsPage/hola/adios -> Plantilla Error
//  Ruta http://localhost:3000/ejsPage/hola -> Plantilla Error
function error404(req,res,next){
    let error = new Error(),
        locals={
        title:'Error',
            description : 'Recurso no encontrado :(',
            error : error
    }
    error.status = 404;
    res.render('errorejs',locals)
    res.next()
}


router.get('/',(req,res)=>{
    var characters = [
        {
            name: 'Harry',
            designation: "Student"
        },
        {
            name: 'Dumbledore',
            designation: "Headmaster"
        },
        {
            name: 'Snape',
            designation: "Professor"
        },
        {
            name: 'Hermione',
            designation: "Student"
        }
    ];
    res.render('pageEjs',{title:"Titulo de la pagina",char:characters})
})
    .use(error404)

module.exports = router