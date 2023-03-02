import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo } from '../types/todo.type'

export const postsAPI = createApi({
  reducerPath: 'postsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: (limit: number = 5) => ({
        url: '/todos',
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ['Post'],
    }),
    createPost: build.mutation<Todo, Todo>({
      query: (post) => ({
        url: '/todos',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updateCompletePost: build.mutation({
      query: (post) => ({
        url: `/todos/${post.id}`,
        method: 'PATCH',
        body: { completed: !post.completed },
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})

export const {} = postsAPI
