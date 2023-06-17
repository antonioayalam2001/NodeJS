'use strict'

//Esta es la aplicación principal que controla todo
let app = require('./app'),
server = app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})
