import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}:any) {
  return (
  <SessionProvider session = {session}>
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </SessionProvider>
  
  )
}
