'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterType } from '@/types'

interface CategoryFiltersProps {
  categories?: string[] // Make categories optional
  subcategories: string[]
  initialFilters: FilterType
}

export default function CategoryFilters({ 
  categories, // Optional, in case you want to use it later
  subcategories, 
  initialFilters 
}: CategoryFiltersProps) {
  const router = useRouter()
  const [filters, setFilters] = useState<FilterType>(initialFilters)

  const handleFilterChange = (filterType: keyof FilterType, value: string) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters }
      if (filterType === 'priceRange' || filterType === 'sort') {
        updatedFilters[filterType] = value
      } else {
        const filterArray = prevFilters[filterType]
        updatedFilters[filterType] = filterArray.includes(value)
          ? filterArray.filter(item => item !== value)
          : [...filterArray, value]
      }
      return updatedFilters
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','))
      } else if (typeof value === 'string' && value) {
        params.set(key, value)
      }
    })
    router.push(`?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      subcategory: [],
      color: [],
      size: [],
      priceRange: '',
      sort: '',
    })
    router.push(window.location.pathname)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Subcategories</h3>
        {subcategories.map((subcategory) => (
          <div key={subcategory} className="flex items-center space-x-2">
            <Checkbox
              id={`subcategory-${subcategory}`}
              checked={filters.subcategory.includes(subcategory)}
              onCheckedChange={() => handleFilterChange('subcategory', subcategory)}
            />
            <Label htmlFor={`subcategory-${subcategory}`}>{subcategory}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Color</h3>
        {['Black', 'White', 'Red', 'Blue', 'Green'].map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`color-${color}`}
              checked={filters.color.includes(color)}
              onCheckedChange={() => handleFilterChange('color', color)}
            />
            <Label htmlFor={`color-${color}`}>{color}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
          <div key={size} className="flex items-center space-x-2">
            <Checkbox
              id={`size-${size}`}
              checked={filters.size.includes(size)}
              onCheckedChange={() => handleFilterChange('size', size)}
            />
            <Label htmlFor={`size-${size}`}>{size}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Select
          value={filters.priceRange}
          onValueChange={(value) => handleFilterChange('priceRange', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50">$0 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200+">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sort By</h3>
        <Select
          value={filters.sort}
          onValueChange={(value) => handleFilterChange('sort', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select sorting option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-x-2">
        <Button onClick={applyFilters}>Apply Filters</Button>
        <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
      </div>
    </div>
  )
}