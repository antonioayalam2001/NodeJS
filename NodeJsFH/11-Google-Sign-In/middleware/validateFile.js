const validateFile = (req,res,next) => {
      if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg: 'No files were uploaded.'});
      }
      next();
      return true;
}

module.exports = {
      validateFile
}