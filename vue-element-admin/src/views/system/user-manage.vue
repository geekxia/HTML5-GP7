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

        <!-- 角色下拉 -->

        <el-button type="primary" icon="el-icon-search" @click='count++'>搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click='addUser'>新增</el-button>
      </el-col>
    </el-row>
  </div>

  <div class="table" style="marginTop:20px;">
    <el-table
      :data="userArr"
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
        prop="username"
        label="用户"
        align='center'/>
      <el-table-column
        prop="role"
        label="角色"
        align='center'>
      </el-table-column>
      <el-table-column
        prop="role_name"
        align='center'
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="status"
        align='center'
        label="状态">
        <template slot-scope='scope'>
          <div>{{scope.row.status?"正常":"禁用"}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="handle"
        align='center'
        width='240'
        label="操作">
        <template slot-scope='scope'>
          <el-button
            size='mini'
            :disabled='scope.row.role==="admin"'
            @click='userHandle(scope.row)'
            :type='(scope.row.status?"danger":"primary")'>
            {{scope.row.status?"禁用":"启用"}}
          </el-button>
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

  <!-- 添加用户的弹框 -->
  <el-dialog title="添加用户" :visible.sync="show">
    <el-row>
      <el-col span='4'>用户名:</el-col>
      <el-col span='20'>
        <el-input v-model="userForm.username" />
      </el-col>
    </el-row>
    <el-row>
      <el-col span='4'>用户名:</el-col>
      <el-col span='20'>
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option
            v-for='item in roleArr'
            :key='item._id'
            :label="item.role_name"
            :value="item.role" />
        </el-select>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="submitUser">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
export default {
  name: 'UserManage',
  data() {
    return {
      count: 0,
      filter: {
        name: '',
        page: 1,
        size: 2
      },
      userArr: [],
      total: 0,
      userForm: {
        username: '',
        role: ''
      },
      show: false,
      roleArr: []
    }
  },
  created() {
    this.init(this.filter)
    this.$api.fetchRoleList()
      .then(res=>this.roleArr = res.list)
  },
  activated () { this.init(this.filter) },
  watch: {
    count() {
      const filter = this.copy(this.filter)
      filter.page = 1
      this.filter = filter
      this.init(filter)
    }
  },
  methods: {
    init(params) {
      this.$api.fetchUserList(params)
        .then(res=>{
          console.log('用户列表', res)
          this.userArr = res.list
          this.total = res.total
        })
    },
    copy(target) {
      return JSON.parse(JSON.stringify(target))
    },
    sizeChange (val) {
      const filter = this.copy(this.filter)
      filter.page = 1
      filter.size = val
      this.filter = filter
      this.init(filter)
    },
    pageChange(val) {
      const filter = this.copy(this.filter)
      filter.page = val
      this.filter = filter
      this.init(filter)
    },
    // 打开添加用户的弹框
    addUser() {
      this.userForm = { username: '', role: '' }
      this.show = true
    },
    // 添加用户
    submitUser() {
      console.log('提交', this.userForm)
      const params = {
        ...this.userForm,
        role_name: this.roleArr.find(ele=>ele.role===this.userForm.role).role_name
      }
      // 表单验证，表单验证成功
      this.$api.fetchUserAdd(params)
        .then(()=>{
          this.init(this.filter)
          this.show = false
        })
    },
    // 启用或启用
    userHandle(row) {
      const params = {
        id: row._id,
        status: (row.status+1)%2
      }
      this.$api.fetchUserUpd(params)
        .then(()=>this.init(this.filter))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  min-width: 980px;
}
</style>
