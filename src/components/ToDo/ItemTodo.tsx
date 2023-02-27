import { Button, Card, CardActions, CardContent, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Todo } from '../../types/todo.type'
import { FC } from 'react'
import { useTodoHandleQuery } from '../../hooks/useTodoHandleQuery'

type PropsType = {
  post: Todo,
}

const ItemTodo: FC<PropsType> = ({ post }) => {
  const { deleteTodo, toggleTodo } = useTodoHandleQuery(post)

  return (
    <Card
      key={post?.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 255,
        marginRight: 2,
        marginBottom: 2,
      }}
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
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => deleteTodo()} size="small" color="error">
          Delete
        </Button>
        <Checkbox checked={post.completed} onChange={() => toggleTodo()} />
      </CardActions>
    </Card>
  )
}

export default ItemTodo
