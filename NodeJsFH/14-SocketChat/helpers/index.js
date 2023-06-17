const dbValidators = require('./dbValidators')
const googleVerify = require('./googleVerify')
const jsonWebTokenGenerator = require('./jsonWebTokenGenerator')
const uploadFiles = require('./uploadFiles')

module.exports = {
      ...dbValidators,
      ...googleVerify,
      ...jsonWebTokenGenerator,
      ...uploadFiles
}
