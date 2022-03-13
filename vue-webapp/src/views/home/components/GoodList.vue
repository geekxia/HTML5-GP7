<template>

<div class="qf-good-list">
  <!-- 商品列表 -->

  <!-- 一行 -->
  <div class="row" v-for='i in row' :key='i'>
    <!-- flex右一个右一个 -->
    <div class="row-wrap">
      <div v-for='j in 2' :key='j' @click='skip(item(i,j))'>
        <div>
          <img :src="$img.imgBase+item(i,j).img" alt=""/>
          <div>
            <span>ll</span>
            <span v-text='item(i,j).desc'></span>
          </div>
          <div>
            <span v-text='item(i,j).price'></span>
            <span>闪购</span>
            <span>看相似</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



</template>

<script>
export default {
  props: {
    list: { type: Array, required: true }
  },
  computed: {
    row() {
      return Math.floor(this.list.length/2)
    }
  },
  methods: {
    item (i,j) {
      return this.list[2*i-3+j]
    },
    skip(item) {
      this.$router.push("/good/detail/"+item._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-good-list {
  .row {
    box-sizing: border-box;
    padding: 0 .13rem;
    margin-top: .13rem;
    .row-wrap {
      width: 100%;
      display: flex;
      &>div {
        flex: 1;
        text-align: center;
        &>div {
          width: 4.61rem;
          height: 6.93rem;
          background-color: orange;
          display: inline-block;
          img {
            display: block;
            width: 4.61rem;
            height: 4.61rem;
          }
        }
      }
    }
  }
}
</style>
