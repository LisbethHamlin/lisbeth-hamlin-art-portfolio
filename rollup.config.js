import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'js/app.ts',
  output: {
    dir: `js/bundle`,
    format: 'systemjs',
    entryFileNames: `[name].js`,
    chunkFileNames: `chunk-[name]-[hash].js`,
    sourcemap: true,
  },
  context: 'window',
  preserveEntrySignatures: false,
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    typescript({
      clean: true,
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
};
