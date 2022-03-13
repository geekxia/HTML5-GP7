var QQMapWX = require('./qqmap.js')

var qqmap = new QQMapWX({
    key: 'AHNBZ-OIZCD-WEK4D-HATSH-FK526-ZXFSD'
})

// 计算距离
const calDis = (pos, list) => {
  var _this = this;
    //调用距离计算接口
    return new Promise(resolve=>{
      qqmap.calculateDistance({
        mode: 'driving',
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: pos,
        to: list,
        success: function(res) {//成功后的回调
          console.log(res);
          var res = res.result
          console.log('距离计算成功', res)
          const result = list.map((ele,idx)=>(
            {...ele, distance: res.elements[idx].distance}
          ))
          resolve(result)
        }
      })
    })
}

const search = (text) => {
  return new Promise(resolve=>{
    qqmap.search({
        keyword: text,  //搜索关键词
        success: function (res) { //搜索成功后的回调
          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/assets/marker.png", //图标路径
              width: 20,
              height: 20
            })
          }
          resolve(mks)
        }
    })
  })
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


function initRange(data,firstId,twoId) {
  let arr1 = []
  let arr2 = []
  let arr3 = []
  data.forEach(ele1=>{
    arr1.push({id:ele1.id,label:ele1.label,value:ele1.value})
    if (firstId===ele1.id) {
      ele1.children.forEach(ele2=>{
        arr2.push({id:ele2.id,label:ele2.label,value:ele2.value})
        const r = ele1.children.find(e=>e.id===twoId) || ele1.children[0]
        console.log('-rrr', r)
        r.children.forEach(ele3=>{
          arr3.push({id:ele3.id,label:ele3.label,value:ele3.value})
        })
      })
    }
  })
  return {
    firstId,
    twoId,
    range: [arr1,arr2,arr3]
  }
}


module.exports = {
  formatTime,
  calDis,
  search,
  initRange
}
