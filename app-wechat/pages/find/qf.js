// 学员列表
// { id: 7, classId: 3, pid: 1, name: '张三', no: '2389293' }

module.exports = [
  {
      id:1,
      label:'HTML5',
      value:'HTML5',
      children: [
        {
          id:3,pid:1,label:'2101班',value:'2101',
          children: [
            { id: 7, pid:3, label:'张三', value:'2101000001' },
            { id: 8, pid:3, label:'张四', value:'2101000002' },
          ]
        },
        {
          id:4,pid:1,label:'2102班',value:'2102',
          children: [
            { id: 9, pid:4, label:'张五', value:'2101000003' },
            { id: 10, pid:4, label:'张六', value:'2101000003' },
          ]
        },
      ]
    },
  {
    id:2,label:'Java',value:'Java',
    children: [
      {
        id:5,pid:2,label:'2103班',value:'2103',
        children: [
          { id: 11, pid:5, label:'李三', value:'2101000003' },
          { id: 12, pid:5, label:'李四', value:'2101000003' },
        ]
      },
      {
        id:6,pid:2,label:'2104班',value:'2104',
        children: [
          { id: 13, pid:6, label:'李五', value:'2101000003' },
          { id: 14, pid:6, label:'李六', value:'2101000003' }
        ]
      },
    ]
  }
]
