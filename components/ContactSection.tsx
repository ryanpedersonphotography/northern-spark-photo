import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Contact Northern Spark Photography</h1>
      <h2 className="text-2xl font-light mb-4">Book Your Senior Grad Photography Session</h2>
      <p className="mb-6">Ready to capture this milestone? Get in touch to book your senior grad photography session or learn more about creating unique, artistic portraits in the Nisswa, Minnesota area.</p>

      <div className="mb-6">
        <p><strong>Email:</strong> northernsparkstudio@gmail.com</p>
        <p><strong>Phone:</strong> (218) 270-8159</p>
        {/* Removed Studio Address and Hours */}
      </div>

      {/* Removed Services List */}

      <h3 className="text-xl font-light mb-4">Send a Message</h3>
      <form className="grid gap-4 max-w-md">
        <input type="text" placeholder="Your Name" className="p-3 border border-gray-300" required />
        <input type="email" placeholder="Your Email" className="p-3 border border-gray-300" required />
        <input type="tel" placeholder="Your Phone" className="p-3 border border-gray-300" />
        {/* Removed Service Select Dropdown */}
        <textarea placeholder="Your Message (Tell us about your senior!)" rows={5} className="p-3 border border-gray-300" required></textarea>
        <button type="submit" className="p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors">Send Message</button>
      </form>
    </div>
  );
};

export default ContactSection;
