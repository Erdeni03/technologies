import { Button, Card, CardActions, CardContent, Checkbox } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import * as React from 'react'
import { FC } from 'react'
import { Todo } from '../../types/todo.type'

type PropsType = {
  deletePost: (id: number | string) => void,
  completePost: (id: number | string, completed: boolean) => void,
  todos: Todo[],
}

const ListTodo: FC<PropsType> = ({ deletePost, todos, completePost }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {todos.map((post) => {
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
            <CardActions
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => deletePost(post.id)}
                size="small"
                color="error"
              >
                Delete
              </Button>
              <Checkbox
                checked={post.completed}
                onChange={() => completePost(post.id, post.completed)}
              />
            </CardActions>
          </Card>
        )
      })}
    </Box>
  )
}

export default ListTodo
