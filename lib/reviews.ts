interface Review {
    id: number
    userId: number
    productId: number
    rating: number
    comment: string
    userName: string
    createdAt: string
  }
  
  let reviews: Review[] = []
  let nextReviewId = 1
  
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
  
  