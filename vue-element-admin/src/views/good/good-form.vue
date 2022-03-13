<template>
<div class="app-container">
  <div class="form" style="max-width: 60%;">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input
          type="textarea"
          :rows="3"
          v-model="ruleForm.desc">
        </el-input>
        <!-- <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="商品品类" prop='cate' required>
        <CateSelect v-model='ruleForm.cate' />
      </el-form-item>
      <el-form-item label="是否热销" prop="hot">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="ruleForm.price" controls-position="right" :min="0" />
      </el-form-item>

      <el-form-item label="商品图片" prop="img">
        <SingleImage v-model='ruleForm.img' />
      </el-form-item>

    </el-form>
  </div>

  <div class="btns" :style='{left: left+"px"}'>
    <el-button type="primary" @click="submitForm">{{$route.params.id?'修改':'添加'}}</el-button>
    <el-button>取消</el-button>
  </div>
</div>
</template>

<script>
import CateSelect from './components/CateSelect'
import SingleImage from '@/components/Upload/SingleImage'
import { mapState } from 'vuex'
import { checkPrice } from '@/utils/validate'
export default {
  name: 'GoodForm',
  components: { CateSelect, SingleImage },
  data() {
    // do something
    return {
      ruleForm: {
        img: '',
        name: '',
        price: '',
        desc: '',
        hot: false,
        cate: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, message: '商品名称不能少于两个字', trigger: 'blur' },
          { max: 8, message: '商品名称不能多于八个字', trigger: 'blur' },
          // { pattern: /[a-zA-Z]{2,8}$/, message:'商品名称只能2~8字', trigger:'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { validator: checkPrice, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('app',['sidebar','device']),
    // 计算属性，可以任何__ob__变量进行计算
    left() {
      let l = 0
      if (this.device!=='mobile') {
        l = this.sidebar.opened ? 210 : 54
      }
      return l
    }
  },
  created() {
    const id = this.$route.params.id
    if (id) {
      this.$api.fetchGoodInfo({id})
        .then(res=>{
          console.log('商品详情', res)
          this.ruleForm = res.info
        })
    }
  },
  methods: {
    submitForm() {
      console.log('提交', this.ruleForm)
      let params = this.ruleForm
      const id = this.$route.params.id
      if (id) params.id = id
      this.$api.fetchGoodForm(params).then(()=>{
        console.log('商品添加成功')
        this.$message({
          message: id?'修改成功':'新增成功',
          type: 'success'
        })
        setTimeout(()=>this.$router.replace('/good/list'), 3000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding-bottom: 80px;
}
.btns {
  position: fixed;
  bottom: 0;
  height: 60px;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: white;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid #eee;
  transition: left 0.28s;
}
</style>
<style>
.image-preview {
  /* display: none; */
}
</style>
