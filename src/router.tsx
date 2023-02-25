import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from './components/Dashboard/Dashboard'
import ToDo from './views/ToDo'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/to-do',
        element: <ToDo />,
      },
    ],
  },
])

export default router
