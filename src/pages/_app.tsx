import '@/styles/globals.css'

import { withTRPC } from '@trpc/next'
import type { AppProps } from 'next/app'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import superjson from 'superjson'
import { AppRouter } from '@/server/route/app.router'
import { url } from '@/constants'
import { trpc } from '@/utils/trpc'
import { UserContextProvider } from '@/context/user.context'
import { ChakraProvider } from '@chakra-ui/react'




function MyApp({ Component, pageProps }: AppProps) {

  const { data, error, isLoading } = trpc.useQuery(['users.me'])

  if (isLoading) {
    return <>Loading user..</>
  }

  return (
  <UserContextProvider value={data}>
    <ChakraProvider>
    <main><Component {...pageProps} /></main></ChakraProvider>
  </UserContextProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false
})(MyApp)