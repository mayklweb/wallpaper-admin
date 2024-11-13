import AppLayout from './components/layout/AppLayout'
import { useAuth } from './context/AuthContext'
import { Login } from './pages'

function App() {

  const isAuth = useAuth()


  return (
    <>
      {
        isAuth.token ? <AppLayout /> : <Login />
      }
    </>
  )
}

export default App