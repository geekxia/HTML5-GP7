<template>
  <div class='pages'>
    <span @click='prev'>&lt;&lt;</span>
    <span v-if='page>3'>...</span>
    <span
      v-for='i in pages'
      v-text='i'
      :class='{"on":i===page}'
      @click='emit("update:page", i)'
    >
    </span>
    <span>...</span>
    <span @click='emit("update:page", page+1)'>>></span>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, computed, toRefs } from 'vue'
  let props = defineProps({
    page: { type: Number, default: 1 }
  })
  const { page } = toRefs(props)
  const emit = defineEmits(['update:page'])
  const pages = computed(()=>{
    // 1  1 2 3 4 5 ...
    // 2  1 2 3 4 5 ...
    // 3  1 2 3 4 5 ...
    // 4  ... 2 3 4 5 6 ...
    // n  ... n-2 n-1 n n+1 n+2 ...
    const v = page.value
    return v<=3 ? [1,2,3,4,5] : [v-2,v-1,v,v+1,v+2]
  })
  const prev = () => {
    if (page.value===1) alert('已经是第一页了')
    else emit('update:page', page.value-1)
  }

</script>

<style lang="css" scoped>
</style>
