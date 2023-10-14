import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename).concat('/..')
// H:\Documentos\RepositoriosGitHub\NodeJS\MiDuDev
export const getFilePath = (filePath) => {
  return path.resolve(__dirname, filePath)
}
