import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { store } from '../store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

const AppWrapper = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>{children}</ChakraProvider>
      </QueryClientProvider>
    </Provider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AppWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, screen, fireEvent, waitFor }
