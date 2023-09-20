const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction, 'isProduction');
// 项目根目录路径
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const dotenvFiles = [
  `${resolveApp('.env')}.${process.env.NODE_ENV}.local`,
  process.env.NODE_ENV !== 'test' && `${resolveApp('.env')}.local`,
  `${resolveApp('.env')}.${process.env.NODE_ENV}`,
  resolveApp('.env')
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand.expand(
      dotenv.config({
        path: dotenvFile
      })
    );
  }
});

exports.appDirectory = appDirectory;
exports.resolveApp = resolveApp;
exports.isProduction = isProduction;
