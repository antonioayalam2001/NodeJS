'use strict'
//This variable has the connection that comes from movie-connection
//Operaciones que realizan las bases de datos unico conectado a la misma
let con = require('./movie-connection'), MovieModel = () => {
}
//    The only one who needs the connection is this one
MovieModel.getAll = (callBack) => {
    con.query('SELECT * FROM movie', callBack)
}

MovieModel.getOne = (movieId, callBack) => {
    con.query('select * from movie where movie_id = ? ', movieId, callBack)
}

/* Ya no utilizamos estos metodos, son sustituidos al momento de implementar el REST por save
MovieModel.insert = (data, callback) => {
    con.query('insert into movie set ?', data, callback)
}

MovieModel.update = (data, callback) => {
    con.query('update movie set ? where movie_id = ?', [data, data.movie_id], callback)
}
*/

MovieModel.delete = (movieId, callback) => {
    con.query('delete from movie  where movie_id = ?', movieId, callback)
}

MovieModel.save = (data, callback) => {
    con.query('select * from movie where movie_id = ? ', data.movie_id, (error, rows) => {
        if (rows.length == 1) {
            con.query('update movie set ? where movie_id = ?', [data, data.movie_id], callback)
        } else {
            con.query('insert into movie set ?', data, callback)
        }
    })
}


module.exports = MovieModel
