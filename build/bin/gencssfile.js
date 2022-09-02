// 生成 css 
const fs = require('fs');
const path = require('path');
let Components = require('../../components.json');
const themes = [
  'theme'
];
Components = Object.keys(Components);
const basepath = path.resolve(__dirname, '../../packages/');

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

themes.forEach((theme) => {
  const isScss = theme !== 'theme-default';
  let indexContent = isScss ? '@import "./base.scss";\n' : '@import "./base.css";\n';
  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
    const fileName = key + (isScss ? '.scss' : '.css');
    indexContent += '@import "./' + fileName + '";\n';
    const filePath = path.resolve(basepath, theme, './src', fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件');
    }
  });
  fs.writeFileSync(path.resolve(basepath, theme, './src', isScss ? 'index.scss' : 'index.css'), indexContent);
});