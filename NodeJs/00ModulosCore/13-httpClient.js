'use strict'
let http = require('http')
let htmlCode = ""
let options = {
  host: 'www.mediotiempo.com',
  port: 80,
  path: '/futbol/liga-mx/estadisticas'
};

function httpClient(res) {
    console.log(`El sitio ${options.host} responde con el codigo ${res.statusCode}`);
    // When you execute the get options 
    res.on(`data`, (data) => { 
        //while data is being received we concatenate it to the htmlCode variable
        htmlCode += (data.toString())
    })
}

function httpError(err) {
    console.log(`El sitio ${options.host} no responde`);
}

function webServer(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(htmlCode)
} 

//Instancia cliente de HTTP
http.get(options, httpClient)
    .on('error', httpError)
//Instancia Servidor HTTP
http.createServer(webServer).listen(8081)