import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: 'idle', message: '' }); // Reset status

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/.netlify/functions/send-email-api', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
        event.currentTarget.reset(); // Clear form
      } else {
        // Use error message from function if available, otherwise generic
        setFormStatus({ type: 'error', message: result.message || 'Sorry, there was an error sending your message. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
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
        {/* Removed Studio Address and Hours */}
      </div>

      {/* Removed Services List */}

      <h3 className="text-xl font-light mb-4">Send a Message</h3>
      {/* Use the new handleSubmit function */}
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        {/* Name Input */}
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3 border border-gray-300"
          required
          disabled={isSubmitting}
        />

        {/* Email Input */}
        <label htmlFor="email" className="sr-only">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          className="p-3 border border-gray-300"
          required
          disabled={isSubmitting}
        />

        {/* Subject Input (Added based on user's HTML) */}
        <label htmlFor="subject" className="sr-only">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          placeholder="Subject"
          className="p-3 border border-gray-300"
          required // Make subject required as per user's HTML
          disabled={isSubmitting}
        />

        {/* Phone Input */}
        <label htmlFor="phone" className="sr-only">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone" // Ensure name attribute exists if needed by function (optional field)
          placeholder="Your Phone (Optional)"
          className="p-3 border border-gray-300"
          disabled={isSubmitting}
        />

        {/* Message Textarea */}
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message (Tell us about your senior!)"
          rows={5}
          className="p-3 border border-gray-300"
          required
          disabled={isSubmitting}
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
          className="p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Display form status message */}
        {formStatus.type === 'success' && (
             <p className="text-green-600 mt-2 text-center">{formStatus.message}</p>
        )}
        {formStatus.type === 'error' && (
             <p className="text-red-600 mt-2 text-center">{formStatus.message}</p>
        )}
      </form>
    </div>
  );
};

export default ContactSection;
