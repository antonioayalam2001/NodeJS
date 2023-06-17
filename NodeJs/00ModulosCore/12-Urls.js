"use strict";
const http = require("http");
const path = require("path");
const urlm = require("url");
// const query = require("querystring");
const fs = require("fs");
let index;
// Simulating URL's from the web

const URL = [
  {
    id: 1,
    route: "",
    output:
      "./assets/server.html",
  },
  {
    id: 2,
    route: "contacto",
    output:
      "./assets/contact.html",
  },
  {
    id: 3,
    route: "acerca",
    output:
      "./assets/about.html",
  },
];

http
  .createServer((req, res) => {
    // basename returns the last part of the path
    //   path.basename("/foo/bar/baz/asdf/quux.html");
    //   // Returns: 'quux.html'

    //   path.basename("/foo/bar/baz/asdf/quux.html", ".html");
    //   // Returns: 'quux'
    let pathURL = path.basename(req.url);
    //   URL.parse (<urlAnalizar>,<opcionDeQueryString: true,false>)
    // if opctionDeQueryString is true this one gives us another object with all the parameters senden in the URL in this line of code we are getting the object and we are going to get the value of the parameter "id"
    let id = urlm.parse(req.url, true).query.id;
    let nombre = urlm.parse(req.url, true).query.nombre;
    console.log(`La URL es: ${pathURL} y tiene un id de ${id}`);
    console.log(`La URL es: ${pathURL} y tiene un nombre de ${nombre}`);

    //   This line of code provides the whole URL parameters in the object
    //   console.log(id);
    URL.forEach((url) => {
      //Realizando la comparación para poder ver si tenemos o no una URL
      if (url.route === pathURL || url.id === parseInt(id)) {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.readFile(url.output, (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      }
    });

    // In the case we not fount a route existent from our URL array we will return a 404 error
    //
    if (!res.writableFinished) {
      res.writeHead(404, { "Content-Type": "text/html" });

      fs.readFile(
        "./assets/404.html",
        (err, data) => {
          if (err) throw err;
          res.end(data);
        }
      );
    }
  })
  .listen(8081);
