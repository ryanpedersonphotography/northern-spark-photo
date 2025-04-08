import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm font-light">© {new Date().getFullYear()} Northern Spark Photography. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/northernsparkstudio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
              <span className="text-sm font-light uppercase tracking-wide">Instagram</span>
            </a>
            <a href="https://www.facebook.com/northernsparkstudio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
              <span className="text-sm font-light uppercase tracking-wide">Facebook</span>
            </a>
            <a href="https://vsco.co/northernsparkstudio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
              <span className="text-sm font-light uppercase tracking-wide">VSCO</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
