import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactSection: React.FC = () => {
  // Use the useForm hook, passing your Formspree form ID
  const [state, handleSubmit] = useForm("xwplwekq");

  // If the form was submitted successfully, show the thank you message
  if (state.succeeded) {
      return (
          <div className="bg-white p-8 rounded shadow-sm text-center">
              <h3 className="text-xl font-light mb-4">Thank You!</h3>
              <p className="text-green-600">Your message has been sent successfully. We will contact you shortly about your photography session.</p>
          </div>
      );
  }

  // Otherwise, render the form
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
      {/* Use the handleSubmit function from the useForm hook */}
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
          disabled={state.submitting}
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-red-600 text-sm -mt-3" // Basic styling for errors
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
          disabled={state.submitting}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-600 text-sm -mt-3"
        />

        {/* Phone Input */}
        <label htmlFor="phone" className="sr-only">Phone Number</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="Your Phone"
          className="p-3 border border-gray-300"
          disabled={state.submitting}
        />
         <ValidationError
          prefix="Phone"
          field="phone"
          errors={state.errors}
          className="text-red-600 text-sm -mt-3"
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
          disabled={state.submitting}
        ></textarea>
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-600 text-sm -mt-3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.submitting} // Disable button while submitting
          className="p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Display general errors if they exist */}
        {state.errors && (
             <p className="text-red-600 mt-2 text-center">Something went wrong. Please check your input or try again later.</p>
        )}
      </form>
    </div>
  );
};

export default ContactSection;
