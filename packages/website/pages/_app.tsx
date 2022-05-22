import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material"
import TrayMenu from '../components/TrayMenu'
import NProgress from 'nprogress'
import { themeOptions } from '@wrp/core'
import {
    GoogleAnalytics,
    // TidioChat,
    TawkWidget
} from "../components/Integration"
import { imgFallback } from '../utils/image'

import '../styles/nprogress.scss'
import '../styles/global.css'

NProgress.configure({ showSpinner: false })

const theme = createTheme(themeOptions)

interface KeepAliveItem {
    route: string
    PageComponent: any
    current: boolean
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const keepAlive = useRef<KeepAliveItem[]>([
        {
            route: '/reading',
            PageComponent: undefined,
            current: false,
        },
        {
            route: '/explore',
            PageComponent: undefined,
            current: false,
        },
        {
            route: '/word',
            PageComponent: undefined,
            current: false,
        },
    ])

    useEffect(() => {
        router.prefetch('/reading')
        router.prefetch('/explore')
        // router.prefetch('/word')
        // router.prefetch('/start')
        // router.prefetch('/about')

        function handleRouterChangeStart() {
            NProgress.start()
        }

        function handleRouterChangeDone() {
            NProgress.done()
        }

        const cancelImgFallback = imgFallback()
        router.events.on('routeChangeStart', handleRouterChangeStart)
        router.events.on('routeChangeComplete', handleRouterChangeDone)
        router.events.on('routeChangeError', handleRouterChangeDone)
        return () => {
            router.events.off('routeChangeStart', handleRouterChangeStart)
            router.events.off('routeChangeComplete', handleRouterChangeDone)
            router.events.off('routeChangeError', handleRouterChangeDone)
            cancelImgFallback()
        }
    }, [])

    useEffect(() => {

    }, [router.asPath])

    // current page
    let isKeepAlivePage = false

    keepAlive.current.forEach((data) => {
        if (router.route === data.route) {
            data.current = true
            data.PageComponent = Component
            isKeepAlivePage = true
            return
        }
        data.current = false
    })

    return <>
        <Head>
            <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
            />
            <title>青轻阅读 Deep Reading - 轻松阅读英语</title>
        </Head>

        <GoogleAnalytics />
        <TawkWidget path={router.asPath} />

        <ThemeProvider theme={theme}>
            {keepAlive.current.map(
                ({ PageComponent, current, route }) =>
                    PageComponent && <PageComponent active={current} key={route} />
            )}
            {!isKeepAlivePage && <Component {...pageProps} />}
            <TrayMenu />
        </ThemeProvider>
    </>
}
