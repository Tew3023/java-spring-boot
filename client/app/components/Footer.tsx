import { Facebook, X, Instagram, Linkedin } from 'lucide-react'; // Import Lucide icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-lg mx-auto px-6">
        {/* Footer Top: Company Info and Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Company</h3>
            <p className="text-lg">
              Delivering healthy and delicious meals straight to your door. We believe in freshness, quality, and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Subscribe</h3>
            <p className="text-lg mb-4">Stay updated with our latest news and offers.</p>
          </div>
        </div>

        {/* Footer Bottom: Social Media */}
        <div className="flex justify-center gap-6">
          <a href="#" className="text-2xl hover:text-green-500 transition-all duration-300">
            <Facebook />
          </a>
          <a href="#" className="text-2xl hover:text-green-500 transition-all duration-300">
            <X /> {/* Using 'X' for Twitter */}
          </a>
          <a href="#" className="text-2xl hover:text-green-500 transition-all duration-300">
            <Instagram />
          </a>
          <a href="#" className="text-2xl hover:text-green-500 transition-all duration-300">
            <Linkedin />
          </a>
        </div>

        {/* Footer Bottom Text */}
        <div className="text-center text-sm mt-6 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
