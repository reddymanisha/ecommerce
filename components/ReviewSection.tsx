'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { addReview, getReviews } from '@/lib/reviews'
import Link from 'next/link';

interface Review {
  id: number
  userId: number
  productId: number
  rating: number
  comment: string
  userName: string
  createdAt: string
}

export default function ReviewSection({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    setReviews(getReviews(productId))
  }, [productId])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      const newReview = addReview({
        userId: user.id,
        productId,
        rating,
        comment,
        userName: user.name,
      })
      setReviews([...reviews, newReview])
      setRating(0)
      setComment('')
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="dark:text-gray-300">No reviews yet. Be the first to review this product!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded dark:border-gray-700">
            <div className="flex items-center mb-2">
              <div className="font-bold mr-2 dark:text-white">{review.userName}</div>
              <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p className="dark:text-gray-300">{review.comment}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</div>
          </div>
        ))
      )}
      {user ? (
        <form onSubmit={handleSubmitReview} className="mt-8">
          <h3 className="text-xl font-bold mb-4 dark:text-white">Write a Review</h3>
          <div className="flex items-center mb-4">
            <label htmlFor="rating" className="mr-2 dark:text-white">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  aria-label={`Rate ${star} stars`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2 dark:text-white">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-500">
            Submit Review
          </button>
        </form>
      ) : (
        <p className="mt-8 dark:text-white">Please <Link href="/signin" className="text-blue-500 hover:underline">sign in</Link> to leave a review.</p>
      )}
    </div>
  )
}

