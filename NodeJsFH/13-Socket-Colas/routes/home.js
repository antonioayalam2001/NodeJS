const {Router} = require('express')
const router = Router()
router.post('/', (req, res) => {
      console.log(req.body.garnacha)
      res.json({
            msg: "Status ok"
      })
})

module.exports = router