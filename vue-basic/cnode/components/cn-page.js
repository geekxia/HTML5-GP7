Vue.component('cn-page', {
  template: `
  <div class='pages'>
    <span @click='prev'><<</span>
    <span v-if='value>3'>...</span>
    <span
      v-for='i in pages'
      v-text='i'
      :class='{"on":i===value}'
      @click='$emit("input", i)'
    >
    </span>
    <span>...</span>
    <span @click='$emit("input", value+1)'>>></span>
  </div>
  `,
  props: {
    value: { type: Number, default: 1 }
  },
  computed: {
    pages() {
      // 1  1 2 3 4 5 ...
      // 2  1 2 3 4 5 ...
      // 3  1 2 3 4 5 ...
      // 4  ... 2 3 4 5 6 ...
      // n  ... n-2 n-1 n n+1 n+2 ...
      const v = this.value
      return v<=3 ? [1,2,3,4,5] : [v-2,v-1,v,v+1,v+2]
    }
  },
  methods: {
    prev(){
      if (this.value===1) alert('已经是第一页了')
      else this.$emit('input', this.value-1)
    }
  }
})
