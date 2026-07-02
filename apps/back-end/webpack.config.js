const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      // Externalize runtime deps (emit a dist/package.json) instead of bundling
      // them. Native modules (bcrypt) and dynamic-require ones (typeorm,
      // OpenTelemetry auto-instrumentations) don't survive webpack bundling.
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
