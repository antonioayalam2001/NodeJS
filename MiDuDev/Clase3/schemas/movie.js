const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }).min(1).max(100),
  year: z.number().int().min(1888).max(2077),
  director: z.string().min(1).max(100),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }).optional(),
  genre: z.array(
    z.enum(['Comedy', 'Crime', 'Drama', 'Action', 'Romance', 'Horror', 'Sci-Fi', 'Documentary,Terror'])
  ),
  rate: z.number().min(0).max(10).default(5.5)
}
)

function validateMovie (object) {
  // Devuelve un objeto con dos propiedades: success y data
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  // partial valida que el objeto tenga al menos una propiedad del esquema
    //Hace que todos los campos del esquema sean opcionales
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
