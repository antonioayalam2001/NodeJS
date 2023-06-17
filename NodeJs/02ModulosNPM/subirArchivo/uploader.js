"use strict";

// Modules must no be camel Case and must be exported
const http = require("http").createServer(serverUploader);
const util = require("util");
const formidable = require("formidable");
const fse = require("fs-extra");

function serverUploader(req, res) {
  if (req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    // Dado que se esta trabajando con archivos binarios se debe especificar enctype="multipart/form-data"
    res.end(`
         <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="upload">
            <input type="submit" value="Upload">
         </form>            
            `);
  } else {
    if (req.url == "/upload") {
      let form = new formidable.IncomingForm();
      form
        .parse(req, function (err, fields, files)  {
          res.writeHead(200, { "Content-Type": "text/html" });

          // Comenzando así por la gran cantidad de información
          res.write("<h1>Archivo subido</h1>" + util.inspect({ files: files }));
          // finalizando envio al servidor
                     // console.log(fields);
                     console.log('estos son los archivos', files.upload.originalFilename);
          res.end();
        })
         .on("progress", function (bytesReceived, bytesExpected)  {
            let percentCompleted = (bytesReceived / bytesExpected) * 100;
            console.log(percentCompleted.toFixed(2) + "%");
        })
         .on("error", function (err)  {
            console.log(err);
        })
         .on('end',function (fields,files) {
            console.log(this);
            let filePath = this.openedFiles[0].filepath;
            let fileName = this.openedFiles[0].originalFilename;
            let newPath = './uploads/' + fileName;
            fse.copy(filePath, newPath, function (err) { 
               return err ? console.log(err) : console.log('Archivo subido al servidor de manera exitosa');
            })
         });
       return
    }
  }
}

http.listen(3000);
