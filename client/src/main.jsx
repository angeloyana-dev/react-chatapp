import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

if(import.meta.env.DEV) import('eruda').then(eruda => eruda.init())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
