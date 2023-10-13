// Conexion a la base de datos de Mongo
import { MongoClient, ObjectId } from 'mongodb'

const userName = 'TonyAyala'
const password = '%40200120Tm'
const uri = `mongodb+srv://${userName}:${password}@cursonodejs.uddkeyu.mongodb.net/?retryWrites=true&w=majority`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)
async function connect () {
  try {
    // Connect the client to the server(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
    const database = client.db('moviesMiDuDevCurso')
    return database.collection('movies')
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

export class MovieModel {
  static async getAll ({ genre }) {
    const db = await connect()
    if (genre) {
      return db.find({
        genre: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }).toArray()
    }
    return db.find({}).toArray()
  }

  static async getOne (id) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create ({ movie }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(movie)

    return {
      id: insertedId,
      ...movie
    }
  }

  static async update ({ id, movie }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: movie }, { returnDocument: 'after' })
    if (!ok) {
      return false
    }
    return value
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })

    return deletedCount > 0
  }
}
