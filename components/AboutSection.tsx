import React from 'react';

interface AboutSectionProps {
  handleNavClick: (category: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ handleNavClick }) => {
  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-light mb-4">About Northern Spark Photography</h1>
          <h2 className="text-2xl font-light mb-4">Nisswa's Premier Senior & Family Photography Studio</h2>
          <p className="mb-4">Northern Spark Photography specializes in capturing authentic moments with a unique artistic vision. Based in Nisswa, Minnesota, we offer professional photography services for seniors, families, events, and fashion throughout Minnesota.</p>
          <p className="mb-4">Our approach combines natural light, creative composition, and genuine connection to create images that tell your story in a way that's both timeless and contemporary.</p>
          <p className="mb-4">With over 10 years of experience, our team is dedicated to providing an exceptional photography experience from first consultation to final delivery.</p>
        </div>
        <div className="bg-gray-100 relative h-full min-h-64">
          <img src="/api/placeholder/600/750" alt="Professional photographer from Northern Spark Photography in Nisswa, Minnesota" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-light mb-4">Why Choose Northern Spark Photography?</h3>
        <ul className="list-disc pl-8 mb-6">
          <li>Personalized sessions tailored to your unique vision</li>
          <li>Professional editing and retouching</li>
          <li>Fast turnaround times</li>
          <li>Beautiful, customized products</li>
          <li>Based in Nisswa but available for travel throughout Minnesota</li>
        </ul>
        <p>Ready to book your session? <button onClick={() => handleNavClick('contact')} className="underline">Contact us today</button> to get started!</p>
      </div>
    </div>
  );
};

export default AboutSection;