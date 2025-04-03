import React from 'react';

interface NavigationProps {
  activeCategory: string;
  handleNavClick: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeCategory, handleNavClick }) => {
  return (
    <div className="flex justify-center mb-4"> {/* Reduced bottom margin */}
      <div className="flex">
        <button
          onClick={() => handleNavClick('senior-grads')} // Updated category key
          className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'senior-grads' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`} // Updated active check
        >
          Senior Grads
        </button>
        {/* Removed Families button */}
        {/* Removed Fashion button */}
        <button
          onClick={() => handleNavClick('nature')} // Added Nature category
          className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'nature' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`} // Added active check
        >
          Nature
        </button>
      </div>
    </div>
  );
};

export default Navigation;
