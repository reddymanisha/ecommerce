'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Product } from '@/types/product'
import { Heart } from 'lucide-react'
import{ Button }from '@/components/ui/button'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleCartAction = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id)
    } else {
      addToCart(product, 1) // Add a quantity of 1
    }
  }

  const handleWishlistAction = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="border rounded-xl p-4 flex flex-col transition-colors duration-200 hover:border-primary dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h2>
      </Link>
      <p className="text-gray-600 mb-2 dark:text-gray-300">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4 capitalize dark:text-gray-400">{product.gender}'s {product.type}</p>
      <div className="mt-auto flex justify-between gap-2">
        <Button
          onClick={handleCartAction}
          variant={isInCart(product.id) ? "destructive" : "default"}
          className="flex-1 rounded-full"
        >
          {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
        </Button>
        <Button
          onClick={handleWishlistAction}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
          <span className="sr-only">
            {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </span>
        </Button>
      </div>
    </div>
  )
}

