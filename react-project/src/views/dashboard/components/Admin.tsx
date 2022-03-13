import React, { useEffect, useRef, useState } from 'react'

import { Chart, LineAdvance} from 'bizcharts'

import { useAppDispatch } from '@/hooks'
import { getChartData } from '@/store/reducers/user'
import { createSaleOption } from './charts'

export default () => {
  const cRef = useRef(null)
  const dispatch = useAppDispatch()
  const [sales, setSales] = useState<any>([])
  const [tempers, setTempers] = useState<any>([])

  useEffect(()=>{
    dispatch(getChartData()).then(res=>{
      console.log('图表数据', res.payload.sales)
      if (res.payload) {
        setSales(res.payload.sales)
        setTempers(res.payload.tempers)
      }
    })
  }, [])

  useEffect(()=>{
    // var myChart = echarts.init(document.getElementById('main'))
    if (sales.length > 0) {
      let series = []
      let xAxis = []
      sales.forEach(ele=>{
        xAxis.push(ele.subject)
        series.push(ele.count)
      })
      const option = createSaleOption({
        series,
        xAxis
      })
      var myChart = echarts.init(cRef.current)
      myChart.setOption(option)
    }
  }, [sales])

  return (
    <div>
      <h1>管理员的工作台</h1>
      <div id='main' ref={cRef} style={{width:'500px',height:'300px'}}></div>

      <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={tempers} >
    		<LineAdvance
    			shape="smooth"
    			point
    			area
    			position="month*temperature"
    			color="city"
    		/>
    	</Chart>
    </div>
  )
}
