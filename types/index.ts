export type Product = {
    id: number
    name: string
    description: string
    price: number
    category: string
    subcategory: string
    color: string
    size: string
    image: string
  }
  
  export type CartItem = {
    id: number
    name: string
    description: string
    price: number
    category: string
    subcategory: string
    color: string
    size: string
    image: string
    quantity: number
  }
  
  export type WishlistItem = Product
  
  export type User = {
    id: string
    name: string | null
    email: string | null
    image?: string | null
  }
  
  export type FilterType = {
    subcategory: string[]
    color: string[]
    size: string[]
    priceRange: string
    sort: string
  }
  
  