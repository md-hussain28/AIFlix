import React from 'react';
import { FaTwitter, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        {/* Branding */}
        <h1 className="text-2xl font-bold text-red-800 mb-4">AiFlix</h1>
        <p className="text-gray-400 mb-6">Discover your next favorite movie.</p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://twitter.com" className="text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-125 duration-300">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="https://facebook.com" className="text-gray-400 hover:text-gray-100 transition-transform transform hover:scale-125 duration-300">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition-transform transform hover:scale-125 duration-300">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition-transform transform hover:scale-125 duration-300">
            <FaLinkedinIn className="w-6 h-6" />
          </a>
        </div>

        {/* Legal Information */}
        <p className="text-gray-400 text-sm mb-4">© 2024 AiFlix. All rights reserved. Md Saquib Hussain</p>
        <div className="flex justify-center space-x-6">
          <a href="#privacy" className="text-gray-400 hover:text-white transition-opacity opacity-70 hover:opacity-100 duration-300">Privacy Policy</a>
          <a href="#terms" className="text-gray-400 hover:text-white transition-opacity opacity-70 hover:opacity-100 duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
