import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-300 to-blue-200 text-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Grama Urja Connect
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            Empowering rural communities with accessible energy services.  
            Built with ❤️ using React & Tailwind CSS.
          </p>
          <p className="text-white/80 text-xs mt-4">
            © 2025 Grama Urja Connect. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-white/90">
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/genie" className="hover:text-white">Ask Genie</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <Facebook className="w-6 h-6 text-white hover:text-purple-100 cursor-pointer" />
            <Twitter className="w-6 h-6 text-white hover:text-purple-100 cursor-pointer" />
            <Instagram className="w-6 h-6 text-white hover:text-purple-100 cursor-pointer" />
            <Linkedin className="w-6 h-6 text-white hover:text-purple-100 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
