const fs = require('node:fs')

const stats = fs.statSync('./fileSystem.js')
console.log({
  size: stats.size,
  birthtime: stats.birthtime,
  modified: stats.mtime,
  isFile: stats.isFile(),
  isDirectory: stats.isDirectory()
})
