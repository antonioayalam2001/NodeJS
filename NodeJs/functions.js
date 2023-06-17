// // const funcion = (a) => { console.log(a) }
// // function funcion2(a,b) {
// //    console.log(a+b);
// // }
// // console.log(funcion)
// // funcion(12)
// // funcion(10)
// //
// // console.log(funcion2);
// //
// //
// // const myPromess = new Promise((resolve, reject) => {
// //    a = 1
// //    b=2
// //    if (a < b) {
// //       resolve ('Hola')
// //    } else {
// //       reject ('adios')
// //    }
// // });
// //
// // myPromess.then(res => {
// //    console.log(res);
// // }).catch(e => {
// //    console.log(e);
// // })
// //
// // /* Implementación con promesas */
// // const doTask = (iterations) => new Promise((resolve, reject) => {
// //   const numbers = [];
// //   for (let i = 0; i < iterations; i++) {
// //     const number = 1 + Math.floor(Math.random() * 6);
// //     numbers.push(number);
// //     if (number === 6) {
// //       reject({
// //         error: true,
// //         message: "Se ha sacado un 6"
// //       });
// //     }
// //   }
// //   resolve({
// //     error: false,
// //     value: numbers
// //   });
// // });
// //
// //
// // doTask(10)
// //   .then((result) => console.log("Tiradas correctas: ", result))
// //   .catch((err) => console.error("Ha ocurrido algo: ", err.message));
// //
// // let array = [1,2,3]
// // let arrayResult = []
// //
// // arrayResult = array.map(e=>e+10)
// // console.log(arrayResult)
// // console.log(array)
// //
//
// let object = {
//       nombre: 'Tony',
//       Apellido: 'Mora',
//       Edad: 18
// }
// let object2
// object = Object.entries(object).map(([prop, value]) => {
//       return {
//             [prop]: typeof value === 'string' ? value.toUpperCase() : value
//       }
// })
//
// console.log(object)
// //
// // export default function suma(a, b) {
// //       return a + b
// // }
// //
// // export function resta(a, b) {
// //       return a - b
// // }
// //
// // export function division(a, b) {
// //       return a / b
// // }
//
//
// const validateJWT = async  () => {
//       // console.log(req.session)
//       //Realizando la comprobación mediante el token en la cabecera
//       const token = "req.session.token || req.headers['x-token']"
//       //Realizando la comprobación mediante la cookie almacenada en una session
//       // const token = req.session.token;
//       if (!token) {
//             return res.status(401).json({
//                   msg: 'No hay token en la petición :('
//             })
//       }
//       try {
//             // JWT.verify(token,process.env.SECRETORPUBLICKEY)
//             // const {uid} = JWT.decode(token, process.env.SECRETORPUBLICKEY);
//             //leer usuario que corresponde al uid
//             // const usuario = await Usuario.findOne({_id:uid});
//             const usuario = {
//                   name: "Antonio"
//             }
//             if (!usuario) {
//                   return ({
//                         msg: "El usuario no existe en la base de Datos"
//                   })
//             }
//             //Verificar si el uid no esta dado de baja state : false
//             // if (!usuario.state) {
//             //     return res.status(401).json({
//             //         msg : "El usuario no esta dado de alta"
//             //     })
//             // }
//             return "hols";
//             // req.user = usuario;
//             // req.uid = uid;
//             // next();
//       } catch (e) {
//       }
//
// }
// const getData = async()=>{
//     try{
//         return  await validateJWT()
//     }catch (e) {
//         return e
//     }
// }
// getData().then(user=>{
//     console.log(user)
// }).catch(e=> console.log(e) )
//
//
//
//
//
//
const fs = require ( 'node:fs' )
const readFile = async () => {
      const info = await fs.promises.readFile ( 'prueba.txt' );
      console.log ( 'function' + info );
      return info
}

readFile ().then(info => console.log(info + ''));