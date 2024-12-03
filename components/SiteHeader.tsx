'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useAuth } from '@/contexts/AuthContext'
import SearchBar from '@/components/SearchBar'

export default function SiteHeader() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold">E-commerce Store</Link>
        <SearchBar />
        <nav className="mt-4 w-full md:mt-0 md:w-auto">
          <ul className="flex flex-wrap space-x-4">
            <li><Link href="/products" className="hover:text-gray-300">All Products</Link></li>
            <li><Link href="/products/men" className="hover:text-gray-300">Men</Link></li>
            <li><Link href="/products/women" className="hover:text-gray-300">Women</Link></li>
            <li><Link href="/products/kids" className="hover:text-gray-300">Kids</Link></li>
            <li><Link href="/cart" className="hover:text-gray-300">Cart ({cart.length})</Link></li>
            <li><Link href="/wishlist" className="hover:text-gray-300">Wishlist ({wishlist.length})</Link></li>
            {user ? (
              <>
                <li><span className="hover:text-gray-300">Welcome, {user.name}</span></li>
                <li><button onClick={logout} className="hover:text-gray-300">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link href="/signin" className="hover:text-gray-300">Sign In</Link></li>
                <li><Link href="/signup" className="hover:text-gray-300">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

