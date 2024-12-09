'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Filter } from 'lucide-react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity])
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const applyFilters = () => {
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('minPrice', priceRange[0].toString())
    queryParams.set('maxPrice', priceRange[1] === Infinity ? '' : priceRange[1].toString())
    queryParams.set('category', selectedCategory === 'All Categories' ? '' : selectedCategory)
    router.push(`/search?${queryParams.toString()}`)
    setIsFilterOpen(false)
  }

  useEffect(() => {
    const closeFilter = (e: MouseEvent) => {
      if (isFilterOpen && !(e.target as Element).closest('.filter-dropdown')) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('click', closeFilter)
    return () => document.removeEventListener('click', closeFilter)
  }, [isFilterOpen])

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <div className="relative flex-grow">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
        <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      <div className="relative ml-2 filter-dropdown">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="ml-2 px-3 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 flex items-center transition-colors duration-300"
          aria-label="Open filter options"
        >
          <Filter className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">Filter</span>
          {(priceRange[0] > 0 || priceRange[1] < Infinity || selectedCategory !== 'All Categories') && (
            <span className="ml-1 bg-black text-white text-xs rounded-full w-2 h-2" aria-hidden="true"></span>
          )}
        </button>
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">Price Range</label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] === 0 ? '' : priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-1/2 px-2 py-1 border rounded-md mr-2 text-gray-800"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === Infinity ? '' : priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || Infinity])}
                  className="w-1/2 px-2 py-1 border rounded-md text-gray-800"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2 py-1 border rounded-md text-gray-800"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setPriceRange([0, Infinity])
                  setSelectedCategory('All Categories')
                }}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

