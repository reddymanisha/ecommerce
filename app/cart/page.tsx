'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="dark:text-white">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 dark:border-gray-700">
                <div className="flex items-center">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                  <div>
                    <h2 className="font-semibold dark:text-white">{item.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-l"
                  >
                    <Minus size={20} />
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 text-center p-2 border-t border-b text-black dark:text-black dark:bg-white"
                  />
                  <button 
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white p-2 rounded-r"
                  >
                    <Plus size={20} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-3 rounded-full transition-colors duration-300 dark:bg-gray-800 dark:text-white dark:border-white dark:hover:bg-gray-700"
                    aria-label="Remove from cart"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xl font-bold dark:text-white">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={clearCart}
                className="bg-white hover:bg-gray-100 text-black border border-black font-bold py-2 px-4 rounded transition-colors duration-300 dark:bg-gray-800 dark:text-white dark:border-white dark:hover:bg-gray-700"
              >
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

