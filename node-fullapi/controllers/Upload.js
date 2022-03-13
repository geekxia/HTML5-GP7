const fs = require('fs')
const path = require('path')

class Upload {
  // 图片上传
  static async imgUpload (ctx) {
    // 接收前端传递过来的文件数据
    const img = ctx.request.files.img  // {name, path}
    // 使用fs模块把文件数据流写入到CDN服务器
    const readStream = fs.createReadStream(img.path)

    const cdn = path.resolve(__dirname, '../public/cdn')
    const name = `/${Date.now()}-${img.name}`
    console.log('cdn', cdn + name)
    const writeStream = fs.createWriteStream(cdn+name)

    // 把临时路径中的图片数据写入到CDN中
    await readStream.pipe(writeStream)
    // 把写入成功的CDN图片的访问路径返回前端
    ctx.body = { err: 0, msg: 'success', data: { img: '/cdn'+name } }
  }
}

module.exports = Upload
