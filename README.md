# HTML2Image demo
  使用html2canvas将html转换成canvas, 并将图片进行base64编码，上传至Azure Blob Storage.

# 文件目录
  - index.js 在此文件中编辑js代码，通过browserify对其进行转译成浏览器环境运行的代码。
  - index.html Demo的H5页面。
  - bundle.js browserify将index.js转译后的文件

# 编辑运行
  - 安装browserify:  npm i -g browserify
  - 运行：browserify index.js -o bundle.js
  