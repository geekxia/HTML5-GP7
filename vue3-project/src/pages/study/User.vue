<template>
  <h1>学习组合API</h1>
  商品数量:<input type="text" v-model.number='num' /><br>
  商品单价:<input type="text" v-model.number='price' /><br>
  总价: <input type="text" v-model.number='total' />
  <hr>

  <h1 v-text='count'></h1>
  <button @click='stop'>关闭所有watchEffect</button>

</template>

<script>
import { computed, ref, watchEffect, watchPostEffect, watchSyncEffect, watch, onMounted, onBeforeUpdate, onRenderTracked } from 'vue'
import { useTestWatch } from './compositions'
export default {
  setup(props, ctx) {
    let num = ref(0)
    let price = ref(0)
    // const total = computed(()=>num.value*price.value)
    const total = computed({
      get() {
        return num.value*price.value
      },
      set(val) {
        num.value = val / price.value
      }
    })

    const [count, stop] = useTestWatch()

    // const stop4 = watch(total, (newT, oldT)=>console.log('total', newT, oldT))
    // const stop4 = watch([num,price], ([newN,newP],[oldN,oldP])=>{
    //   console.log('new', newN, newP)
    //   console.log('old', oldN, oldP)
    // })
    const stop4 = watch(
      ()=>num.value,
      (newN,oldN)=>{
        console.log('watch num', newN, oldN)
      }
    )

    onMounted(()=>document.title='GP7')
    onBeforeUpdate(()=>console.log('diff will start'))

    return {
      num,
      price,
      total,
      count,
      stop
    }
  },
  // computed: {
  //   total() {
  //     return this.num * this.price
  //   }
  // },
}
</script>

<style lang="css" scoped>
</style>
