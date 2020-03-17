import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import url from 'postcss-url';
import { terser } from 'rollup-plugin-terser';

const formats = [
  {
    format: 'es',
    input: 'js/main-module.js',
    dynamicImportFunction: '__import__',
  }, {
    format: 'iife',
    input: 'js/main-nomodule.js',
    inlineDynamicImports: true,
  }
];

export default formats.map((format) => ({
  input: [
    format.input,
  ],
  output: {
    dir: `js/${format.format}`,
    format: format.format,
    entryFileNames: `[name].js`,
    chunkFileNames: `chunk_[name].js`,
    dynamicImportFunction: format.dynamicImportFunction,
    sourcemap: false,
  },
  inlineDynamicImports: format.inlineDynamicImports,
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    babel({
      envName: format.format,
      exclude: 'node_modules/**',
    }),
    postcss({
      plugins: [
        url({
          url: 'inline',
        }),
      ],
    }),
    terser(),
  ],
}));
