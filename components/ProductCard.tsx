'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Product } from '@/types/product'
import { Heart } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleCartAction = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id)
    } else {
      addToCart(product)
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
    <div className="border rounded-lg p-4 flex flex-col dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg'; // Fallback to placeholder if image fails to load
            }}
          />
        </div>
        <h2 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h2>
      </Link>
      <p className="text-gray-600 mb-2 dark:text-gray-300">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4 capitalize dark:text-gray-400">{product.gender}'s {product.type}</p>
      <div className="mt-auto flex justify-between">
        <button
          onClick={handleCartAction}
          className={`font-bold py-2 px-4 rounded transition-colors duration-300 ${
            isInCart(product.id)
              ? 'bg-black hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600'
          }`}
        >
          {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
        </button>
        <button
          onClick={handleWishlistAction}
          className={`font-bold p-2 rounded transition-colors duration-300 ${
            isInWishlist(product.id)
              ? 'bg-red-600 hover:bg-red-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
          }`}
          aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  )
}

