import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle'); // Reset status on new submission attempt
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('https://formspree.io/f/xwplwekq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Important for AJAX submission to Formspree
        }
      });

      if (response.ok) {
        setSubmissionStatus('success');
        event.currentTarget.reset(); // Clear form fields on success
      } else {
        // Log potential error details from Formspree if available
        response.json().then(data => {
          if (data && data.errors) {
            console.error("Formspree errors:", data.errors);
          } else {
            console.error("Formspree submission failed with status:", response.status);
          }
        }).catch(() => {
          console.error("Formspree submission failed, non-JSON response:", response.status);
        });
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      setSubmissionStatus('error');
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
      {/* Updated form tag to use onSubmit handler */}
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input type="text" name="name" placeholder="Your Name" className="p-3 border border-gray-300" required disabled={isSubmitting} />
        <input type="email" name="email" placeholder="Your Email" className="p-3 border border-gray-300" required disabled={isSubmitting} />
        <input type="tel" name="phone" placeholder="Your Phone" className="p-3 border border-gray-300" disabled={isSubmitting} />
        {/* Removed Service Select Dropdown */}
        <textarea name="message" placeholder="Your Message (Tell us about your senior!)" rows={5} className="p-3 border border-gray-300" required disabled={isSubmitting}></textarea>
        {/* Updated button to show status and disable during submission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
         {/* Conditional success/error messages */}
         {submissionStatus === 'success' && (
          <p className="text-green-600 mt-2 text-center">Thank you for your message! We will contact you shortly about your photography session.</p>
        )}
        {submissionStatus === 'error' && (
          <p className="text-red-600 mt-2 text-center">Something went wrong. Please try again later or contact us directly via phone or email.</p>
        )}
      </form>
    </div>
  );
};

export default ContactSection;
