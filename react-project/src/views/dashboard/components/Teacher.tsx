import React, { useEffect, useState } from 'react'

import { Input, Button } from 'antd'

console.log('-----bmap gl', BMapGL)
import mapStyle from '../map.json'

let map = null

export default () => {
  const [addr, setAddr] = useState<string>('')
  const [point, setPoint] = useState<any>({})

  useEffect(()=>{
    map = new BMapGL.Map("map")
    const point = new BMapGL.Point(113.84447066976817, 22.631688743333292)
    // map.centerAndZoom('深圳市宝安区西部硅谷千锋教育', 20)
    map.centerAndZoom(point, 18)
    // 设置自定义的地图样式（图层、配色）
    map.setMapStyleV2({
      // styleId: '5b270fd7b276169c6256b34f97ac22ab'
      styleJson: mapStyle
    })
    map.enableScrollWheelZoom(true)
    map.addControl(new BMapGL.ZoomControl())
    map.addControl(new BMapGL.CityListControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMapGL.Size(10, 5)
    }))
  }, [])

  useEffect(()=>{
    map?.addEventListener('click', (e)=>{
      console.log('map click', e.latlng)
    })
  }, [])

  useEffect(()=>{
    var myIcon = new BMapGL.Icon("/logo.png", new BMapGL.Size(50,50));
    // 创建Marker标注，使用小车图标
    var pt = new BMapGL.Point(113.84447066976817, 22.631688743333292);
    var marker = new BMapGL.Marker(pt, {
        icon: myIcon
    });
    // 将标注添加到地图
    map.addOverlay(marker)
  }, [])

  const search = () => {
    //创建地址解析器实例
    var myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(addr, function(point){
      console.log('----point', point)
        if(point){
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMapGL.Marker(point, {title:addr}))
          myGeo.getLocation(point, function(gr){
            if (gr) {
              setPoint({...point, address:gr.address})
            }
          })
        }else{
          alert('您选择的地址没有解析到结果！');
        }
    }, '深圳')
  }


  return (
    <div className='qf-teacher'>
      <div id='map'></div>
      <div className='search'>
        <Input value={addr} onChange={e=>setAddr(e.target.value)} />
        <Button type='primary' onClick={search}>搜索</Button>
      </div>
      <div className='result'>
        <Input value={point.lat} disabled />
        <Input value={point.lng} disabled />
        <Input value={point.address} disabled />
        <Button type='primary'>提交</Button>
      </div>
    </div>
  )
}
