import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react'; // Import useState
import { useForm, ValidationError } from '@formspree/react';
const ContactSection = () => {
    // Use the useForm hook, passing your Formspree form ID
    const [state, originalHandleSubmit] = useForm("xwplwekq"); // Rename original handleSubmit
    // State to store submitted data
    const [submittedName, setSubmittedName] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState('');
    // Wrapper function to capture data before submitting
    const handleFormSubmitWrapper = (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.currentTarget);
        setSubmittedName(formData.get('name') || '');
        setSubmittedEmail(formData.get('email') || '');
        setSubmittedMessage(formData.get('message') || '');
        // Call the original Formspree submit handler
        originalHandleSubmit(event);
    };
    // If the form was submitted successfully, show the personalized thank you message
    if (state.succeeded) {
        return (_jsxs("div", { className: "bg-white p-8 rounded shadow-sm text-center", children: [_jsxs("h3", { className: "text-xl font-light mb-4", children: ["Thank You", submittedName ? `, ${submittedName}` : '', "!"] }), _jsx("p", { className: "text-green-600 mb-4", children: "Your message has been sent successfully. We will contact you shortly about your photography session." }), _jsxs("div", { className: "text-left max-w-md mx-auto border-t pt-4 mt-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", submittedName] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", submittedEmail] }), _jsx("p", { children: _jsx("strong", { children: "Message:" }) }), _jsx("p", { className: "whitespace-pre-wrap", children: submittedMessage })] })] }));
    }
    // Otherwise, render the form
    return (_jsxs("div", { className: "bg-white p-8 rounded shadow-sm", children: [_jsx("h1", { className: "text-3xl font-light mb-4", children: "Contact Northern Spark Photography" }), _jsx("h2", { className: "text-2xl font-light mb-4", children: "Book Your Senior Grad Photography Session" }), _jsx("p", { className: "mb-6", children: "Ready to capture this milestone? Get in touch to book your senior grad photography session or learn more about creating unique, artistic portraits in the Nisswa, Minnesota area." }), _jsxs("div", { className: "mb-6", children: [_jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " northernsparkstudio@gmail.com"] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " (218) 270-8159"] })] }), _jsx("h3", { className: "text-xl font-light mb-4", children: "Send a Message" }), _jsxs("form", { onSubmit: handleFormSubmitWrapper, className: "grid gap-4 max-w-md", children: [_jsx("label", { htmlFor: "name", className: "sr-only", children: "Name" }), _jsx("input", { id: "name", type: "text", name: "name", placeholder: "Your Name", className: "p-3 border border-gray-300", required: true, disabled: state.submitting }), _jsx(ValidationError, { prefix: "Name", field: "name", errors: state.errors, className: "text-red-600 text-sm -mt-3" // Basic styling for errors
                     }), _jsx("label", { htmlFor: "email", className: "sr-only", children: "Email Address" }), _jsx("input", { id: "email", type: "email", name: "email", placeholder: "Your Email", className: "p-3 border border-gray-300", required: true, disabled: state.submitting }), _jsx(ValidationError, { prefix: "Email", field: "email", errors: state.errors, className: "text-red-600 text-sm -mt-3" }), _jsx("label", { htmlFor: "phone", className: "sr-only", children: "Phone Number" }), _jsx("input", { id: "phone", type: "tel", name: "phone", placeholder: "Your Phone", className: "p-3 border border-gray-300", disabled: state.submitting }), _jsx(ValidationError, { prefix: "Phone", field: "phone", errors: state.errors, className: "text-red-600 text-sm -mt-3" }), _jsx("label", { htmlFor: "message", className: "sr-only", children: "Message" }), _jsx("textarea", { id: "message", name: "message", placeholder: "Your Message (Tell us about your senior!)", rows: 5, className: "p-3 border border-gray-300", required: true, disabled: state.submitting }), _jsx(ValidationError, { prefix: "Message", field: "message", errors: state.errors, className: "text-red-600 text-sm -mt-3" }), _jsx("button", { type: "submit", disabled: state.submitting, className: "p-3 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: state.submitting ? 'Sending...' : 'Send Message' }), state.errors && (_jsx("p", { className: "text-red-600 mt-2 text-center", children: "Something went wrong. Please check your input or try again later." }))] })] }));
};
export default ContactSection;
