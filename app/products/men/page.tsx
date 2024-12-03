import ProductList from '@/components/ProductList'
import { getProductsByGender } from '@/lib/product'

export default function MensProducts() {
  const products = getProductsByGender('men')
  return <ProductList products={products} category="Men's Wear" />
}

