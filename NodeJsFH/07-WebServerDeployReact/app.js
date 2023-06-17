require('dotenv').config()
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//Handlebars
app.use(express.static('public'))
    .get('*', (req, res) => {
          res.sendFile(__dirname + '/public/index.html')
    })
app.listen(PORT, () => {
      console.log('Server running on PORT : ', PORT);
})