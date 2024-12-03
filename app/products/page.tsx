import ProductList from '@/components/ProductList'
import { getAllProducts } from '@/lib/product'

export default function AllProducts() {
  const products = getAllProducts()
  return <ProductList products={products} category="All Products" />
}

