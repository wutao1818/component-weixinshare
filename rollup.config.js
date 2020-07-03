import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: path.resolve(__dirname, './lib', 'index.js'),
    format: 'cjs',
  },
  external: ['weixin-js-sdk','axios'],
  plugins: [
    babel({
      runtimeHelpers: true,
      sourceMap: false,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    json(),
    resolve(),
    commonjs() 
  ]
};