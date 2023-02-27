import { useQuery } from '@tanstack/react-query'
import { TodoService } from '../services/todo.service'
import { toast } from 'react-toastify'

export const useTodosQuery = () => {
  return useQuery({
    queryFn: () => TodoService.fetchTodos('all'),
    queryKey: ['todos', 'all'],
    // staleTime: 1000  CACHE UPDATE DATA
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    },
  })
}
