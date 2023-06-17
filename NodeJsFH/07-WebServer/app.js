const express = require ( 'express' );
const app = express ();
const PORT = 3000 | process.env.PORT;
//Send static content
//We are serving the index file
app.use ( express.static ( 'public' ) )
app
    .get ( '/' , ( req , res ) => {
          //    Never get executed cause this one wes ignored by the static path
          res.send ( '<h1>Hello World </h1>' )
    } )
    .get ( '/ruta2' , ( req , res ) => {
          res.send ( '<h1>Route number 2 </h1>' )
    } )
    .get ( '/ruta3' , ( req , res ) => {
          res.sendFile ( __dirname + '/public/ruta3.html' );
    } )

    .get ( '*' , ( req , res ) => {
          // res.writeHead(404,{'Content-Type': 'text/html'});
          res.sendFile ( __dirname + '/public/404.html' );
    } )

app.listen ( PORT , () => {
      console.log ( 'Listening on PORT : ' , PORT )
} )