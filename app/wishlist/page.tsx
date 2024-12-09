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
                    onClick={() => addToCart(item, 1)}
                    className={`font-bold py-2 px-4 rounded transition-colors duration-300 ${
                      isInCart(item.id)
                        ? 'bg-gray-300 text-black'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                    disabled={isInCart(item.id)}
                  >
                    {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-3 rounded-full text-sm transition-colors duration-300"
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
              className="bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  )
}

