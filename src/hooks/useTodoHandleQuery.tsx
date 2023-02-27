import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodoService } from '../services/todo.service'
import { Todo } from '../types/todo.type'

export const useTodoHandleQuery = ({ id, completed }: Todo) => {
  const client = useQueryClient()

  const { mutate: toggleTodo } = useMutation({
    mutationFn: () => TodoService.toggleTodoStatus(id, !completed),
    onSuccess: () => client.invalidateQueries(['todos']),
  })

  const { mutate: deleteTodo } = useMutation({
    mutationFn: () => TodoService.deleteTodo(id),
    onSuccess: () => client.invalidateQueries(['todos']),
  })

  return {
    toggleTodo,
    deleteTodo,
  }
}
