'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import type { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={product.image || `/placeholder.svg?height=300&width=300`}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" onClick={handleWishlistToggle}>
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{product.color}, {product.size}</p>
      </div>
    </div>
  )
}

