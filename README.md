## VOYAGE

一个简单的 psd to html 项目，使用 gulp 实现简单的工程化任务。

### 目录说明

- css
 - main.css：主 css 文件
 - vendor：css 库
- dist：构建目标目录
- fonts：字体目录
- img：图片目录
- js
 - main.js：主 js 文件
 - vendor：js 库
 - plugins.js：js 插件文件
- node_modules：各种 gulp 插件
- psd：存放了原始 psd
- editorconfig：编辑器配置
- .gitignore：git 忽略配置
- gulpfile.js：gulp 配置
- index.html：首页
- package.json：node 相关配置

### 运行

```
git clone https://github.com/xxn520/VOYAGE.git

npm install

gulp
```

### TODO

- [x] 提高兼容性，兼容 IE 8+
- [x] 加入 sass 或 less 等预处理器（最后选了 Stylus）
