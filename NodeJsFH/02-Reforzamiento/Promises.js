'use strict'

const empleados = [
      {id: 1, nombre: 'Antonio'},
      {id: 2, nombre: 'Lucy'},
      {id: 3, nombre: 'Ana'},
      {id: 6, nombre: 'Julia'},
]

const salarios = [{id: 1, salario: 2000}, {id: 2, salario: 3000}]


const getEmpleado = (id, callback) => {
      return  new Promise((res, rej) => {
            const empleado = empleados.find(e => e.id === id)?.nombre;
            empleado
                ? res(empleado)
                :rej('No existe un empleado con ese Id')
      })


}

let id = 6 ;


getEmpleado(id)
    .then(empleado => console.log(empleado))
      .catch(err => console.log(err))


const getSalario = (id) =>{
      return new Promise(  (res,rej) =>{
            const salario = salarios.find(salarioId => salarioId.id ===id)?.salario
            salario
            ?res(salario)
                :rej('No encontramos un salario disponible con el id Proporcionado')
      }   )
}

getSalario(id)
    .then(salario => {
      console.log(salario)
})
    .catch(err=> console.log(err)
)


id =1
//CALLBACK HELL
// getEmpleado(id)
//     .then(empleado =>{
//           getSalario(id)
//               .then(salario => {
//                     console.log(`El empleado tiene ${salario} y su nombre es ${empleado}`)
//           }).catch(err=>{
//                 console.log('No existe ese salario')})
//     }).catch(err=>{
//       console.log(err)})

//PROMESAS EN CADENA
let nombre;
getEmpleado(id)
    .then(empleado =>{
          nombre = empleado
            return  getSalario(id)
    })
    .then(salario=> console.log(salario,nombre) )
    .catch(err=>{
      console.log(err)})

