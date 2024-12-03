export default function SiteFooter() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p>We are a leading e-commerce platform offering a wide range of products at competitive prices.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/products" className="hover:underline">Products</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
                <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Email: info@example.com</p>
              <p>Phone: (123) 456-7890</p>
              <p>Address: 123 E-commerce St, City, Country</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 E-commerce Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
  
  