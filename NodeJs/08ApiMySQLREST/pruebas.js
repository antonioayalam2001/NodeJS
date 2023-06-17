function saludar(callback,nombre) {
    console.log('Hola' + nombre)

}
// saludar()
//
// const hola = (cb)=>{
//     cb('Tony')
// }
//
// hola(saludar)

const adios = () =>{
    console.log('Adios')
}

saludar(adios,'Tony')

const objectToIterate = [
{
    name: 'Tony',
    lastName: 'Tony',
    age: 'Tony'
}
]

const [object] = objectToIterate
console.log(object)
