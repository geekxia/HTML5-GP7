import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../index';

// 引入api方法
import { fetchLogin, fetchUserInfo, fetchChartData } from '@/api';

// 可共享的子store可共享数据
const initialState:any = {
  token: localStorage.getItem('token'),
  userInfo: {},
  roleInfo: {},
  menuArr: []
}

export const login = createAsyncThunk(
  'user/login',
  async (data:any) => {
    const res:any = await fetchLogin(data);
    // return的结果就是payload
    return res.token
  }
)

export const getInfo = createAsyncThunk(
  'user/info',
  async (data:any) => {
    const res:any = await fetchUserInfo()
    return res
  }
)

const arrToTree = (menuArr) => {
  let modules = menuArr.filter(ele=>!ele.pid)
  modules.forEach((ele,idx)=>{
    modules[idx]['children'] = menuArr.filter(ele2=>ele2.pid===ele._id)
  })
  return modules
}

// 获取后端的图表数据
export const getChartData = createAsyncThunk(
  'user/chart',
  async () => {
    const res:any = await fetchChartData()
    return res
  }
)

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.userInfo = {}
      state.roleInfo = {}
      state.menuArr = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, {payload}) => {
        // 避免token是undefined的错误逻辑
        if (payload) {
          state.token = payload
          localStorage.setItem('token', payload)
        }
      })
      .addCase(getInfo.fulfilled, (state, {payload}) => {
        const { userInfo, roleInfo, menuArr } = payload
        console.log('payload', payload)
        if (payload.userInfo) {
          state.userInfo = userInfo
          state.roleInfo = roleInfo
          state.menuArr = arrToTree(menuArr)
        }
      })
    }
})

export const { logout } = user.actions;
// 导出子reducer，用于根reducer的合并
export default user.reducer
