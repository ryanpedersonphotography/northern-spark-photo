import React from 'react';

interface PricingSectionProps {
  handleNavClick: (category: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ handleNavClick }) => {
  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Investment & Packages</h1>
      <h2 className="text-2xl font-light mb-4">Quality Photography for Every Budget</h2>
      <p className="mb-8">At Northern Spark Photography, we believe in transparent pricing and customizable packages that meet your specific needs. All sessions include professional editing, online gallery, and print release.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Senior Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Senior Portraits</h3>
          <p className="text-3xl text-center font-light mb-4">$495</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>2-hour custom session</li>
            <li>Up to 3 locations</li>
            <li>4 outfit changes</li>
            <li>40+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
        
        {/* Family Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Family Session</h3>
          <p className="text-3xl text-center font-light mb-4">$395</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>1-hour session</li>
            <li>1 location</li>
            <li>2 outfit changes</li>
            <li>25+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Professional editing</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
        
        {/* Fashion Package */}
        <div className="border border-gray-200 p-8 bg-gray-50 flex flex-col h-full">
          <h3 className="text-2xl text-center font-light mb-4">Fashion Portfolio</h3>
          <p className="text-3xl text-center font-light mb-4">$695</p>
          <ul className="list-disc pl-6 mb-8 flex-grow">
            <li>3-hour creative session</li>
            <li>Multiple locations</li>
            <li>Unlimited outfit changes</li>
            <li>50+ digital images</li>
            <li>Print release</li>
            <li>Online gallery</li>
            <li>Advanced retouching</li>
          </ul>
          <button onClick={() => handleNavClick('contact')} className="bg-gray-800 text-white p-3 text-center uppercase tracking-wider text-sm">Book Now</button>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 border-l-4 border-gray-800 mt-8">
        <h3 className="text-xl font-light mb-4">Additional Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ul className="list-disc pl-6">
            <li>Extra hour: $150</li>
            <li>Additional location: $75</li>
            <li>Hair & makeup: $150</li>
            <li>Premium album: $295</li>
          </ul>
          <ul className="list-disc pl-6">
            <li>Wall art collections: Starting at $250</li>
            <li>Mini sessions: $250 (seasonal availability)</li>
            <li>Extended family: $75 additional</li>
            <li>Rush editing (48hr): $100</li>
          </ul>
        </div>
        <p>All packages can be customized to fit your specific needs. <button onClick={() => handleNavClick('contact')} className="underline">Contact us</button> for a personalized quote.</p>
      </div>
    </div>
  );
};

export default PricingSection;