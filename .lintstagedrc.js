const path = require('path');

module.exports = {
  '*.ts': absolutePaths => {
    const cwd = process.cwd();
    const relativePaths = absolutePaths.map(file => path.relative(cwd, file));
    return [
      `prettier --write --config .prettierrc ${relativePaths.join(' ')}`,
      `npx eslint -c .eslintrc.json ${relativePaths.join(' ')} --fix`,
    ];
  },
};
