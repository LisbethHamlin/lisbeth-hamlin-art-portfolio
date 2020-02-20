import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import url from 'postcss-url';
import { terser } from 'rollup-plugin-terser';

const formats = [
  'es',
  'system',
];

const config = formats.map((format) => ({
  input: [
    'js/common.js',
    'js/art-shows.js',
    'js/photo-gallery',
  ],
  output: {
    dir: `js/${format}`,
    format,
    entryFileNames: `[name].js`,
    chunkFileNames: `[name].js`,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    babel({
      envName: format,
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

export default [
  ...config,
  {
    input: 'js/system-runtime',
    output: {
      file: 'js/system/runtime.js',
      format: 'iife',
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      terser(),
    ]
  }
]
