#!/usr/bin/env node
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const sharedConfig = {
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  sourcemap: true,
  bundle: true,
  external: ['history', 'react'],
  target: ['node12'],
};

const indexContent = `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./yarr.cjs.production.min.js')
} else {
  module.exports = require('./yarr.cjs.development.js')
}
`;

const main = () => {
  // First write the contents of the cjs index file.
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/cjs', 'index.js'),
    indexContent
  );

  esbuild.buildSync({
    ...sharedConfig,
    outfile: './dist/cjs/yarr.cjs.production.min.js',
    minify: true,
  });

  esbuild.buildSync({
    ...sharedConfig,
    outfile: './dist/cjs/yarr.cjs.development.js',
  });

  process.exit(0);
};

main();
