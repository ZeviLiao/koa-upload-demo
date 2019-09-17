const router = require('koa-router')()
const multer = require('koa-multer')
const send = require('koa-send')

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

router.post('/download/:name', async ctx => {
  const name = ctx.params.name
  const path = `public/upload/${name}`
  ctx.attachment(path)
  await send(ctx, path)
})

router.get('/download/:name', async ctx => {
  const name = ctx.params.name
  const path = `public/upload/${name}`
  ctx.attachment(path)
  await send(ctx, path)
})

module.exports = router
