'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/types'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item: CartItem) => {
    addToCart({ ...item, quantity: 1 })
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="space-x-2">
                  <Button onClick={() => handleAddToCart({ ...item, quantity: 1 })}>
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => removeFromWishlist(item.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button onClick={clearWishlist} variant="outline">
              Clear Wishlist
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

