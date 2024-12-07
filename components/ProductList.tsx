'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'
import { Product } from '@/types/product'

interface ProductListProps {
  products: Product[]
  category: string
}

export default function ProductList({ products, category }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedType, setSelectedType] = useState<string>('all')
  const productsPerPage = 6

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedType === 'all' || product.type === selectedType)
    )
  }, [products, priceRange, selectedType])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const uniqueTypes = ['all', ...new Set(products.map(product => product.type))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">{category}</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price Range</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="mt-1 block w-full"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
        <div>
          <label htmlFor="productType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Type</label>
          <select
            id="productType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

