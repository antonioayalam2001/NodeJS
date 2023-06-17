"use strict";
let http = require("http");
let fs = require("fs");
let index;
index = fs.createReadStream("./assets/server.html");
let urlFile = "./assets/server.html";

http
  .createServer((req, res) => {
    // function that helps us to handle if there's an error while reading an static html page
    function readFile(err, data) {
      if (err) throw err;
      res.end(data);
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    // fs.readFile(urlFile, options, callbackFunction);
    fs.readFile(urlFile, readFile);
  })
  .listen(8081);