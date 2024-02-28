import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
 

  return (
    <Html lang="en" className="dark" >
      <Head />
      <body className="bg-white dark:bg-black text-white dark:text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
