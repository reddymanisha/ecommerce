'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import SearchBar from '@/components/SearchBar'
import { Heart, ShoppingCart, Sun, Moon, User } from 'lucide-react'

export default function SiteHeader() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-indigo-800 text-white py-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors duration-300">VibeValthu</Link>
        <SearchBar />
        <nav className="mt-4 w-full md:mt-0 md:w-auto">
          <ul className="flex flex-wrap space-x-4 items-center">
            <li><Link href="/products" className="hover:text-indigo-200 transition-colors duration-300">All Products</Link></li>
            <li><Link href="/products/men" className="hover:text-indigo-200 transition-colors duration-300">Men</Link></li>
            <li><Link href="/products/women" className="hover:text-indigo-200 transition-colors duration-300">Women</Link></li>
            <li><Link href="/products/kids" className="hover:text-indigo-200 transition-colors duration-300">Kids</Link></li>
            <li>
              <Link href="/cart" className="hover:text-indigo-200 transition-colors duration-300 flex items-center" aria-label={`Cart (${cart.length} items)`}>
                <ShoppingCart className="w-5 h-5 mr-1" />
                <span className="sr-only">Cart</span>
                <span className="bg-white text-indigo-800 rounded-full px-2 py-1 text-xs">{cart.length}</span>
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-indigo-200 transition-colors duration-300 flex items-center" aria-label={`Wishlist (${wishlist.length} items)`}>
                <Heart className="w-5 h-5 mr-1" />
                <span className="sr-only">Wishlist</span>
                <span className="bg-white text-indigo-800 rounded-full px-2 py-1 text-xs">{wishlist.length}</span>
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/profile" className="hover:text-indigo-200 transition-colors duration-300 flex items-center">
                    <User className="w-5 h-5 mr-1" />
                    <span>{user.name}</span>
                  </Link>
                </li>
                <li><Link href="/orders" className="hover:text-indigo-200 transition-colors duration-300">Orders</Link></li>
                <li><button onClick={logout} className="hover:text-indigo-200 transition-colors duration-300">Logout</button></li>
              </>
            ) : (
              <li><Link href="/auth/signup" className="hover:text-indigo-200 transition-colors duration-300">Sign Up</Link></li>
            )}
            <li>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-gray-700 transition-colors duration-300">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

