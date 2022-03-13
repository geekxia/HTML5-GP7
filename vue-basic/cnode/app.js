const app = new Vue({
  el: '#app',
  data: {
    list: [],
    cates: [
      { id: 1, tab: '', label: '全部' },
      { id: 2, tab: 'good', label: '精华' },
      { id: 3, tab: 'share', label: '分享' },
      { id: 4, tab: 'ask', label: '问答' },
      { id: 5, tab: 'job', label: '招聘' }
    ],
    tab: '',
    page: 1
  },
  computed: {
    newList() {
      const result = []
      this.list.forEach(ele1=>{
        const cate = this.cates.find(ele2=>ele2.tab===ele1.tab)
        ele1['label'] = ele1.top ? '置顶' : ( ele1.good ? '精华' : (cate?.label||'问答'))
        ele1['first'] = this.tab===''
        result.push(ele1)
      })
      return result
    }
  },
  watch: {
    tab() { this.page=1; this.getList() },
    page() { this.getList() }
  },
  created() { this.getList() },
  methods: {
    getList() {
      const params = {
        tab: this.tab,
        limit: 5,
        page: this.page,
        mdrender: true
      }
      fetch('/topics', 'GET', params).then(res=>{
        console.log('文章列表', res)
        this.list = res
      })
    }
  }
})
