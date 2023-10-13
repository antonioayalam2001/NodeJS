import cors from 'cors'
export const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:5500'
]

// Middleware para habilitar CORS de forma manual sin usar el paquete cors
export const allowCors = (req, res, next) => {
  const origin = req.header('origin')
  console.log(origin)
  if (!ACCEPTED_ORIGINS.includes(origin) && !!origin) {
    return res.status(403).json({ message: 'Forbidden', origin })
  }
  res.header('Access-Control-Allow-Origin', origin)
  // Indicando que metodos estan permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
}

export const corsPackage = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || acceptedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})
