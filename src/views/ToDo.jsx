import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import uuid from 'react-uuid'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

const ToDo = () => {
  const [posts, setPosts] = useState([])
  const [searchedPosts, setSearchedPosts] = useState(posts)
  const [post, setPost] = useState({ title: '', description: '' })
  const [page, setPage] = useState(1)
  const countPage = 16
  const [search, setSearch] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (post.title !== '' && post.description !== '') {
      setPosts((prevVal) => [...prevVal, { id: uuid(), ...post }])
      setPost({ title: '', description: '' })
    }
  }

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const pages = useMemo(() => Math.ceil(posts.length / countPage), [posts])

  const handleSearch = () => {
    setSearchedPosts(
      posts.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase())
      })
    )
  }
  const [sortPosts, setSortPosts] = useState('')

  const paginatedPosts = useMemo(() => {
    let from = (page - 1) * countPage
    let to = from + countPage
    return searchedPosts.slice(from, to)
  }, [page, posts, searchedPosts, sortPosts])

  const changePage = (e, page) => {
    setPage(page)
  }

  const handleChange = (event) => {
    setSortPosts(event.target.value)
    setPosts((prevState) =>
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
    setSearchedPosts(posts)
  }, [posts])

  return (
    <Grid container spacing={2}>
      <Grid item xs={2.5}>
        <Paper
          onSubmit={onSubmit}
          component="form"
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 180,
            mb: 2,
          }}
        >
          <TextField
            required
            value={post.title}
            onChange={(e) =>
              setPost({ title: e.target.value, description: post.description })
            }
            label="Title"
            variant="standard"
          />
          <TextField
            required
            value={post.description}
            onChange={(e) =>
              setPost({ title: post.title, description: e.target.value })
            }
            label="Description"
            variant="standard"
          />
          <Button
            sx={{ marginTop: 2, marginBottom: 4 }}
            type="submit"
            color="success"
            variant="contained"
          >
            ADD
          </Button>
        </Paper>
        <Paper
          onSubmit={onSubmit}
          component="form"
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 180,
          }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortPosts}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="body">Body</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 3 }}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search"
              variant="standard"
              sx={{ width: 220 }}
            />
            <IconButton
              onClick={handleSearch}
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={9.5}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 670,
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {paginatedPosts.length > 0 &&
              paginatedPosts.map((post) => {
                return (
                  <Card
                    key={post.id}
                    sx={{ width: 255, marginRight: 2, marginBottom: 2 }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14, wordWrap: 'break-word' }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{ wordWrap: 'break-word' }}
                      >
                        {post.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => deletePost(post.id)}
                        size="small"
                        color="error"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                )
              })}
          </Box>
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
