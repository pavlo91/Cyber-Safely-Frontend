import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import { Alerts } from '../components/common/Alerts'
import { NProgress } from '../components/common/NProgress'
import { Config } from '../helpers/config'
import { ApolloClientProvider } from '../libs/apollo'
import createEmotionCache from '../utils/cache'
import { AlertContextProvider } from '../utils/context/alert'
import { createTheme } from '../utils/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const theme = useMemo(() => createTheme(), [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{Config.app.name}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertContextProvider>
          <ApolloClientProvider>
            <Alerts />
            <Component {...pageProps} />
            <NProgress />
            <Analytics />
            {/* <ScrollToTop /> */}
          </ApolloClientProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
