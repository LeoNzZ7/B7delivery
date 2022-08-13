import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextProvider } from '../contexts/app.content'
import { SessionProvider } from "next-auth/react"
import { UserCrendentialsContextProvider } from '../contexts/user.credentials';
 
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} >
      <UserCrendentialsContextProvider>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </UserCrendentialsContextProvider>
    </SessionProvider>
  );
}

export default MyApp
