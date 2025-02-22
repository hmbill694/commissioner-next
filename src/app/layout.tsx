import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "~/styles/globals.css"
import Navbar from "./components/Navbar"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "~/components/ui/sonner"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Commissioner",
  description: "Real estate agent information sharing platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " flex flex-col min-h-screen"}>
          <Navbar />
          <main className="container mx-auto px-4 pt-16 flex-1 flex flex-col">{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
