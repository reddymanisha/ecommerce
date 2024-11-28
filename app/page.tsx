import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null // This should never happen due to the redirect in layout.tsx
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to StyleHub, {session.user?.name}!</h1>
        <p className="text-xl text-gray-600 mb-8">Discover the latest trends in fashion</p>
        <Link href="/category/all">
          <Button size="lg">Shop Now</Button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Men', 'Women', 'Accessories'].map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`} className="block">
              <div className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition duration-300">
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-48"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Product {i}</h3>
                <p className="text-gray-600">$99.99</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

