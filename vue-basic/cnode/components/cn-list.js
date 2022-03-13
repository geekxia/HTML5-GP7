Vue.component('cn-list', {
  template: `
  <div class='article-list'>
    <div class='article' v-for='row in list'>
      <img :src='row.author.avatar_url' />
      <div class='num'>
        <span v-text='row.reply_count'></span>
        <span>/</span>
        <span v-text='row.visit_count'></span>
      </div>
      <span
        v-if='(row.top || row.good || row.first)'
        v-text='row.label'
        :class='{
          label: true,
          on: (row.top || row.good)
        }'>
      </span>
      <span class='title' v-text='row.title'>一行文章</span>
      <span class='time' v-cloak>{{row.last_reply_at | time}}</span>
    </div>
  </div>
  `,
  props: {
    list: { type: Array, default: [] }
  },
  updated() { console.log('---list', this.list) },
  // 局部过滤器
  filters: {
    time(val){
      const s = (Date.now()-Date.parse(val))/1000
      return (
        s/60 < 1
          ? Math.floor(s)+' 秒前'
          : s/60/60 < 1
            ? Math.floor(s/60)+' 分钟前'
            : s/60/60/24 < 1
              ? Math.floor(s/60/60)+' 小时前'
              : s/60/60/24/30 < 1
                ? Math.floor(s/60/60/24)+' 天前'
                : s/60/60/24/30/12 < 1
                  ? Math.floor(s/60/60/24/30)+' 月前'
                  : Math.floor(s/60/60/24/30/12)+' 年前'
      )
    }
  }
})

// "2021-10-21T06:46:10.930Z"
// 1、把它变成时间戳（昨天中午12点）
// 2、此时的时间戳 - 1  = s
// 3、(s/1000)/60 < 1
//   ? 秒前
//   : ((s/1000)/60)/60 < 1
//     ? 分钟前
//     : ((s/1000)/60)/60/24 < 1
//       ? 小时前
//       : ((s/1000)/60)/60/24/30 < 1
//         ? 天前
//         : ((s/1000)/60)/60/24/30/12 < 1
//           ? 月前
//           : 年前
// 几秒前、几分钟前、几小时。。。。
