'use strcit'
const http = require('http')
// read file sync allows us to continue with the flow of code while we are reading the file
const form = require('fs').readFileSync('NodeJs/00ModulosCore/assets/forms.html')
const querystring = require('querystring')
const util = require('util')
// Saving the content from out form in a variable
let htmlCode = ''

function webServer(req, res) {
    if (req.method === 'GET') { 
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(form)
    }
    if (req.method ==='POST') {
        req.on('data', (data) => {
            htmlCode += data
        }).on('end', () => {
            //Getting the info as an object
            let info = new URLSearchParams(htmlCode);
            console.log('Printing info object');
            console.log(info);

            // getting the info as JSON object with Object.fromEntries
            let infoJSON = Object.fromEntries(info);
            console.log('Turning the info to JSON w≤ith object from entries');
            console.log(infoJSON);
            console.log(infoJSON.name);
            
            // Display the keys
            console.log('Getting the keys from info');
            for (var key of info.keys()) {
                console.log(key);
            }
            // Display the values
            let template = `The data as the string are ${info.get("name")} y el apellido es ${info.get("lastname")}`;
            console.log(`The data as the string are ${htmlCode}`);
            
            //Display data as JSON with a function and util.inspect
            console.log('JSON with a replace function and with util help');
        let infoJSON2 = JSON.parse(
          '{"' +
            decodeURI(htmlCode)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
    
            console.log(`The data as the JSON are ${util.inspect(infoJSON2)}`);
        res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(template);
        })
    }
}

http.createServer(webServer).listen(8081)
