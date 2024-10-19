import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import emailjs from '@emailjs/browser';
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const form = useRef()

    useEffect(() => {
        AOS.init({
            duration: 1200,
            offset: 50,
            easing: 'ease-in-out',
            mirror: true, // Animations on scroll up and down
            once: false, // Allow re-animation every time in the viewport
        });
        AOS.refresh(); // Refresh on mount to apply animations
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
          
        emailjs
      .sendForm('service_751uwaj', 'template_h6ups2h', form.current, {
        publicKey: 'LRmoSjmB4VaRk4MvI',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
        toast.success('Message sent successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
        setFormData({ name: '', email: '', message: '' }); // Clear the form
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        Contact Us
                    </span>
                </h1>
                <p className="text-lg text-center mb-12" data-aos="fade-up">
                    Have questions or need help? Get in touch with us, and we’ll get back to you as soon as possible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="flex flex-col space-y-6" data-aos="fade-right">
                        <div className="flex items-center space-x-4">
                            <FaEnvelope size={24} className="text-blue-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Email</h2>
                                <p>2023ugec096@nitjsr.ac.in</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaPhone size={24} className="text-green-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Phone</h2>
                                <p>+91 98-6486-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt size={24} className="text-red-400" />
                            <div>
                                <h2 className="text-xl font-semibold">Address</h2>
                                <p>NIT Jamshedpur, Jamshedpur, JH 831014</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        ref={form}

                        onSubmit={handleSubmit}
                        className="bg-gray-800 rounded-lg p-8 shadow-lg"
                        data-aos="fade-left"
                    >
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition duration-300"
                            data-aos="zoom-in"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Contact;
