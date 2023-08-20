import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Good News!',
  description: "Find out what's good",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' sizes="any" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-amber-200 via-amber-100 via-10% to-white min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
