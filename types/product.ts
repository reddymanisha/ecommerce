import { StaticImageData } from "next/image"

export interface Product {
    id: number
    name: string
    price: number
    image: string | StaticImageData
    category: string
    gender: 'men' | 'women' | 'kids'
    type: string
    description: string
  }
  
  