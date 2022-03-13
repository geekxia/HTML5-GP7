<template>
<div class="qf-cart">
  <QfNavBar>
    <template #action>
      <span @click='$router.replace("/")'>首页</span>
    </template>
  </QfNavBar>


  <!-- 购物车列表 -->
  <van-swipe-cell v-for='(row,idx) in list' :key='row._id'>
    <van-row align='center' type='flex'>
      <van-col span="3">
        <van-checkbox
          class="qf-check"
          v-model="row.checked"
          @click='rowClick'
        />
      </van-col>
      <van-col span="21">
        <van-card
          :num="row.num"
          :price="row.good_info.price"
          :desc="row.good_info.desc"
          :title="row.good_info.name"
          class="goods-card"
          :thumb="row.good_info.img"
        >
          <template #footer>
            <div class="btns">
              <van-button size="mini" @click='numHandle(row,idx,-1)'>-</van-button>
              <van-button size="mini" @click='numHandle(row,idx,1)'>+</van-button>
            </div>
          </template>
        </van-card>
      </van-col>
    </van-row>
    <template #right>
      <van-button
        @click='delHandle(row,idx)'
        square text="删除"
        type="danger"
        style="height:100%;"
      />
    </template>
  </van-swipe-cell>

  <!-- 底部提交 S -->
  <van-submit-bar
    :price="total"
    button-text="提交订单"
    @submit="onSubmit">
    <van-checkbox v-model="full" @click='fullClick'>全选</van-checkbox>
    <template #tip>
      <span>你的收货地址不支持同城送，修改地址</span>
    </template>
  </van-submit-bar>
  <!-- 底部提交 E -->
</div>
</template>

<script>
import { QfNavBar } from '@/components'
export default {
  name: 'Cart',
  components: {
    QfNavBar
  },
  data() {
    return {
      full: false,
      checked: false,
      list: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    total() {
      let t = 0
      this.list.forEach(ele=>{
        if(ele.checked) t+=ele.num*ele.good_info.price
      })
      return t*100
    }
  },
  methods: {
    init() {
      this.$api.fetchCartList().then(res=>{
        console.log('购物车列表', res)
        this.list = res.list
      })
    },
    isFull() {
      const arr = this.list.filter(ele=>ele.checked)
      this.full = (arr.length!==0) && (arr.length == this.list.length)
    },
    rowClick () {
      this.isFull()
    },
    fullClick() {
      this.list.map((ele,idx)=>{
        this.list[idx].checked = this.full
      })
      // this.$forceUpdate()
      this.list = JSON.parse(JSON.stringify(this.list))
    },
    delHandle(row,idx) {
      this.$dialog.confirm({
        title: '删除提醒',
        message: `你确定要删除${row.good_info.name}吗？`
      }).then(()=>{
        console.log('准备调接口删除')
        this.$api.fetchCartDel({cart_id:row._id})
          .then(()=>{
            this.list.splice(idx,1)
            this.isFull()
          })
      })
    },
    numHandle(row,idx,step) {
      if (step===-1) {
        if(row.num===1) return this.$toast('不能再减了')
      }
      this.$api.fetchCartUpd({cart_id:row._id,new_num:row.num+step})
        .then(()=>{
          this.list[idx].num = row.num+step
        })
    },
    checkSumbit() {
      // 1、total总价是否大于0
      // 2、。。。。。(省略)
      let count = 0
      if(this.total>0) count++
      else this.$toast('请勾选你要购买的商品')
      return count===1
    },
    onSubmit() {
      console.log('提交')
      if (this.checkSumbit()) {
        let ids = ''
        this.list.forEach(ele=>{
          if(ele.checked) ids+=`;${ele._id}`
        })
        this.$api.fetchCartSubmit({ids}).then(()=>this.init())
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.qf-cart {
  padding-bottom: 2.4rem;
}
.van-card {
  background-color: white;
  padding-left: 0;
}
.van-swipe-cell {
  border-bottom: 1px solid #eee;
}
.btns {
  .van-button {
    padding: 0 .27rem;
    margin-left: .27rem;
  }
}
</style>
<style lang="scss">
.qf-check.van-checkbox {
  .van-checkbox__icon {
    margin: 0 auto;
  }
}
</style>
