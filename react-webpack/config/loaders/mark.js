// 所有的webpack loader都是一个函数
// 工作流程：加载一种源文件（对象、字符串），经过复杂处理，最终返回另外一种文件（对象、字符串、js代码）
// 注意：如果一个loader用于webpack某种规则的最后一个loader，必须返回【js代码】

const marked = require('marked')

function markLoader(source) {
  const html = marked.parse(source)

  // console.log('html', html)
  // return html
  // return `export default ${JSON.stringify(html)}`
  return `module.exports = ${JSON.stringify(html)}`
}

module.exports = markLoader
