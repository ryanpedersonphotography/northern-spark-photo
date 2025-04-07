import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  // State for submission status can be simplified or removed if not needed for UI feedback
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  // Netlify handles submission, so custom handleSubmit is not needed unless doing AJAX submission
  // If using standard HTML form submission, this function can be removed.
  // If using AJAX with Netlify, the fetch logic needs to be adapted.
  // For simplicity, we'll rely on standard HTML form submission for now.

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
      {/* Configure form for Netlify */}
      <form
        name="contact" // Name used by Netlify to identify the form
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field" // Honeypot field name
        className="grid gap-4 max-w-md"
        // onSubmit={handleSubmit} // Remove if using standard HTML submission
      >
        {/* Netlify requires this hidden field for standard HTML forms */}
        <input type="hidden" name="form-name" value="contact" />
        {/* Honeypot field (should be hidden with CSS or visually hidden) */}
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>

        {/* Name Input */}
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          className="p-3 border border-gray-300"
          required
          // disabled={isSubmitting} // Remove if not using JS submission state
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
          // disabled={isSubmitting} // Remove if not using JS submission state
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
          // disabled={isSubmitting} // Remove if not using JS submission state
        />

        {/* Phone Input */}
        <label htmlFor="phone" className="sr-only">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone" // Ensure name attribute exists if needed by function (optional field)
          placeholder="Your Phone (Optional)"
          className="p-3 border border-gray-300"
          // disabled={isSubmitting} // Remove if not using JS submission state
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
          // disabled={isSubmitting} // Remove if not using JS submission state
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          // disabled={isSubmitting} // Remove if not using JS submission state
          className="p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* {isSubmitting ? 'Sending...' : 'Send Message'} */}
          Send Message {/* Simplified button text */}
        </button>

        {/* Display form status message - Netlify handles success/error pages by default */}
        {/* You can customize this with AJAX submission if needed */}
        {/* {formStatus.type === 'success' && (
             <p className="text-green-600 mt-2 text-center">{formStatus.message}</p>
        )}
        {formStatus.type === 'error' && (
             <p className="text-red-600 mt-2 text-center">{formStatus.message}</p>
        )} */}
      </form>
    </div>
  );
};

export default ContactSection;
