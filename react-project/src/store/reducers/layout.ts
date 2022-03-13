import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';

// 可共享的子store可共享数据
const initialState:any = {
  collapsed: false,
  lang: navigator.language
}

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggle(state) {
      state.collapsed = !state.collapsed
    },
    changeLang(state, {payload}) {
      state.lang = payload
    }
  }
})

export const { toggle, changeLang } = layout.actions;
// 导出子reducer，用于根reducer的合并
export default layout.reducer
