var AzureStorage = require('azure-storage');
var streamifier = require('streamifier');

// 初始化Azure Storage Blob Service
var blobUri = 'https://storeapp.blob.core.chinacloudapi.cn';
var blobService = AzureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=storeapp;AccountKey=cwzlYfEC+rSZRmt2ywr4GqVKytXsMvh/a6bIgH2zzlYLu5BLa2fvqMw1fHHkrEEugUlLlhBmik+GRQG4TpUtpQ==;EndpointSuffix=core.chinacloudapi.cn");

// 创建容器
function createContainer(container, cb) {
  blobService.createContainerIfNotExists(container, {
    publicAccessLevel: 'blob'
  }, function (error, result, response) {
    if (!error) {
      if (result) {
        cb(null, "容器已经创建");
      } else {
        cb(null, "容器已存在");
      }
    } else {
      cb(error, "出现错误");
    }
  });
}

// 上传图片
function uploadImg(base64String, callback) {
  var blobName = new Date().getTime() + ".jpeg";
  base64String = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  // 剪切base64后面的buffer
  var buffer = Buffer.from(base64String[2], 'base64');
  var stream = streamifier.createReadStream(buffer);
  blobService.createBlockBlobFromText("test-upload-images", blobName, buffer, function (error, result, response) {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
}


// 程序主入口
$(function () {
  html2canvas($("#wrapper"), {
    allowTaint: true,
    useCORS: true
  }).then(function (canvas) {
    console.log("生成canvas");
    var imageData = canvas.toDataURL("image/jpeg");
    createContainer("test-upload-images", function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log("创建结果容器结果：", result);
        uploadImg(imageData, function (error, uploadResult) {
          console.log("上传文件结果", uploadResult);
        });
      }
    });
  });

})
