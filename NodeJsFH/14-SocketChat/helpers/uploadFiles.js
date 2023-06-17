const {v4: uuidv4} = require("uuid");
const path = require("path");

//File must be sended as : file

//@uploadFiles

 // @param : files : Files uploaded by te user
 // @param : array [] : Supported file type extensions
 // @param : string : Name of the folder to storage the file
const uploadFiles = (files, extensiones = ['png', 'jpg', 'jpeg', 'txt'], folder = "") => {
      return new Promise((resolve, reject) => {

            const {file} = files;
            //Getting the file extension so we can delimitate which one we want to accept
            // const extension = file.name.split('.').at(-1)
            const splitName = file.name.split('.');
            const extension = splitName[splitName.length - 1];

            if (!extension.includes(extension)) {
                  return reject(`Extension type ${extension} is nos supported by the application`)
            }

            const tempName = uuidv4() + '.' + extension;
            const uploadPath = path.join(__dirname, "../uploads/", folder,  tempName);

            file.mv(uploadPath, function (err) {
                  if (err)
                        return reject('The folder specified is not defined')
                  resolve(`${uploadPath.split('\\').at(-1)}`)
            });
      })
}

module.exports = {
      uploadFiles
}