const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001'
]

const prueba = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  console.log(acceptedOrigins)
}

prueba({})
