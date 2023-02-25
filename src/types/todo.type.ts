export type TodoState = 'all' | 'open' | 'completed'

export type Todo = {
  id: string | number
  completed: boolean
  title: string
  description: string
}