export function createSaleOption(option) {
  const { xAxis, series } = option
  // 算法
  return {
    title: {
      text: '千锋学员入学数据',
    },
    tooltip: {},
    legend: {
      data: ['销量额']
    },
    xAxis: {
      data: xAxis
    },
    yAxis: {},
    series: [
      {
        name: '学科',
        type: 'bar',
        areaStyle: {
          color: 'red'
        },
        data: series
      }
    ]
  }
}
