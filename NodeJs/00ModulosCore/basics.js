// Organizacion del codigo de JavaScrips
/*
* Librerias / Modulos
* constantes
* objetos/variables
* funciones
* eventos
* ejecuciones
*
Usar camelCase
	Cuando una instrucción tenga una sola palabra, va en minúsculas p.e. require()
	Sólo las clases rompen esta regla, siempre va en mayúscula la letra inicial p.e. EventEmmiter()
	Cuando una instrucción tenga 2 o más palabras, apartir de la segunada la primer letra va en mayúscula p.e. createServer()
	Tipos de CamelCase
		UpperCamelCase
			Date()
			EventEmmiter()
		lowerCamelCase
			getElementById()
			createServer()
*/
// 'use strict'
// console.log('Hola Mundo desde NodeJS esto se vera en la terminal de comandos')
// console.log(2+2)
// setInterval(function () {
//     console.log('Hola a todos')
// },1000)



const object = [
	{
		id: 1,
		name: "Tony Ayala",
		lastname: "Garcia",
	},
	{
		id: 2,
		name: "Juan",
		lastname: "Perez",
	}
]

for (const iterator in object) {
	console.log(object[iterator]);
}

object.forEach(element => {
	console.log(element.name);
});


stringData =
{
	categories: [
		{
			name: "test 1",
			department: "Information Technology",
		},
		{
			name: "test 2",
			department: "Computer Engineering",
		},
		{
			name: "test 3",
			department: "Information Technology",
		},
	]
}

console.log(stringData);
console.log(JSON.stringify(stringData));
infoJson = JSON.stringify(stringData);

console.log(JSON.parse(infoJson));
