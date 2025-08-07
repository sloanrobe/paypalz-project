import './styles/App.css'
import { AuthenticationLayer } from './components/AuthenticationLayer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContext, UserInfo } from './contexts/UserContext'
import { useState } from 'react'

function App() {
  const [info, setInfo] = useState<UserInfo | null>(null)
  const queryClient = new QueryClient()

  return (
    <UserContext.Provider
      value={{
        info: info,
        setInfo: setInfo,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthenticationLayer />
      </QueryClientProvider>
    </UserContext.Provider>
  )
}

export default App