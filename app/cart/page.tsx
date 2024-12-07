'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-3 rounded-full transition-colors duration-300"
                  aria-label="Remove from cart"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={clearCart}
                className="bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

