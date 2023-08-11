const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

async function readFolder (folder) {
  let files = []
  try {
    const stats = await fs.stat(folder)
    if (stats.isDirectory(folder)) {
      files = await fs.readdir(folder)
    } else {
      console.error(pc.red('No es un directorio'))
    }
  } catch (err) {
    console.log('No se ha podido leer el directorio')
    process.exit(1)
  }
  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch (err) {
      console.error(pc.red('No es un directorio'))
    }
    const fileType = stats.isDirectory() ? '📂' : '🃏'
    const fileSize = stats.size
    const modified = stats.mtime.toLocaleDateString()
    const colorString = fileSize > 100 ? pc.red : pc.green
    return `${fileType} ${pc.bgBlue(file.padEnd(20))} ${colorString(fileSize.toString().padStart(20))} ${pc.yellow(modified.padStart(10))}`
  })

  const filesData = await Promise.all(filePromises)

  return filesData
}

const folder = process.argv[2] || './'
if (folder === './') {
  console.log('No se ha especificado un directorio, se listará el directorio actual')
}

readFolder(folder).then((files) => {
  console.log(pc.bold('📁 Nombre'.padEnd(20)) + pc.bold('Tamaño'.padStart(10)) + pc.bold('Modificado 📅'.padStart(20)))
  files.forEach((file) => {
    console.log(pc.bold(file))
  })
}).catch((err) => {
  console.log(err)
})
