const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));

// 模板文件内容
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${argv.name}</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="app"></div>
    <script type="module" src="index.js"></script>
</body>

</html>
`
const cssTemplate = `
/**
 * author: lvdengming@foxmail.com
 * date: ${new Date().toISOString().slice(0, 10)}
 */


`
const jsTemplate = cssTemplate;

const root = path.resolve(__dirname, '..');
const pagesPath = path.join(root, 'src/pages');
// 获取目录数量
const excludes = ['.DS_Store'];
const count = fs.readdirSync(pagesPath).filter(name => !excludes.includes(name)).length;

// 创建目录
const dirName = `${count+1}_${argv.name}`;
const dirPath = path.join(pagesPath, dirName);
fs.mkdirSync(dirPath);
console.log(chalk.green(`\n> The following directories are created successfully.`));
console.log(dirPath);

// 创建文件
fs.writeFileSync(path.join(dirPath, 'index.html'), htmlTemplate);
fs.writeFileSync(path.join(dirPath, 'index.js'), jsTemplate);
fs.writeFileSync(path.join(dirPath, 'style.css'), cssTemplate);
console.log(chalk.green(`\n> The following files are created successfully.`));
console.log(path.join(dirPath, 'index.html'));
console.log(path.join(dirPath, 'index.js'));
console.log(path.join(dirPath, 'style.css'));

// 格式化文件
const commands = [`pnpm exec prettier --write ${path.join(dirPath)}/*`];
for (const command of commands) {
    console.log(chalk.green(`\n> Run Command: ${command}`));
    execSync(command, { stdio: [0, 1, 2], cwd: root });
}
