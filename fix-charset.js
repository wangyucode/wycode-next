const fs = require('fs');
const path = require('path');

// 定义out目录路径
const outDir = path.join(__dirname, 'out');

// 递归遍历目录，处理所有html文件
function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const fullPath = path.join(dir, file.name);

        if (file.isDirectory()) {
            // 如果是目录，递归处理
            processHtmlFiles(fullPath);
        } else if (file.isFile() && file.name.endsWith('.html')) {
            // 如果是html文件，处理charset
            processHtmlFile(fullPath);
        }
    }
}

// 处理单个html文件，将charSet改为charset
function processHtmlFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const oldCharset = '<meta charSet="utf-8"/>';
        const newCharset = '<meta charset="utf-8"/>';

        if (content.includes(oldCharset)) {
            content = content.replaceAll(oldCharset, newCharset);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed charset in ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// 执行处理
console.log('Processing html files in out directory...');
processHtmlFiles(outDir);
console.log('Charset fix completed.');
