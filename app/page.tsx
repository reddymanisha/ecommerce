import Link from 'next/link'
import Image from 'next/image'
import Carousel from '@/components/carousel'
import menswear from "@/app/assets/Mens wear.jpg"
import womenswear from "@/app/assets/Womens wear.webp"
import kidswwear from "@/app/assets/Kidswear.webp"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Carousel />
      <h1 className="text-4xl font-bold mb-6 mt-12 text-center text-primary dark:text-primary">Welcome to Our E-commerce Store</h1>
      <p className="text-xl mb-8 text-center text-gray-600 dark:text-gray-300">Discover amazing products for everyone in our collection!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CategoryCard title="Men's Wear" image={menswear.src} link="/products/men" />
        <CategoryCard title="Women's Wear" image={womenswear.src} link="/products/women" />
        <CategoryCard title="Kids' Wear" image={kidswwear.src} link="/products/kids" />
      </div>
    </div>
  )
}

function CategoryCard({ title, image, link }: { title: string, image: string, link: string }) {
  return (
    <Link href={link} className="block">
      <div className="border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-card dark:bg-card hover:scale-[1.02]">
        <div className="relative h-64">
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-primary dark:text-primary">{title}</h2>
          <p className="text-primary/80 dark:text-primary/80 font-medium">Shop Now →</p>
        </div>
      </div>
    </Link>
  )
}

