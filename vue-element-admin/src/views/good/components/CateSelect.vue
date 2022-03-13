<template>
<div class="qf-cate-select">
  <el-select style="width:100%;" clearable :value='value' @change='$emit("input", $event)'>
    <el-option value=''>全部</el-option>
    <el-option
      v-for="item in cateArr"
      :key="item._id"
      :label="item.cate_zh"
      :value="item.cate">
    </el-option>
  </el-select>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      cateArr: [],
      cate: ''
    }
  },
  props: {
    value: { type: String, default: '' }
  },
  async mounted() {
    const res = await this.$api.fetchAllCate()
    this.cateArr = res.list
    // 把品类列表数据放进vuex
    this.updateGoodCates(res.list)
  },
  methods: {
    ...mapMutations('good', ['updateGoodCates'])
  }
}
</script>

<style lang="scss" scoped>
.qf-cate-select {
  display: inline-block;
}
</style>
