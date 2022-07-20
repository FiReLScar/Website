import type { AppProps } from 'next/app'
import Head from 'next/head'

let Page = ({ Component, pageProps }: AppProps) => {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    </Head>
    <Component {...pageProps} />
    <style jsx>{`
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `}</style>
  </>
}

export default Page