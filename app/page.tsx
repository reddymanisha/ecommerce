import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our E-commerce Store</h1>
      <p className="mb-8">Discover amazing products for everyone in our collection!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard title="Men's Wear" image="/placeholder.svg" link="/products/men" />
        <CategoryCard title="Women's Wear" image="/placeholder.svg" link="/products/women" />
        <CategoryCard title="Kids' Wear" image="/placeholder.svg" link="/products/kids" />
      </div>
    </div>
  )
}

function CategoryCard({ title, image, link }: { title: string, image: string, link: string }) {
  return (
    <Link href={link} className="block">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <Image src={image} alt={title} width={400} height={300} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-blue-500">Shop Now →</p>
        </div>
      </div>
    </Link>
  )
}

