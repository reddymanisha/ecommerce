export default function SiteFooter() {
  return (
    <footer className="bg-indigo-900 text-white py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-indigo-200 dark:text-gray-300">We are a leading VibeValthu platform offering a wide range of products at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-indigo-200 hover:text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-white">Products</a></li>
              <li><a href="/about" className="text-indigo-200 hover:text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-white">About</a></li>
              <li><a href="/contact" className="text-indigo-200 hover:text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-white">Contact</a></li>
              <li><a href="/terms" className="text-indigo-200 hover:text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-indigo-200 dark:text-gray-300">Email: info@example.com</p>
            <p className="text-indigo-200 dark:text-gray-300">Phone: (123) 456-7890</p>
            <p className="text-indigo-200 dark:text-gray-300">Address: 123 E-commerce St, City, Country</p>
          </div>
        </div>
        <div className="mt-8 text-center text-indigo-200 dark:text-gray-300">
          <p>&copy; 2023 VibeValthu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

