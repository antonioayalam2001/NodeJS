"use strict";
// process.exit();
let http = require("http");
let fs = require("fs");
let index;
index = fs.createReadStream('/Users/tonyayala/Library/CloudStorage/OneDrive-Personal/Universidad/NodeJs/00ModulosCore/assets/server.html');
http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
      index.pipe(response);
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");


