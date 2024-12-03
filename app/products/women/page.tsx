import ProductList from '@/components/ProductList'
import { getProductsByGender } from '@/lib/product'

export default function WomensProducts() {
  const products = getProductsByGender('women')
  return <ProductList products={products} category="Women's Wear" />
}

