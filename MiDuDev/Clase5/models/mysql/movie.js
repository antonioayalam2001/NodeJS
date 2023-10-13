// Conexion a la base de datos de Mongo
import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'midudevcurso',
  port: 3306
}
const string = 'mysql://kkvnufitr3ztp7qg45dj:pscale_pw_Em8oYhUR56lnObNRQxTZrh3cfWZmJWkUmuhdPYcLozF@aws.connect.psdb.cloud/midudevcurso?ssl={"rejectUnauthorized":true}'
const connectionString = string || DEFAULT_CONFIG

const connection = await mysql.createConnection(DEFAULT_CONFIG)

export class MovieModel {
  static async getAll ({ genre }) {
    let query = ''
    console.log(genre)
    try {
      if (genre) {
        query = `select g.name as Genero, title,year,director,poster,duration,rate,BIN_TO_UUID(m.id) as idParsed from movies m
        inner join movie_genres mg on m.id= mg.movie_id
        inner join genre g on mg.genre_id = g.id
        where Lower(g.name) = Lower(?)`
        const result = await connection.query(query, [genre])
        return result[0]
      } else {
        query = `
        select g.name as Genero, title,year,director,poster,duration,rate,BIN_TO_UUID(m.id) as idParsed from movies m
        inner join movie_genres mg on m.id= mg.movie_id
        inner join genre g on mg.genre_id = g.id;`
        const result = await connection.query(query)
        return result[0]
      }
    } catch (error) {
      return {
        msg: 'Error al obtener las peliculas'
      }
    }
  }

  static async getOne (id) {
    const query = `select g.name as Genero, title,year,director,poster,duration,rate,BIN_TO_UUID(m.id) as idParsed from movies m
    inner join movie_genres mg on m.id= mg.movie_id
    inner join genre g on mg.genre_id = g.id
    where BIN_TO_UUID(m.id) = ?;`
    const result = await connection.query(query, [id])

    return result[0]
  }

  static async create ({ movie }) {
    const {
      title,
      year,
      director,
      poster,
      duration,
      rate,
      genre
    } = movie
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const { uuid } = uuidResult[0]
    try {
      const query = 'INSERT INTO movies (id,title,year,director,poster,duration,rate) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);'
      const result = await connection.query(query, [uuid, title, year, director, poster, duration, rate])
      if (result[0].affectedRows === 0) {
        return {
          msg: 'Error al insertar la pelicula'
        }
      }
      await this.insertGeneres(uuid, genre)
    } catch (error) {
      console.log(error)
      return {
        msg: 'Error al insertar la pelicula'
      }
    }
    return {
      id: uuid,
      ...movie
    }
  }

  static async insertGeneres (uuid, genre) {
    genre.forEach(async (genre) => {
      const query = `INSERT INTO movie_genres (movie_id,genre_id) VALUES (UUID_TO_BIN(?), (select id from genre where Lower(name) = Lower("${genre}")));`
      const result = await connection.query(query, [uuid])
      if (result[0].affectedRows === 0) {
        return false
      }
    })
  }

  static async update ({ id, movie }) {
    const keys = Object.keys(movie)
    const queries = []
    keys.forEach((key) => {
      queries.push(`${key} = "${movie[key]}"`)
    })
    try {
      const query = `UPDATE movies SET ${queries.join(',')} WHERE id = UUID_TO_BIN(?);`
      const result = await connection.query(query, [id])
      if (result[0].affectedRows === 0) {
        return false
      }
      return {
        id,
        ...movie
      }
    } catch (error) {
      console.log(error)
      return {
        msg: 'Error al actualizar la pelicula'
      }
    }
  }

  static async delete ({ id }) {
    try {
      const result = connection.query('DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [id])
      if (result[0].affectedRows === 0) {
        return {
          msg: 'Error al eliminar la pelicula'
        }
      }
    } catch (error) {
      return {
        msg: 'Error al eliminar la pelicula'
      }
    }
    return true
  }
}
