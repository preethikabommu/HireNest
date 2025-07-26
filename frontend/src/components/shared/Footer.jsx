import React from 'react';
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className='w-8 h-8 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg flex items-center justify-center'>
                <Building2 className='w-5 h-5 text-white' />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                HireNest
              </h2>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your trusted partner in career growth. Connect with top companies, discover opportunities, 
              and build your professional future with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" className="w-10 h-10 bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" className="w-10 h-10 bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="w-10 h-10 bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center transition-colors duration-200" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Home</a></li>
              <li><a href="/jobs" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Find Jobs</a></li>
              <li><a href="/browse" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Browse Companies</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">My Profile</a></li>
              <li><a href="/login" className="text-gray-300 hover:text-sky-400 transition-colors duration-200">Login</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-sky-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">hello@hirnest.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 HireNest. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-sky-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-sky-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-sky-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;