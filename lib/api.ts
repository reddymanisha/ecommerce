export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    color: string;
    size: string;
    image: string;
  }
  
  const products: Product[] = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      description: "A comfortable and versatile white t-shirt made from 100% cotton.",
      price: 19.99,
      category: "Men",
      subcategory: "T-Shirts",
      color: "White",
      size: "M",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      description: "Stylish slim fit jeans in a classic blue wash.",
      price: 49.99,
      category: "Women",
      subcategory: "Jeans",
      color: "Blue",
      size: "28",
      image: "/placeholder.svg?height=300&width=300"
    },
    // Add more products...
  ];
  
  export async function getProducts(category?: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (category && category !== 'all') {
      return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
    return products;
  }
  
  export async function getProduct(id: number): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return products.find(product => product.id === id) || null;
  }
  
  export async function getCategories(): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Array.from(new Set(products.map(product => product.category)));
  }
  
  export async function getSubcategories(category: string): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return Array.from(new Set(products
      .filter(product => product.category.toLowerCase() === category.toLowerCase())
      .map(product => product.subcategory)
    ));
  }
  