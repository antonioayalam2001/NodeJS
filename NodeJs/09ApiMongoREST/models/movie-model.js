'use strict'
//This variable has the connection that comes from movie-connection
//Operaciones que realizan las bases de datos unico conectado a la misma
let con = require('./movie-connection'),
    MovieModel = () => {}
//    The only one who needs the connection is this one
MovieModel.getAll = (callBack) => {
    con.find().exec((err,docs)=>{
        if (err) throw err
        callBack(docs)
    })
}

MovieModel.getOne = (movieId, callBack) => {
    con.findOne({movie_id : movieId}).exec((err,data)=>{
        if (err) throw  err
        console.log(data)
        callBack(data)
    })
}


MovieModel.delete = (movieId, callback) => {
    con.remove({movie_id : movieId},(err)=>{
        if (err) throw  err
        callback()
    })
}

MovieModel.save = (docs, callback) => {
    con.count({movie_id : docs.movie_id}).exec((err,count)=>{
        if (err) console.log(err)
        console.log(count)
        if (count == 0){
            con.create(docs,(error)=>{
                if (error) throw error
                callback()
            })
        }else{
            console.log(docs)
            con.updateOne({movie_id : docs.movie_id},{$set:{
                title : docs.title,
                    release_year : docs.release_year,
                    rating : docs.rating,
                    image : docs.image
                }},(err)=>{
                if (err) throw err
                callback()
            })
        }
    })
}


module.exports = MovieModel

/* Ya no utilizamos estos metodos, son sustituidos al momento de implementar el REST por save
MovieModel.insert = (data, callback) => {
    con.query('insert into movie set ?', data, callback)
}

MovieModel.update = (data, callback) => {
    con.query('update movie set ? where movie_id = ?', [data, data.movie_id], callback)
}
*/