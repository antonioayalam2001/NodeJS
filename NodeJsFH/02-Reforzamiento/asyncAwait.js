'use strict'

const empleados = [
      {id: 1, nombre: 'Antonio'},
      {id: 2, nombre: 'Lucy'},
      {id: 3, nombre: 'Ana'},
      {id: 6, nombre: 'Julia'},
]

const salarios = [{id: 1, salario: 2000}, {id: 2, salario: 3000}]



let id = 6 ;

const getEmpleado = (id) => {
      return  new Promise((res, rej) => {
            const empleado = empleados.find(e => e.id === id)?.nombre;
            empleado
                ? res(empleado)
                :rej('No existe un empleado con ese Id')
      })


}

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

id =3
const getInfoUsuario = async(id)=>{
      try{
            let empleado = await getEmpleado(id)
            let salario = await getSalario(id)
            return {
                  empleado :empleado,
                  salario:salario
            }
      }catch (e) {
            //Permite llegar a la primer parte de la promesa
            // return e
      //Inmediatamente dispara al error en cuestión
            throw e
      }


}

getInfoUsuario(id).then(usuario => {
      console.log('Llegue aqui')
      console.log(usuario)
}).catch(err=> console.log(err) )



