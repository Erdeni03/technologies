import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { CircularProgress, Pagination, SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import { Todo } from '../types/todo.type'
import NewTodo from '../components/ToDo/NewTodo'
import ListTodo from '../components/ToDo/ListTodo'
import SearchSortTodo from '../components/ToDo/SearchSortTodo'
import { useTodosQuery } from '../hooks/useTodosQuery'
import { ToastContainer } from 'react-toastify'

const ToDo = () => {
  const { data: postsQuery, isLoading, isSuccess } = useTodosQuery()

  const [searchedPosts, setSearchedPosts] = useState<Todo[]>(postsQuery || [])

  const [page, setPage] = useState(1)
  const countPage = 16
  const [search, setSearch] = useState('')

  const pages = useMemo(
    () => Math.ceil(searchedPosts.length / countPage),
    [searchedPosts]
  )

  const onClickSearch = () => {
    setSearchedPosts(
      (postsQuery || []).filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const [sortPosts, setSortPosts] = useState('')

  const paginatedPosts = useMemo(() => {
    let from = (page - 1) * countPage
    let to = from + countPage
    return searchedPosts.slice(from, to)
  }, [page, searchedPosts, sortPosts])

  const changePage = (_: unknown, page: number) => {
    setPage(page)
  }

  const handleSorting = (event: SelectChangeEvent) => {
    setSortPosts(event.target.value)
    setSearchedPosts((prevState) =>
      prevState.sort((a, b) => {
        if (event.target.value === 'title') {
          return a.title.localeCompare(b.title)
        } else {
          return a.description.localeCompare(b.description)
        }
      })
    )
  }

  useEffect(() => {
    setSearchedPosts(postsQuery || [])
  }, [postsQuery])

  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5}>
        <ToastContainer />
        <NewTodo />
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
          {isLoading ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            isSuccess && (
              <>
                <ListTodo todos={paginatedPosts} />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    onChange={changePage}
                    count={pages}
                    page={page}
                    color="primary"
                  />
                </Box>
              </>
            )
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ToDo
