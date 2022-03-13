
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../index';

// 引入api方法
import { fetchCount } from '../../api';

// 定义一个CounterState接口
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

// 可共享的子store可共享数据
const initialState: CounterState = {
  value: 0,
  status: 'idle',
}

// 创建一个有异步逻辑的action
// createAsyncThunk(type, (入参)=>payload)
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// createSlice() 创建子reducer
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // (slice对象.actions)
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      console.log('---action', action)
      state.value += action.payload;
    },
  },
  // 用于封装异步的reducer逻辑（监听接口的异步状态）
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
    }
});

console.log('counterSlice', counterSlice)

// 从子reducer（slice对象）解构出所有的同步的reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// 导出子reducer，用于根reducer的合并
export default counterSlice.reducer
