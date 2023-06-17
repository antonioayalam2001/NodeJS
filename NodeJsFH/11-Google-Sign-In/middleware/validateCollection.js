const validateCollections = (params) => {
      return (req, res, next) => {
            if (!params.includes(req.params.collection)){
                  return res.status(400).json({msg : `The given collection is not allowed in here`})
            }
            next()
      }
}
module.exports = {
      validateCollections
}