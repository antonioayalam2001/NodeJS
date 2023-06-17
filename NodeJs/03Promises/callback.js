'use strict'

let fs = require('fs')
let filePath = "./assests/nombres.txt";
let newFile = "./assests/nombres-callback.txt";
// This one is already deprecated
fs.exists(filePath, (exists) => { 
   console.log(exists ? "The file is there Yahoo" : "Chale there is not file"); 
})

// The follow one is very similar to the previous


// Check if the file exists

// Constant	Description
      // F_OK	Flag indicating that the file is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
      // R_OK	Flag indicating that the file can be read by the calling process.
      // W_OK	Flag indicating that the file can be written by the calling process.
      // X_OK	Flag indicating that the file can be executed by the calling process. This has no effect on Windows (will behave like fs.constants.F_OK).


fs.access(filePath, fs.constants.F_OK, (error) => { 
   if (error) {
      console.log('There has been some error');
   } else { 
      console.log('Everything is up to date');
      // Second callback
            //path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
            // options <Object> | <string>
                  // encoding <string> | <null> Default: null
                  // flag <string> See support of file system flags. Default: 'r'.
                  // signal <AbortSignal> allows aborting an in-progress readFile
            // callback <Function>
                  // err <Error> | <AggregateError>
                  // data <string> | <Buffer></Buffer>
      fs.readFile(filePath, {'encoding' : 'utf-8','flag': 'r+'}, (err,data) => { 
         data ? (fs.writeFile(newFile, data, (err) => { 
            let cadena = ''
            for (const iterator of data) {
               cadena += iterator
            }
            console.log(cadena.replace(/[a-d]*[\n]/g, ''));
            if (err) {
               console.log(error);
            }
         })): console.log(err);
      })
   }
}) 