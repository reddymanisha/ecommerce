'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to place an order.')
      router.push('/signin')
      return
    }
    // Create the order object
    const order = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString(),
      total: total,
      status: 'Processing',
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: 1,
        price: item.price
      })),
      shippingAddress: {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode
      },
      paymentMethod: paymentMethod
    }

    // Save the order to local storage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const updatedOrders = [...existingOrders, order]
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    // Clear the cart
    clearCart()

    // Redirect to the orders page
    router.push('/orders')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <Image src={item.image} alt={item.name} width={50} height={50} className="mr-4" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div>
              <label htmlFor="country" className="block mb-1">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block mb-1">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block mb-1">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {paymentMethod === 'credit-card' && (
              <>
                <div>
                  <label htmlFor="cardNumber" className="block mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="cardExpiry" className="block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cardCVC" className="block mb-1">CVC</label>
                    <input
                      type="text"
                      id="cardCVC"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border rounded text-black dark:text-black dark:bg-white"
                      placeholder="123"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'paypal' && (
              <div className="mb-4">
                <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}
            <button type="submit" className="bg-purple-500 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

