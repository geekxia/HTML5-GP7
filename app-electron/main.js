// 主线程：主要用于创建electron窗口
// main.js是Electron应用的入口文件
// 语法：只能使用CommonJS语法

const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win = null

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 在这里关联渲染线程
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if (isDev) {
    // 临时解决方案：当vue项目启动成功时，再加载vue项目
    setTimeout(()=>{
      win.loadURL('http://localhost:8080')
      // 支持打开控制台调试
      win.webContents.openDevTools()
    }, 5000)
  } else {
    win.loadFile('dist/index.html')
  }
  return win
  // 如果启动的是Electron的本地环境，我们加载localhost:8080
  // 如果在生产环境下，我们加载dist/index.html

}

app.whenReady().then(() => {
  // 第一次创建窗口
  win = createWindow()
  app.on('activate', () => {
    console.log('---act start')
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('vue', function(ev, arg){
  console.log('ev', arg)
  // 当vue项目在渲染线程中编译成功时，再创建electron窗口
  if (isDev) {
    win.loadURL('http://localhost:8080')
    console.log('------', isDev)
    // 支持打开控制台调试
    win.webContents.openDevTools()
  }
})
