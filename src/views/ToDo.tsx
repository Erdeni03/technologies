import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import {
  Button,
  CircularProgress,
  Pagination,
  SelectChangeEvent,
} from '@mui/material'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { Todo } from '../types/todo.type'
import NewTodo from '../components/ToDo/NewTodo'
import ListTodo from '../components/ToDo/ListTodo'
import SearchSortTodo from '../components/ToDo/SearchSortTodo'
import uuid from 'react-uuid'
import { postsAPI } from '../services/PostService'

const ToDo = () => {
  const [posts, setPosts] = useState<Todo[]>([])
  const [searchedPosts, setSearchedPosts] = useState<Todo[]>(posts)

  const [page, setPage] = useState(1)
  const countPage = 16
  const [search, setSearch] = useState('')

  const [deletePostRequest] = postsAPI.useDeletePostMutation()

  const deletePost = async (id: number | string) => {
    await deletePostRequest(id)
    setPosts(posts.filter((post) => post.id !== id))
  }

  const newPost = (post: Omit<Todo, 'id'>) => {
    setPosts((prevVal) => [...prevVal, { id: uuid(), ...post }])
  }

  const pages = useMemo(() => Math.ceil(posts.length / countPage), [posts])

  const onClickSearch = () => {
    setSearchedPosts(
      posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const [updatePost] = postsAPI.useUpdateCompletePostMutation()
  const completePost = async (id: string | number, completed: boolean) => {
    await updatePost({ id, completed })

    setPosts((prevState) =>
      prevState.map((post) => {
        if (post.id === id) {
          return { ...post, completed: !completed }
        }
        return post
      })
    )
  }

  const [sortPosts, setSortPosts] = useState('')

  const paginatedPosts = useMemo(() => {
    let from = (page - 1) * countPage
    let to = from + countPage
    return searchedPosts.slice(from, to)
  }, [page, posts, searchedPosts, sortPosts])

  const changePage = (_: unknown, page: number) => {
    setPage(page)
  }

  const handleSorting = (event: SelectChangeEvent) => {
    setSortPosts(event.target.value)
    setPosts((prevState) =>
      prevState.sort((a, b) => {
        if (event.target.value === 'title') {
          return a.title.localeCompare(b.title)
        } else {
          return a.body.localeCompare(b.body)
        }
      })
    )
  }

  useEffect(() => {
    setSearchedPosts(posts)
  }, [posts])

  // const dispatch = useAppDispatch()
  // const { postsToolkit, isLoading, error } = useAppSelector(
  //     (state) => state.postsReducer
  // )
  //
  // useEffect(() => {
  //   dispatch(fetchPosts())
  // }, [])

  const {
    data: postsToolkitQuery,
    isLoading,
    error,
    refetch,
  } = postsAPI.useFetchAllPostsQuery(20)
  // refetch - обновление данных
  // pollingInterval - промежуток времени на авт обновление данных
  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5}>
        <NewTodo newPost={newPost} />
        <SearchSortTodo
          sortPosts={sortPosts}
          search={search}
          handleSorting={handleSorting}
          onClickSearch={onClickSearch}
          onChangeSearch={onChangeSearch}
        />
      </Grid>

      <Grid item xs={9.5}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 670,
            width: '100%',
          }}
        >
          {/*{isLoading && <h1>LOADING POSTS</h1>}*/}
          {/*{error && <h1>{error}</h1>}*/}
          {/*<ListTodo*/}
          {/*  deletePost={deletePost}*/}
          {/*  todos={postsToolkit}*/}
          {/*  completePost={completePost}*/}
          {/*/>*/}
          {isLoading && <h1>LOADING POSTS</h1>}
          {error && <h1>ERROR</h1>}
          <Button onClick={() => refetch()}>REFETCH</Button>
          {postsToolkitQuery && (
            <ListTodo
              deletePost={deletePost}
              todos={postsToolkitQuery}
              completePost={completePost}
            />
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              onChange={changePage}
              count={pages}
              page={page}
              color="primary"
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ToDo
