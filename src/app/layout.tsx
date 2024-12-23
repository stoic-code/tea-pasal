import './globals.css'
import { Playfair_Display } from 'next/font/google'
import { Nunito_Sans } from 'next/font/google'
import Layout from '@/components/common/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ToTop from '@/components/common/ToTop'

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    variable: '--font-playfair-display'
})

const nunito = Nunito_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    variable: '--font-nunito-sans'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head></head>
            <body id='body' className={` text-body   ${nunito.variable}  ${playfair.variable} font-sans `}>
                <Layout>{children}</Layout>
                <ToastContainer />
                <ToTop />
            </body>
        </html>
    )
}
