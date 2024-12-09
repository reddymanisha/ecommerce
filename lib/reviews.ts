interface Review {
  id: number
  userId: number
  productId: number
  rating: number
  comment: string
  userName: string
  createdAt: string
}
 const reviews: Review[] = [
  {
    id: 1,
    userId: 1,
    productId: 1,
    rating: 5,
    comment: "Excellent camera! The image quality is outstanding.",
    userName: "John Doe",
    createdAt: "2023-05-01T10:00:00Z"
  },
  {
    id: 2,
    userId: 2,
    productId: 1,
    rating: 4,
    comment: "Great camera, but a bit pricey.",
    userName: "Jane Smith",
    createdAt: "2023-05-02T14:30:00Z"
  },
  {
    id: 3,
    userId: 3,
    productId: 2,
    rating: 5,
    comment: "Beautiful dress, fits perfectly!",
    userName: "Emily Johnson",
    createdAt: "2023-05-03T09:15:00Z"
  },
  {
    id: 4,
    userId: 4,
    productId: 3,
    rating: 4,
    comment: "Comfortable shorts, my kid loves them.",
    userName: "Michael Brown",
    createdAt: "2023-05-04T16:45:00Z"
  }
]

let nextReviewId = 5

export function getReviews(productId: number): Review[] {
  return reviews.filter(review => review.productId === productId)
}

export function addReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Review {
  const newReview: Review = {
    ...reviewData,
    id: nextReviewId++,
    createdAt: new Date().toISOString(),
  }
  reviews.push(newReview)
  return newReview
}

