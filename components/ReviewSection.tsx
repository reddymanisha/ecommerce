'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext' // Update 1: Replaced import statement
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
  const [reviews, setReviews] = useState<Review[]>(getReviews(productId))
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const { user } = useAuth()

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
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 p-4 border rounded">
          <div className="flex items-center mb-2">
            <div className="font-bold mr-2">{review.userName}</div>
            <div className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          </div>
          <p>{review.comment}</p>
          <div className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</div>
        </div>
      ))}
      {user ? (
        <form onSubmit={handleSubmitReview} className="mt-8">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-2">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value} Star{value !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit Review
          </button>
        </form>
      ) : (
        <p className="mt-8">Please <Link href="/signin" className="text-blue-500 hover:underline">sign in</Link> to leave a review.</p> // Update 2: Replaced <a> with <Link>
      )}
    </div>
  )
}

