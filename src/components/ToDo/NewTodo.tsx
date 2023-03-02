import { Button, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { FC, FormEvent, useState } from 'react'
import { Todo } from '../../types/todo.type'

type PropsType = {
  newPost: (post: Omit<Todo, 'id'>) => void,
}

const NewTodo: FC<PropsType> = ({ newPost }) => {
  const [post, setPost] = useState({
    title: '',
    description: '',
    completed: false,
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (post.title !== '' && post.description !== '') {
      newPost(post)
      setPost({ title: '', description: '', completed: false })
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
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
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
