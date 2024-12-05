export default function SiteFooter() {
  return (
    <footer className="bg-indigo-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-indigo-200">We are a leading e-commerce platform offering a wide range of products at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-indigo-200 hover:text-white transition-colors duration-300">Products</a></li>
              <li><a href="/about" className="text-indigo-200 hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="/contact" className="text-indigo-200 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="/terms" className="text-indigo-200 hover:text-white transition-colors duration-300">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-indigo-200">Email: info@example.com</p>
            <p className="text-indigo-200">Phone: (123) 456-7890</p>
            <p className="text-indigo-200">Address: 123 E-commerce St, City, Country</p>
          </div>
        </div>
        <div className="mt-8 text-center text-indigo-200">
          <p>&copy; 2023 E-commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

