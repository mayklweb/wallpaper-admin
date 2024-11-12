import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import App from './App.jsx'
import './assets/style/main.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true }}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
