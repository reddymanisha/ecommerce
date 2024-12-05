'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useAuth } from '@/contexts/AuthContext'
import SearchBar from '@/components/SearchBar'

export default function SiteHeader() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-white hover:text-indigo-200 transition-colors duration-300">
            E-commerce Store
          </Link>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              )}
            </svg>
          </button>
        </div>
        <div className={`mt-4 ${isMenuOpen ? 'block' : 'hidden'} md:block md:mt-0`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <SearchBar />
            <nav className="mt-4 md:mt-0">
              <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <li><Link href="/products" className="hover:text-indigo-200 transition-colors duration-300">All Products</Link></li>
                <li><Link href="/products/men" className="hover:text-indigo-200 transition-colors duration-300">Men</Link></li>
                <li><Link href="/products/women" className="hover:text-indigo-200 transition-colors duration-300">Women</Link></li>
                <li><Link href="/products/kids" className="hover:text-indigo-200 transition-colors duration-300">Kids</Link></li>
                <li><Link href="/cart" className="hover:text-indigo-200 transition-colors duration-300">Cart ({cart.length})</Link></li>
                <li><Link href="/wishlist" className="hover:text-indigo-200 transition-colors duration-300">Wishlist ({wishlist.length})</Link></li>
                {user ? (
                  <>
                    <li><span className="hover:text-indigo-200 transition-colors duration-300">Welcome, {user.name}</span></li>
                    <li><button onClick={logout} className="hover:text-indigo-200 transition-colors duration-300">Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link href="/signin" className="hover:text-indigo-200 transition-colors duration-300">Sign In</Link></li>
                    <li><Link href="/signup" className="hover:text-indigo-200 transition-colors duration-300">Sign Up</Link></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

