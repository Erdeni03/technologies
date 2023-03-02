import { AppDispatch } from '../store'
import axios from 'axios'
import { postsSlice } from './PostSlice'
import { Todo } from '../../types/todo.type'
import { createAsyncThunk } from '@reduxjs/toolkit'

// export const fetchPosts = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(postsSlice.actions.postsFetching())
//     const response = await axios.get<Todo[]>(
//       'https://jsonplaceholder.typicode.com/posts'
//     )
//     dispatch(postsSlice.actions.postsFetchingSuccess(response.data))
//   } catch (e: any) {
//     dispatch(postsSlice.actions.postsFetchingError(e.message))
//   }
// }

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
