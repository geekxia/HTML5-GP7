<template>
<div class="app-container">
  <div class="filter">
    <el-row>
      <el-col :span="24">
        <el-input
          style='width:120px;'
          v-model="filter.name"
          placeholder="商品名称"
          @clear='count++'
          @change='count++'
          clearable
        />
        <CateSelect style="width:120px;" />
        <el-date-picker
          style='width:300px;'
          clearable
          v-model="filter.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click='count++'>搜索</el-button>
        <el-button v-permission='["shop"]' type="primary" icon="el-icon-edit" @click='skipToForm'>新增</el-button>
      </el-col>
    </el-row>
  </div>

  <div class="table" style="marginTop:20px;">
    <el-table
      :data="goodArr"
      size='mini'
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type='index'
        width='80'
        align='center'>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品"
        align='center'>
        <template slot-scope='scope'>
          <div class="good">
            <img :src='`${$img.imgBase}${scope.row.img}`' alt="" />
            <div v-text='scope.row.name' />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-permission='["admin"]'
        prop="shop_name"
        label="店铺名称"
        align='center'>
        <template slot-scope='scope'>
          <div class="good">
            {{scope.row.shop_info.shop_name}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cate"
        label="品类"
        align='center'>
        <template slot-scope='scope'>
          <div>{{cate2Zh(scope.row.cate)}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        align='center'
        sortable
        label="价格">
      </el-table-column>
      <el-table-column
        prop="create_time"
        align='center'
        sortable
        label="入库时间">
        <template slot-scope='scope'>
          <div>{{scope.row.create_time|date}}</div>
          <div>{{scope.row.create_time|time}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        align='center'
        label="上下架">
        <template slot-scope='scope'>
          <div v-text='scope.row.status?"已上架":"已下架"'></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="checked"
        align='center'
        label="审核状态">
        <template slot-scope='scope'>
          <div>{{scope.row.checked?"审核通过":"待审核"}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="handle"
        align='center'
        width='240'
        label="操作">
        <template slot-scope='scope'>
          <div>
            <el-button
              v-if='scope.row.checked===0' v-permission='["admin"]'
              @click='checkShow(scope.row)' size='mini' type="info">审核</el-button>
            <span v-permission='["shop"]'>
              <el-button size='mini' type="primary" @click='editRow(scope.row)'>编辑</el-button>
              <el-button size='mini' type="danger">删除</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="page" style="marginTop:60px;">
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="filter.page"
      :page-sizes="[2,5,10,20]"
      :page-size="filter.size"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total">
    </el-pagination>
  </div>

</div>
</template>


<script>
import CateSelect from './components/CateSelect'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'GoodList',
  components: { CateSelect },
  data() {
    return {
      count: 0,
      filter: {
        name: '',
        cate: '',
        date: [],
        page: 1,
        size: 2
      },
      goodArr: [],
      total: 0,
      isPageChange: false
    }
  },
  computed: {
    ...mapState('good', ['cates']),
    params() {
      // filter是用于表单双向绑定的。
      // 对filter数据进行二次处理
      return { ...this.filter }
    }
  },
  created() { this.init() },
  activated () { this.init() },
  watch: {
    // params(newF, oldF) {
    //   console.log('newF', newF)
    //   console.log('oldF', oldF)
    //   let page = newF.page
    //   if (newF.page === oldF.page) {
    //     console.log('非page变化')
    //     page = 1
    //   }
    //   console.log('page变化')
    //   this.init({...newF, page})
    // },
    count() { this.init() }
  },
  filters: {
    date(val) {
      return moment(val).format('MM月DD日')
    },
    time(val) {
      return moment(val).format('HH:mm')
    }
  },
  methods: {
    init() {
      let params = this.params
      if (!this.isPageChange) {
        params = { ...params, page: 1 }
      }
      this.$api.fetchGoodList(params)
        .then(res=>{
          console.log('商品列表', res)
          this.goodArr = res.list
          this.total = res.total
          this.isPageChange = false
        })
    },
    sizeChange (val) {
      this.filter.size = val
      this.count++
      this.$forceUpdate()
    },
    pageChange(val) {
      this.filter.page = val
      this.isPageChange = true
      this.count++
      this.$forceUpdate()
    },
    skipToForm() { this.$router.push('/good/add') },
    checkShow(row) {
      this.$confirm('是否允许当前商品通过?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '驳回',
         type: 'warning'
       }).then(() => {
         this.$api.fetchGoodCheck({id:row._id,checked:1})
          .then(()=>{
            this.$message({message:'审核成功',type:'success'})
            this.count++
          })
       }).catch(() => {
         this.$api.fetchGoodCheck({id:row._id,checked:-1})
          .then(()=>{
            this.$message({message:'审核成功',type:'success'})
            this.count++
          })
       });
    },
    editRow (row) {
      this.$router.push('/good/edit/'+row._id)
    },
    cate2Zh(cate) {
      const result = this.cates.find(ele=>ele.cate==cate)
      return result ? result.cate_zh : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 980px;
}
.good {
  text-align: center;
  img { display: inline-block; width: 60px; height: 60px; cursor: pointer; }
}
</style>
