import { ReactNode } from 'react'
import { Navbar } from '@/components/ui/mainsection/navbar'
import { Footer } from '@/components/ui/mainsection/footer'
import { AuthProvider } from '@/contexts/auth-context'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

