import { Suspense } from 'react'
import { getProducts, getCategories, getSubcategories } from '@/lib/api'
import ProductGrid from '@/components/ui/Home/ProductGrid'
import CategoryFilters from '@/components/ui/Home/CategoryFilters'
import type { FilterType } from '@/types'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.toLowerCase(),
  }))
}

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    subcategory?: string
    color?: string
    size?: string
    priceRange?: string
    sort?: string
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const products = await getProducts(params.slug)
  const categories = await getCategories()
  const subcategories = await getSubcategories(params.slug)

  const initialFilters: FilterType = {
    subcategory: searchParams.subcategory?.split(',') || [],
    color: searchParams.color?.split(',') || [],
    size: searchParams.size?.split(',') || [],
    priceRange: searchParams.priceRange || '',
    sort: searchParams.sort || '',
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <CategoryFilters 
        categories={categories} 
        subcategories={subcategories} 
        initialFilters={initialFilters}
      />
      <div className="md:col-span-3">
        <h1 className="text-2xl font-semibold mb-4 capitalize">
          {params.slug === 'all' ? 'All Products' : params.slug}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductGrid products={products} />
        </Suspense>
      </div>
    </div>
  )
}

