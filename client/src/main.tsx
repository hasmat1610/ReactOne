import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App'

const queryClient = new QueryClient()

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found')
}

import { store } from './store'
import { Provider } from 'react-redux'

createRoot(rootEl).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)

