import { Button, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { FC, FormEvent, useState } from 'react'
import { Todo } from '../../types/todo.type'
import { postsAPI } from '../../services/PostService'
import uuid from 'react-uuid'

type PropsType = {
  newPost: (post: Omit<Todo, 'id'>) => void,
}

const NewTodo: FC<PropsType> = ({ newPost }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    completed: false,
  })

  const [createPost, {error, isLoading}] = postsAPI.useCreatePostMutation()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (post.title !== '' && post.body !== '') {
      // newPost(post)
      await createPost({ ...post, id: uuid() } as Todo)
      setPost({ title: '', body: '', completed: false })
    }
  }

  return (
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
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        label="Title"
        variant="standard"
      />
      <TextField
        required
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
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
  )
}

export default NewTodo
