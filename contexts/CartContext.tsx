'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '../types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  isInCart: (productId: number) => boolean
  updateCartItemQuantity: (productId: number, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (productId: number) => {
    return cart.some((item) => item.id === productId)
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

