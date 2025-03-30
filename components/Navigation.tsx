import React from 'react';

interface NavigationProps {
  activeCategory: string;
  handleNavClick: (category: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeCategory, handleNavClick }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="flex">
        <button 
          onClick={() => handleNavClick('senior')} 
          className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'senior' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
        >
          Senior Grads
        </button>
        <button 
          onClick={() => handleNavClick('family')} 
          className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'family' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
        >
          Families
        </button>
        <button 
          onClick={() => handleNavClick('fashion')} 
          className={`mx-2 px-6 py-2 border-none bg-transparent cursor-pointer text-sm uppercase tracking-wide ${activeCategory === 'fashion' ? 'text-gray-800 font-normal' : 'text-gray-500 font-light'}`}
        >
          Fashion
        </button>
      </div>
    </div>
  );
};

export default Navigation;