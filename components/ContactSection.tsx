import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      // Using the Netlify Forms API
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formState
        }).toString()
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Form submitted successfully
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('There was a problem submitting your form. Please try again or email us directly.');
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-sm">
      <h1 className="text-3xl font-light mb-4">Contact Northern Spark Photography</h1>
      <h2 className="text-2xl font-light mb-4">Book Your Senior Grad Photography Session</h2>
      <p className="mb-6">Ready to capture this milestone? Get in touch to book your senior grad photography session or learn more about creating unique, artistic portraits in the Nisswa, Minnesota area.</p>

      <div className="mb-6">
        <p><strong>Email:</strong> northernsparkstudio@gmail.com</p>
        <p><strong>Phone:</strong> (218) 270-8159</p>
      </div>

      <div className="mb-8">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded">
            <h3 className="text-xl font-medium mb-2">Thank you for your message!</h3>
            <p>We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-light mb-4">Send a Message</h3>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-4">
                <p>{error}</p>
              </div>
            )}
            <form 
              className="grid gap-4 max-w-md"
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              {/* Hidden field for Netlify Forms */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <input 
                type="text" 
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name" 
                className="p-3 border border-gray-300" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your Email" 
                className="p-3 border border-gray-300" 
                required 
              />
              <input 
                type="tel" 
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                placeholder="Your Phone" 
                className="p-3 border border-gray-300" 
              />
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your Message (Tell us about your senior!)" 
                rows={5} 
                className="p-3 border border-gray-300" 
                required
              ></textarea>
              <button 
                type="submit" 
                className={`p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors ${submitting ? 'opacity-75' : ''}`}
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
