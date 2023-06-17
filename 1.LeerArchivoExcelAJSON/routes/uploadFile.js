const {Router} = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'temp/' })
const { home , uploadFile } = require ( "../Controllers/uploadFileC" );

const router = Router();

router.get('/',home);
router.post('/', upload.single('file') ,uploadFile);

module.exports = router;