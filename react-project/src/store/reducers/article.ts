import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// 引入api方法
import { fetchArticleUpdate, fetchArticleList, fetchArticleInfo } from '@/api';

// 可共享的子store可共享数据
const initialState:any = {}

export const updateArticle = createAsyncThunk(
  'article/update',
  async (data:any) => {
    const res:any = await fetchArticleUpdate(data)
    return res
  }
)

export const listArticle = createAsyncThunk(
  'article/list',
  async (params:any) => {
    const res:any = await fetchArticleList(params)
    return res
  }
)


export const infoArticle = createAsyncThunk(
  'article/info',
  async (params:any) => {
    const res:any = await fetchArticleInfo(params)
    return res.info
  }
)

export const article = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
})

// export const { } = article.actions;
// 导出子reducer，用于根reducer的合并
export default article.reducer
