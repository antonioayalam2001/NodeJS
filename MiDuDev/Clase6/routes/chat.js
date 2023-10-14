import { Router } from 'express'
import { getFilePath } from '../util/fileUrl.js'

const router = Router()
router.get('/', (req, res) => {
  const htmlPath = getFilePath('public/index.html')
  res.sendFile(htmlPath)
})

router.get('/*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})
export default router
