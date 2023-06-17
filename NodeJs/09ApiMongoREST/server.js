'use strict'
const app = require('./app'),
server = app.listen(app.get('port'),()=>{
    console.log('Listening on port : ')
})
