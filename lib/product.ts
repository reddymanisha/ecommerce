import { Product } from '@/types/product'


const products: Product[] = [
  { 
    id: 1, 
    name: "Digital Camera Pro", 
    price: 599.99, 
    image: "/assets/camera.jpeg", 
    category: 'Electronics', 
    gender: 'men', 
    type: 'electronics',
    description: "Professional grade digital camera with advanced features"
  },
  { 
    id: 2, 
    name: "Women's Dress", 
    price: 49.99, 
    image: '/placeholder.svg', 
    category: 'Clothing', 
    gender: 'women', 
    type: 'dress',
    description: "Elegant dress perfect for any occasion"
  },
  { id: 3, name: "Kids' Shorts", price: 14.99, image: '/placeholder.svg', category: 'Clothing', gender: 'kids', type: 'pants', description: "Comfortable shorts for kids" },
  { id: 4, name: "Men's Jeans", price: 39.99, image: '/placeholder.svg', category: 'Clothing', gender: 'men', type: 'pants', description: "Durable men's jeans" },
  { id: 5, name: "Women's Blouse", price: 29.99, image: '/placeholder.svg', category: 'Clothing', gender: 'women', type: 'shirt', description: "Stylish women's blouse" },
  { id: 6, name: "Kids' T-Shirt", price: 9.99, image: '/placeholder.svg', category: 'Clothing', gender: 'kids', type: 'shirt', description: "Soft kids' t-shirt" },
  { id: 7, name: "Men's Sweater", price: 44.99, image: '/placeholder.svg', category: 'Clothing', gender: 'men', type: 'shirt', description: "Warm men's sweater" },
  { id: 8, name: "Women's Jeans", price: 54.99, image: '/placeholder.svg', category: 'Clothing', gender: 'women', type: 'pants', description: "Classic women's jeans" },
  { id: 9, name: "Kids' Jacket", price: 34.99, image: '/placeholder.svg', category: 'Clothing', gender: 'kids', type: 'jacket', description: "Protective kids' jacket" },
  { id: 10, name: "Men's Jacket", price: 79.99, image: '/placeholder.svg', category: 'Clothing', gender: 'men', type: 'jacket', description: "Stylish men's jacket" },
  { id: 11, name: "Women's Sweater", price: 59.99, image: '/placeholder.svg', category: 'Clothing', gender: 'women', type: 'shirt', description: "Cozy women's sweater" },
  { id: 12, name: "Kids' Pants", price: 24.99, image: '/placeholder.svg', category: 'Clothing', gender: 'kids', type: 'pants', description: "Versatile kids' pants" },
  { id: 13, name: "Men's Shorts", price: 29.99, image: '/placeholder.svg', category: 'Clothing', gender: 'men', type: 'pants', description: "Relaxed men's shorts" },
  { id: 14, name: "Women's Skirt", price: 39.99, image: '/placeholder.svg', category: 'Clothing', gender: 'women', type: 'other', description: "Trendy women's skirt" },
  { id: 15, name: "Kids' Dress", price: 29.99, image: '/placeholder.svg', category: 'Clothing', gender: 'kids', type: 'dress', description: "Adorable kids' dress" },
  { id: 16, name: "Men's T-Shirt", price: 19.99, image: '/placeholder.svg', category: 'Clothing', gender: 'men', type: 'shirt', description: "Classic men's t-shirt" },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductsByGender(gender: 'men' | 'women' | 'kids'): Product[] {
  return products.filter(product => product.gender === gender)
}

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

export function getRelatedProducts(productId: number): Product[] {
  const product = getProductById(productId)
  if (!product) return []

  return products
    .filter(p => p.id !== productId && (p.gender === product.gender || p.type === product.type))
    .slice(0, 4)
}

