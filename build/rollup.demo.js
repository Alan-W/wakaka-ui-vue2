const path = require('path')
const html = require('@rollup/plugin-html')
const serve = require('rollup-plugin-serve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue2')
const url = require('@rollup/plugin-url')
const replace = require('@rollup/plugin-replace')
const alias = require('@rollup/plugin-alias')
const liveload = require('rollup-plugin-livereload')
const postcss = require('rollup-plugin-postcss')

module.exports = {
  input: path.resolve('./examples', 'main.js'),
  output: {
    file: path.resolve('./examples', './bundle.js'),
    name: 'bundle.js',
    format: 'umd'
  },
  watch: {
    exclude: 'node_modules/**',
  },
  // external: ['vue'],
  plugins: [
    resolve.default(),
    commonjs(),
    liveload(),
    postcss({
      extract: path.resolve(__dirname, '../examples/bundle.css'),
    }),
    alias({
      entries: [
        {
          find: 'main', replacement: path.resolve(__dirname, '../src')
        }
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      preventAssignment: true,
    }),
    babel.babel(),
    html({
      attributes: { html: { lang: 'en' } },
      fileName: 'index.html',
      meta: [{ charset: 'utf-8' }],
      publicPath: '',
      title: '哇咔咔',
      template: ({ attributes, title, files = {}, publicPath, meta }) => {
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            const attrs = html.makeHtmlAttributes(attributes.script);
            return `<script src="${publicPath}${fileName}"${attrs}></script>`;
          })
          .join('\n');

        const links = (files.css || [])
          .map(({ fileName }) => {
            const attrs = html.makeHtmlAttributes(attributes.link);
            return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
          })
          .join('\n');
        const metas = meta
          .map((input) => {
            const attrs = html.makeHtmlAttributes(input);
            return `<meta${attrs}>`;
          })
          .join('\n');
        return `
          <!doctype html>
          <html${html.makeHtmlAttributes(attributes.html)}>
            <head>
              ${metas}
              <title>${title}</title>
              ${links}
            </head>
            <body>
              <div id="app"></div>
              ${scripts}
            </body>
          </html>`;
      }
    }),
    vue({
      compileTemplate: true,
    }),
    url({
      publicPath: path.resolve(__dirname, './examples'),
    }),
    serve({
      open: true,
      openPage: '/examples/index.html',
    })
  ]
}