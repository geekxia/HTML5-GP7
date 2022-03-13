<template>
<div>

  <QfNavBar>
    <template><span v-text='info.name'></span></template>
  </QfNavBar>

  <div>
    <img :src="$img.imgBase+info.img" alt="" />
    <div v-text='info.desc'></div>
    <div v-text='info.price'></div>
  </div>


  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" dot />
    <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
    <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
    <van-goods-action-button type="warning" v-auth text="加入购物车" @click='addToCart' />
    <van-goods-action-button type="danger" text="立即购买" />
  </van-goods-action>
</div>
</template>

<script>
import { QfNavBar } from '@/components'
export default {
  components: { QfNavBar },
  data() {
    return {
      info: {}
    }
  },
  created() {
    const id = this.$route.params.id
    console.log('id', id)
    this.$api.fetchGoodInfo({id}).then(res=>{
      console.log('商品详情', res)
      this.info = res.info
    })
  },
  methods: {
    addToCart() {
      console.log('调接口添加购物车')

      this.$api.fetchCartAdd({
        good_id: this.info._id,
        num: 1
      }).then(res=>{
        console.log('添加购物车成功', res)
        // 弹框提示添加成功
        this.$router.push('/cart')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
