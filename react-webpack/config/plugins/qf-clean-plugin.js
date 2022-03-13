const del = require('del')
const path = require('path')



class QfCleanPlugin {
  // new QfCleanPlugin()
  constructor() {
    this.apply = this.apply.bind(this)
  }
  // 在webpack编译过程中调用apply方法，向webpack的hooks钩子上“挂载”处理函数
  apply(compiler) {
    const hooks = compiler.hooks
    hooks.emit.tap('qf-clean-plugin', () => {
      try {
        // 使用第三方包del来执行删除
        const deleted = del.sync(['**/*'], {
          force: false,
          cwd: path.resolve(__dirname, '../../dist')
        })
      } catch (error) {
        console.error('qf-clean-plugin删除文件报错')
        throw error
      }
    })
    hooks.done.tap('qf-clean-plugin', ()=>{
      console.log('-------------', 'qf-clean-plugin done')
    })
  }
}

module.exports = QfCleanPlugin
