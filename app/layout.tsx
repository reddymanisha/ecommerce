import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Header from '@/components/ui/Home/Header'
import Footer from '@/components/ui/Home/Footer'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { AuthProvider } from '@/components/ui/Home/AuthProvider'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StyleHub - Your Fashion Destination',
  description: 'Discover the latest trends in fashion',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

