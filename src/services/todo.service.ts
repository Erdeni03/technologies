import { Todo, TodoState } from '../types/todo.type'

const BASE = 'http://localhost:3004/todos'

export const TodoService = {
  async fetchTodos(state: TodoState = 'all'): Promise<Todo[]> {
    const queries = state === 'all' ? '' : `?completed=${state === 'completed'}`

    const res = await fetch(`${BASE}/${queries}`)

    if (!res.ok) throw new Error('Failed to fetch todos!')

    return res.json()
  },
  async createTodo(post: Todo) {
    const res = await fetch(BASE, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json()
  },
}
