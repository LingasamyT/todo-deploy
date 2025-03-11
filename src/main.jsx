import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import Home from './home.jsx'
import TodoList from './component/Todolist.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoList/>
  </StrictMode>,
)
