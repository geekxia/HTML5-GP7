<template>
  <div class='cates'>
    <span
      v-for='item in cates'
      v-text='item.label'
      :class='{"on": tab===item.tab}'
      @click='change(item.tab)'
    >
    </span>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import { useSelector } from '@/hooks'
defineProps({
  tab: { type: String, default: '' }
})
const emit = defineEmits(['update:tab'])
const cates = useSelector(state=>state.cnode.cates)
const change = (tab) => {
  console.log('---tab', tab)
  emit('update:tab', tab)
}
</script>

<style lang="css" scoped>
</style>
