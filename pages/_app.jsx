
import { AppProps } from 'next/app'
import '../styles/index.css'
import Layout from '../components/layout'
import { useTheme } from 'next-themes';

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider 
    defaultTheme="dark" attribute="class"> 
    <Layout><Component {...pageProps} /></Layout>
    </ThemeProvider>
    )
}

export default MyApp
