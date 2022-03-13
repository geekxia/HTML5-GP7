<template>

  <input type="text" v-model='task' />
  <button @click='confirm'>添加</button>
  <hr>
  <div v-for='item in list'>
    <span v-text='item.id'></span>
    :
    <span v-text='item.task'></span>
    :
    <span @click='remove(item)'>X</span>
  </div>
  <div>目前的任务数量: <span v-text='length'></span> </div>

  <hr>
  <h1 v-text='count'></h1>
  <button @click='setCount(-1)'>自减</button>
  <button @click='setCount(2)'>自增</button>
</template>

<script>
  import { ref, computed } from 'vue'

  function useTodo(arg1,arg2) {
    let task = ref(arg1)
    let list = ref(arg2)
    const confirm = () => {
      list.value.push({id:Date.now(),task:task.value})
      task.value = ''
    }
    const remove = (row) => {
      list.value = list.value.filter(ele=>ele.id!==row.id)
    }
    const length = computed(()=>{
      // do something
      return list.value.length
    })
    return { task, list, length, confirm, remove }
  }

  function useCount(arg) {
    let count = ref(arg)
    const setCount = step => {
      count.value += step
    }
    return [count, setCount]
  }
</script>

<script setup>
const { task, list, length, confirm, remove } = useTodo('',[])
const [count, setCount] = useCount(100)
</script>

<style lang="css" scoped>
</style>
