'use client'

import { useSearchParams } from 'next/navigation'
import ProductList from '@/components/ProductList'
import { getAllProducts } from '@/lib/product'
import { Product } from '@/types/product'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const allProducts = getAllProducts()
  
  const searchResults: Product[] = allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    (product.type && product.type.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <ProductList products={searchResults} category={`Search Results for "${query}"`} />
  )
}

