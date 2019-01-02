const commonjs = require('rollup-plugin-commonjs');
const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');

const selfId = path.resolve(__dirname, 'src/iife-self-placeholder.js');

module.exports = {
  input: 'src/index.ts',
  external: [
    selfId,
    '@xg-wang/whatwg-fetch',
    'fake-xml-http-request',
    'route-recognizer',
  ],
  output: [
    {
      name: 'Pretender',
      file: 'dist/pretender.js',
      format: 'iife',
      globals: {
        [selfId]: 'self',
        '@xg-wang/whatwg-fetch': 'FakeFetch',
        'fake-xml-http-request': 'FakeXMLHttpRequest',
        'route-recognizer': 'RouteRecognizer',
      },
      banner: '/* exported Pretender */\n' +
              'var FakeFetch = self.WHATWGFetch;\n' +
              'var FakeXMLHttpRequest = self.FakeXMLHttpRequest;\n' +
              'var RouteRecognizer = self.RouteRecognizer;\n',
    },
    {
      file: 'src/pretender.es.js',
      format: 'es'
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    typescript()
  ],
};
