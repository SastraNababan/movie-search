import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { store } from '../store'
const queryClient = new QueryClient()

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  )
}
export default MyApp
