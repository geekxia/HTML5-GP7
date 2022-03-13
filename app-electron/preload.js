// 渲染线程（html+css+javascript）
const { ipcRenderer } = require('electron')
// 提问：当本地服务启动时，向主线程只发送一次信息？？？
// console.log(ipcRenderer.sendSync('vue', 'ping'))


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
