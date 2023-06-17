'use strict'

const deadPool = {
      nombre : 'Wayne',
      apellido : 'Whinstone',
      poder : 'Regeneración',
      getNombre  (){
            return `${this.nombre} ${this.apellido} ,${this.poder}`
      }
};

const array = [{x:0},{y:2}];
let [ob1,obj2] = array;
console.log(obj2)



function imprimeHeroe(   {nombre,apellido,poder,edad = 10} ){
      console.log(nombre)
}
imprimeHeroe(deadPool)

const heroes = ['batman','harley','WonderWoman']
const [, , wonderW] = heroes
console.log(wonderW)

