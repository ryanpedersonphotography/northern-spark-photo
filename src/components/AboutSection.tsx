import React from 'react';
import a1 from '../images/a1.jpg';
import a2 from '../images/a2.jpg';
import a3 from '../images/a3.jpg';
import a4 from '../images/a4.jpg';
import a5 from '../images/a5.jpg';

interface AboutSectionProps {
  handleNavClick: (category: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ handleNavClick }) => {
  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-light mb-4">About Northern Spark Photography</h1>
        <h2 className="text-2xl font-light mb-4">Nisswa's Premier Senior & Family Photography Studio</h2>
        <p className="mb-4">As a Christian photographer from Brainerd, Minnesota, I bring both faith and artistry to every session. Northern Spark Photography specializes in capturing authentic moments that celebrate God's creation through professional photography services for seniors, families, events, and fashion throughout Minnesota.</p>
        <p className="mb-4">With over 15 years of experience behind the lens, I've developed an approach that combines natural light, creative composition, and genuine connection to create images that tell your story in a way that's both timeless and contemporary.</p>
        <p className="mb-4">My journey began in Brainerd, where I discovered my passion for photography, and has led me to serve countless families and individuals throughout central Minnesota, creating lasting memories that reflect both professional excellence and Christian values.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 my-8">
        <img src={a1} alt="Photography sample 1" className="w-full h-64 object-cover rounded" />
        <img src={a2} alt="Photography sample 2" className="w-full h-64 object-cover rounded" />
        <img src={a3} alt="Photography sample 3" className="w-full h-64 object-cover rounded" />
        <img src={a4} alt="Photography sample 4" className="w-full h-64 object-cover rounded col-span-2" />
        <img src={a5} alt="Photography sample 5" className="w-full h-64 object-cover rounded" />
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
