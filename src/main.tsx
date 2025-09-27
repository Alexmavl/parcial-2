import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import App from './App'
import Home from './routes/Home'
import NewPost from './routes/NewPost'
import './index.css'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/nuevo', element: <NewPost /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
