'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Filter } from 'lucide-react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
      <div className="relative flex-grow flex items-center overflow-hidden rounded-full border border-input bg-background">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 pr-8 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 bottom-0 hover:bg-transparent">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      <Button
        type="button"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        variant="outline"
        size="sm"
        className="rounded-full"
      >
        <Filter className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Filter</span>
      </Button>
      <div className="relative ml-2 filter-dropdown">
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4 dark:bg-gray-800 dark:border-gray-600">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1 dark:text-gray-200">Price Range</label>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] === 0 ? '' : priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-1/2 px-2 py-1 border rounded-md mr-2 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === Infinity ? '' : priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || Infinity])}
                  className="w-1/2 px-2 py-1 border rounded-md text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-1 dark:text-gray-200">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2 py-1 border rounded-md text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Books</option>
                <option>Price</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setPriceRange([0, Infinity])
                  setSelectedCategory('All Categories')
                }}
                className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 dark:bg-purple-500 dark:hover:bg-purple-700"
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

