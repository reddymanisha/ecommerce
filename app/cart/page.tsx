'use client'

import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="space-x-2">
              <Button onClick={clearCart} variant="outline">
                Clear Cart
              </Button>
              <Button>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

