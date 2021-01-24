import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import { terser } from 'rollup-plugin-terser';

const dynamicImportPlugin = {
  name: 'dynamic-import-polyfill',
  renderDynamicImport() {
    return {
      left: '__import__(',
      right: ')'
    }
  }
};

const config = ({input, format}) => ({
  input,
  output: {
    dir: `js/bundle`,
    format,
    entryFileNames: `[name].js`,
    chunkFileNames: `chunk-[name]-[hash].js`,
    sourcemap: true,
    banner: `/*! build-date: ${new Date().toISOString()} */`,
  },
  context: 'window',
  preserveEntrySignatures: false,
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript(),
    dynamicImportPlugin,
    postcss({
      minimize: true,
      plugins: [
        url({
          url: 'inline',
        }),
      ],
    }),
    terser(),
  ],
});

export default [
  config({
    input: 'js/app.ts',
    format: 'esm',
  }),
];
