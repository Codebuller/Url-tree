import '@/styles/globals.css'
import {Nanum_Gothic} from 'next/font/google'
import {Raleway} from 'next/font/google'
import type { AppProps } from 'next/app'
const nanumGothic = Nanum_Gothic({ subsets: ['latin'],
                                  weight: '700' })
const raleway = Raleway({ subsets: ['latin'],
                                  weight: '200' })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <style jsx global>{`
      h1 {
        font-family: ${nanumGothic.style.fontFamily},sans-serif;
      }
      h2,h3,h4,p{
        font-family: ${raleway.style.fontFamily},sans-serif;
      }
    `}</style>
    <Component {...pageProps} />
  </>
  )
}
