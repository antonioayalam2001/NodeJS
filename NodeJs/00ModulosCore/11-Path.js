'use strict'
let http = require('http')
let path = require('path')

// Simulating URL's from the web

const URL = [
  {
    route: "",
    output: "<h2> Hello World from NodeJS </h2>",
  },
  {
    route: "contacto",
    output: "<h2> Contacto </h2>",
  },
  {
    route: "acerca",
    output: "<h2> About Me</h2>",
  },
];

http.createServer((req, res) => {
  // basename returns the last part of the path
//   path.basename("/foo/bar/baz/asdf/quux.html");
//   // Returns: 'quux.html'

//   path.basename("/foo/bar/baz/asdf/quux.html", ".html");
//   // Returns: 'quux'
    let pathURL = path.basename(req.url);
    console.log("La URL es: " + pathURL);
    URL.forEach((url) => { 
        //Realizando la comparación para poder ver si tenemos o no
            if (url.route === pathURL) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(url.output);
            }
    });

    // In the case we not fount a route existent from our URL array we will return a 404 error
    //
    if (!res.writableFinished) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Error 404: No encontrado</h1>");
    }        

}).listen(8081);
 