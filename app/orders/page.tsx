'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  userId: number
  date: string
  total: number
  status: string
  items: OrderItem[]
  shippingAddress: {
    name: string
    address: string
    city: string
    country: string
    zipCode: string
  }
  paymentMethod: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      const userOrders = allOrders.filter((order: Order) => order.userId === user.id)
      setOrders(userOrders)
      setLoading(false)
    } else {
      router.push('/signin')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 dark:text-white">Loading orders...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center dark:text-white">
          <p className="mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold dark:text-white">Order #{order.id}</h2>
                <span className="text-gray-600 dark:text-gray-300">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <p className="mb-2 dark:text-white">Status: {order.status}</p>
              <p className="mb-4 font-bold dark:text-white">Total: ${order.total.toFixed(2)}</p>
              <h3 className="font-semibold mb-2 dark:text-white">Items:</h3>
              <ul className="list-disc list-inside space-y-1 dark:text-gray-300">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4 mb-2 dark:text-white">Shipping Address:</h3>
              <p className="dark:text-gray-300">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.zipCode}
              </p>
              <p className="mt-2 dark:text-white">Payment Method: {order.paymentMethod}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

