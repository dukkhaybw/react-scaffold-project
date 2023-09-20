let postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      autoprefixer: { grid: true }
    })
  ]
};
