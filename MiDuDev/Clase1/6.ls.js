const fs = require('fs').promises;

fs.readdir('./')
    .then((files) => { 
        console.log(files);
    });

