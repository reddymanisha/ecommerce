'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart, isInCart } = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {wishlist.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className={`font-bold py-2 px-4 rounded ${
                      isInCart(item.id)
                        ? 'bg-gray-300 text-gray-600'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    disabled={isInCart(item.id)}
                  >
                    {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-sm"
                    aria-label="Remove from wishlist"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={clearWishlist}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  )
}

