import { Button, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import * as React from 'react'
import { FC, FormEvent, useState } from 'react'
import { Todo } from '../../types/todo.type'
import { useMutation } from '@apollo/client'
import { ADD_TODO, ALL_TODO } from '../../apollo/todos'

type PropsType = {
  newPost: (post: Omit<Todo, 'id'>) => void,
}

const NewTodo: FC<PropsType> = ({ newPost }) => {
  const [post, setPost] = useState({
    title: '',
    description: '',
    completed: false,
  })
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    // refetchQueries: [
    //   {
    //     query: ALL_TODO,
    //   },
    // ],
    update(cache, { data: { newTodo } }) {
      const { todos }: any = cache.readQuery({ query: ALL_TODO })

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          todos: [newTodo, ...todos],
        },
      })
    },
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (post.title !== '' && post.description !== '') {
      addTodo({
        variables: {
          title: post.title,
          completed: false,
          userId: 123,
        },
      })
      setPost({ title: '', description: '', completed: false })
    }
  }

  if (error) {
    return <h2>ERror....</h2>
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
