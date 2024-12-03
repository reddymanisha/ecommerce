'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { getProductById, getRelatedProducts, getAllProducts } from '@/lib/product'
import ProductCard from '@/components/ProductCard'
import ReviewSection from '@/components/ReviewSection'

export default function ProductDetail() {
  const params = useParams()
  const productId = Number(params.id)
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  const { addToCart, removeFromCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  if (!product) {
    const availableProducts = getAllProducts().slice(0, 4); // Get first 4 products
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-4">The product you're looking for is not available. Here are some other products you might like:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {availableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  const handleCartAction = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id)
    } else {
      addToCart(product)
    }
  }

  const handleWishlistAction = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image src={product.image} alt={product.name} width={500} height={500} className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 capitalize">{product.gender}'s {product.type}</p>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleCartAction}
              className={`font-bold py-2 px-4 rounded ${
                isInCart(product.id)
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlistAction}
              className={`font-bold py-2 px-4 rounded ${
                isInWishlist(product.id)
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <ReviewSection productId={product.id} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(relatedProduct => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

