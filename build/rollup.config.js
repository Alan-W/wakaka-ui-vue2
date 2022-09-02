const path = require('path')
const babel = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const progress = require('rollup-plugin-progress')
const resolve = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue2')
// const eslint = require('@rollup/plugin-eslint')

const output = require('./output.config')
const config = require('../build/config')

module.exports = {
  input: path.resolve('./src', 'index.js'),
  output,
  external: ['vue'],
  plugins: [
   /*  eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: [path.resolve(__dirname, '../packages'), path.resolve(__dirname, '../src')]
    }), */
    resolve.default(),
    commonjs(),
    babel.babel({
    }),
    vue({
      compileTemplate: true,
    }),
    progress({
      clearLine: false
    }),
  ]
}