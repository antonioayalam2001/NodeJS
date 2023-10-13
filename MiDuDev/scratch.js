const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  '10'
]

const prueba = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  console.log(acceptedOrigins)
}

prueba({})

console.log(ACCEPTED_ORIGINS.includes('8'))

console.log(!undefined)
