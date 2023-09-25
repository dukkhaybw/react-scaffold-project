const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      autoprefixer: { grid: true }
    })
  ]
};
