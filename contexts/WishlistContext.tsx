'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { WishlistItem } from '@/types'

type WishlistContextType = {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((i) => i.id === item.id)) {
        return [...prevWishlist, item]
      }
      return prevWishlist
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

