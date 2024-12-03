import ProductList from '@/components/ProductList'
import { getProductsByGender } from '@/lib/product'

export default function KidsProducts() {
  const products = getProductsByGender('kids')
  return <ProductList products={products} category="Kids' Wear" />
}

