import Box from '@mui/material/Box'
import * as React from 'react'
import { FC } from 'react'
import { Todo } from '../../types/todo.type'
import ItemTodo from './ItemTodo'

type PropsType = {
  todos: Todo[],
}

const ListTodo: FC<PropsType> = ({ todos }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {todos.map((post) => {
        return <ItemTodo key={post.id} post={post} />
      })}
    </Box>
  )
}

export default ListTodo
