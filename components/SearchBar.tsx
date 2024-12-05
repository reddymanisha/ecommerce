'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 w-full md:w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Search
      </button>
      <div className="relative ml-2 filter-dropdown">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          Filter
          {(priceRange[0] > 0 || priceRange[1] < Infinity || selectedCategory !== 'All Categories') && (
            <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2 py-1">!</span>
          )}
        </button>
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
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

