'use strict'

const app = require('./app'),
server = app.listen(app.get('port'),()=>{
    console.log('Server listening on port number : ', app.get('port'))
})