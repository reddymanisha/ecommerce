'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Heart, Menu, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { signOut, useSession } from 'next-auth/react'

const categories = ['Men', 'Women', 'Bags', 'Footwear', 'Accessories']

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">StyleHub</Link>
        <nav className="hidden md:flex space-x-4">
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`} className="text-gray-600 hover:text-gray-800">
              {category}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>
          {session ? (
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="h-6 w-6" />
              <span className="sr-only">Sign Out</span>
            </Button>
          ) : (
            <Link href="/auth/signin">
              <Button variant="ghost" size="icon">
                <User className="h-6 w-6" />
                <span className="sr-only">Sign In</span>
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-100 py-2">
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              {category}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

