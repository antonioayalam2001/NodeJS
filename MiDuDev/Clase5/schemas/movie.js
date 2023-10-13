import { object as _object, array, enum as enum_, number, string } from 'zod'

const movieSchema = _object({
  title: string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }).min(1).max(100),
  year: number().int().min(1888).max(2077),
  director: string().min(1).max(100),
  duration: number().int().positive(),
  poster: string().url({
    message: 'Poster must be a valid URL'
  }).optional(),
  genre: array(
    enum_(['Comedy', 'Crime', 'Drama', 'Action', 'Romance', 'Horror', 'Sci-Fi', 'Documentary,Terror'])
  ),
  rate: number().min(0).max(10).default(5.5)
}
)

export function validateMovie (object) {
  // Devuelve un objeto con dos propiedades: success y data
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  // partial valida que el objeto tenga al menos una propiedad del esquema
  // Hace que todos los campos del esquema sean opcionales
  return movieSchema.partial().safeParse(object)
}
