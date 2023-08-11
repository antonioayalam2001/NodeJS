const generes = ['Comedy', 'Drama', 'Action', 'Romance', 'Horror', 'Sci-Fi', 'Documentary']
const genere = 'Comedy'

console.log(generes.includes(genere))
const value = generes.some((g) => g.toLowerCase() === genere.toLowerCase())

console.log(3 !== 4)

let foo

// nunca es asignado un valor a foo por lo que se mantiene undefined
const someDummyText = foo || '¡Hola!'
console.log(someDummyText)
