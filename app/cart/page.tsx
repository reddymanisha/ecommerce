'use client'

import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"

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
          <div className="grid gap-8">
            {cart.map((item) => (
              <div key={item.id} className="border rounded-lg p-6 dark:border-gray-700 flex items-center">
                <div className="relative w-64 h-64 mr-6">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-xl mb-2 dark:text-white">{item.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                      className="rounded-full dark:bg-gray-700 dark:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateCartItemQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center p-2 border rounded-md text-black dark:text-white dark:bg-gray-800"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      className="rounded-full dark:bg-gray-700 dark:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xl font-bold mb-4 dark:text-white">Total: ${total.toFixed(2)}</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

