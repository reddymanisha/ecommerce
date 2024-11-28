import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About StyleHub</h3>
            <p className="text-gray-300">Discover the latest trends in fashion at StyleHub. We offer a wide range of clothing, accessories, and footwear for men and women.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2023 StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

