'use strict'
const express = require('express');
const app = express();
const PORT = 3000;
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
app
  // use nos sirve para añadir middleware
   .use(cookieParser())
   .use(cookieSession({
      name : 'session',
      secret: "mySecret"
   }))

   .get("/", (req, res) => {
      console.log(req.session);
      console.log(req.secret);
      let string = 'mySecret'
       if (string == req.secret){
           console.log('Mismo')
       }
      req.session.visitas || (req.session.visitas = 0);
      req.session.inicio || (req.session.inicio = 0);
      let n = req.session.visitas++ || 0;
      res.send(`<h1>Root Page, me has visitado ${n} veces</h1>`);
  })
   .get("/home", (req, res) => {
      // Podemos acceder a las variables de sesión
      res.send(`<h1>Root Page, me has visitado ${req.session.visitas} veces</h1>`);
      
  })
   .get("/reset", (req, res) => {
      // Podemos acceder a las variables de sesión
      req.session.visitas = 0;
      res.redirect('/')
  })
  .listen(PORT);
   

// // ./test.js
// var assert = require("assert")
//   , Keygrip = require("keygrip")
//   , keylist, keys, hash, index

// // but we're going to use our list.
// // (note that the 'new' operator is optional)
// keylist = ["Mora", "Mora", "Tunas"]
// keys = Keygrip(keylist)


// // .sign returns the hash for the first key
// // all hashes are SHA1 HMACs in url-safe base64
// hash = keys.sign("bieberschnitzel")
// console.log(hash);
// assert.ok(/^[\w\-]{27}$/.test(hash))

// // .index returns the index of the first matching key
// index = keys.index("bieberschnitzel", hash)
// console.log(index);
// assert.equal(index, 0)

// // .verify returns the a boolean indicating a matched key
// matched = keys.verify("bieberschnitzel", hash)
// assert.ok(matched)

// index = keys.index("bieberschnitzel", "o_O")
// assert.equal(index, -1)

// // rotate a new key in, and an old key out
// keylist.unshift("SEKRIT4")
// keylist.pop()

// // if index > 0, it's time to re-sign
// index = keys.index("bieberschnitzel", hash)
// assert.equal(index, 1)
// hash = keys.sign("bieberschnitzel")