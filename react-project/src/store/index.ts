import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger'

import counter from './reducers/counter';

import user from './reducers/user'
import layout from './reducers/layout'
import article from './reducers/article'

export const store = configureStore({
  // 用于合并子reducer(slice对象)
  reducer: {
    counter,
    user,
    layout,
    article
  },
  // 用于安装中间件（坑：要考虑@reduxjs/toolkit默认原有的中间件）
  // 在原有的中间件的基础上，添加新的中间件
  middleware: (getDefaultMiddlewares)=>(getDefaultMiddlewares().concat(logger))
});

// 定义并抛出三个TS类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
