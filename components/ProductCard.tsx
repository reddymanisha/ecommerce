'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Product } from '@/types/product'

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
    <div className="border rounded-lg p-4 flex flex-col">
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
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      </Link>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4 capitalize">{product.gender}'s {product.type}</p>
      <div className="mt-auto flex justify-between">
        <button
          onClick={handleCartAction}
          className={`font-bold py-2 px-4 rounded ${
            isInCart(product.id)
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
        </button>
        <button
          onClick={handleWishlistAction}
          className={`font-bold py-2 px-4 rounded ${
            isInWishlist(product.id)
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          {isInWishlist(product.id) ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}

