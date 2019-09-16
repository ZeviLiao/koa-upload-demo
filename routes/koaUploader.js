
const router = require('koa-router')();
const multer = require('koa-multer')


let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/upload') //配置图片上传的目录
  },
  filename: function(req, file, cb) {
    /*图片上传完成重命名*/
    var fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

let upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename, //返回文件名
    body: ctx.req.body
  }
})

module.exports = router
