import { IUser } from '../../models/IUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../types/todo.type'
import { fetchPosts } from './ActionCreators'

interface TodoState {
  postsToolkit: Todo[];
  isLoading: boolean;
  error: string;
}

const initialState: TodoState = {
  postsToolkit: [],
  isLoading: false,
  error: '',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postsFetching(state) {
    //   state.isLoading = true
    // },
    // postsFetchingSuccess(state, action: PayloadAction<Todo[]>) {
    //   state.isLoading = false
    //   state.error = ''
    //   state.postsToolkit = action.payload
    // },
    // postsFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false
    //   state.error = action.payload
    // },
  },
  extraReducers: {
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<Todo[]>) => {
      state.isLoading = false
      state.error = ''
      state.postsToolkit = action.payload
    },
    [fetchPosts.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default postsSlice.reducer
