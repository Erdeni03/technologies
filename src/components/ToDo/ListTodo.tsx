import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import * as React from 'react'
import { FC } from 'react'
import { Todo } from '../../types/todo.type'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_TODO, DELETE_TODO, UPDATE_TODO } from '../../apollo/todos'

type PropsType = {
  deletePost: (id: number | string) => void,
  completePost: (id: number | string, completed: boolean) => void,
  todos: Todo[],
}

const ListTodo: FC<PropsType> = ({ deletePost, todos, completePost }) => {
  const { loading, error, data } = useQuery(ALL_TODO)

  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO)
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo: any) => todo.__ref !== `Todo:${removeTodo.id}`
            )
          },
        },
      })
      // const { todos }: any = cache.readQuery({ query: ALL_TODO })
      // console.log(removeTodo, 'removeTodo')
      // console.log(todos, 'todos')
      // cache.writeQuery({
      //   query: ALL_TODO,
      //   data: {
      //     todos: todos.filter(
      //       (todo: any) => todo.__ref !== `Todo:${removeTodo.id}`
      //     ),
      //   },
      // })
    },
  })

  if (loading) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>LOADING</div>
        <CircularProgress />
      </Box>
    )
  }

  if (error || updateError || deleteError) {
    return <h2>ERROR...</h2>
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {data &&
        data.todos.map((post: Todo) => {
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
                  onClick={() => deleteTodo({ variables: { id: post.id } })}
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
                <Checkbox
                  checked={post.completed}
                  onChange={() =>
                    toggleTodo({
                      variables: {
                        id: post.id,
                        completed: !post.completed,
                      },
                    })
                  }
                />
              </CardActions>
            </Card>
          )
        })}
    </Box>
  )
}

export default ListTodo
