const path = require('path')

exports.external = ['vue']
console.log(path.resolve(__dirname, '../src'), '3333')
exports.alias = {
  '@src': '../src'
}