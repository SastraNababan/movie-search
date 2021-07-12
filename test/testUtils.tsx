import { ChakraProvider } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from '../store'

const AppWrapper = ({ children }) => {
  // const queryClient = new QueryClient()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  })
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

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()

  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    </Provider>
  )
  const QueryProviderRender = {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <Provider store={store}>
          <QueryClientProvider client={testQueryClient}>
            <ChakraProvider>{rerenderUi}</ChakraProvider>
          </QueryClientProvider>
        </Provider>
      ),
  }
  return QueryProviderRender
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
