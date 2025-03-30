import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Contact Northern Spark Photography</h1>
      <h2 className="text-2xl font-light mb-4">Book Your Professional Photography Session in Nisswa, Minnesota</h2>
      <p className="mb-6">We'd love to hear from you! Get in touch to book a session or learn more about our professional photography services in Nisswa, Brainerd, Baxter and throughout Central Minnesota. We specialize in senior portraits, family photography, and fashion shoots that capture your authentic moments with our unique artistic vision.</p>
      
      <div className="mb-6">
        <p><strong>Email:</strong> info@northernsparkphoto.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Studio:</strong> 123 Main Street, Nisswa, MN 56468</p>
        <p><strong>Hours:</strong> Monday-Friday 9am-5pm | Weekends by appointment</p>
      </div>
      
      <h3 className="text-xl font-light mb-4">Our Photography Services</h3>
      <ul className="list-disc pl-8 mb-6">
        <li>Senior Portraits</li>
        <li>Family Photography</li>
        <li>Fashion Photography</li>
        <li>Wedding Photography</li>
        <li>Event Photography</li>
      </ul>
      
      <form className="grid gap-4 max-w-md">
        <input type="text" placeholder="Your Name" className="p-3 border border-gray-300" required />
        <input type="email" placeholder="Your Email" className="p-3 border border-gray-300" required />
        <input type="tel" placeholder="Your Phone" className="p-3 border border-gray-300" />
        <select className="p-3 border border-gray-300" required>
          <option value="">Select Service</option>
          <option value="senior">Senior Portraits</option>
          <option value="family">Family Photography</option>
          <option value="fashion">Fashion Photography</option>
          <option value="wedding">Wedding Photography</option>
          <option value="event">Event Photography</option>
        </select>
        <textarea placeholder="Your Message" rows={5} className="p-3 border border-gray-300" required></textarea>
        <button type="submit" className="p-3 bg-gray-800 text-white cursor-pointer">Send Message</button>
      </form>
    </div>
  );
};

export default ContactSection;