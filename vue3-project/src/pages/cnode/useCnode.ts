import { watchEffect, computed, ref, watch } from 'vue'
import { useDispatch, useSelector } from '@/hooks'

export function useCnode() {
  let tab = ref('')
  let page = ref(1)

  const dispatch = useDispatch()
  const list = useSelector(state=>state.cnode.list)
  const cates = useSelector(state=>state.cnode.cates)

  // console.log('page list', list)

  const newList = computed(()=>{
    const result = []
    list.value.forEach(ele1=>{
      const cate = cates.value.find(ele2=>ele2.tab===ele1.tab)
      ele1['label'] = ele1.top ? '置顶' : ( ele1.good ? '精华' : (cate?.label||'问答'))
      ele1['first'] = tab.value===''
      result.push(ele1)
    })
    return result
  })
  // console.log('newList', newList)

  watchEffect(()=>{
    dispatch('cnode/getList',{tab:tab.value,limit:5,page:page.value})
  })
  // 当品类发生变化时，页码重置为第一页
  watch(tab, ()=>page.value=1)

  return [tab, page, newList]
}
