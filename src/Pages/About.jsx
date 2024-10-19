import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1200, // Animation duration
            offset: 50, // Offset to trigger animations earlier/later
            easing: 'ease-in-out', // Smooth animation effect
            mirror: true, // Allows animation on both scroll up and down
            once: false, // Enable re-animation on scrolling back up
        });

        // Refresh AOS animations when the component mounts
        AOS.refresh();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-6" data-aos="fade-up">
                    About{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        BlogSite
                    </span>
                </h1>
                <p className="text-lg leading-relaxed mb-12" data-aos="fade-up">
                    BlogSite is your go-to platform for sharing stories, experiences, and ideas. Our mission is to create a vibrant community where
                    people connect through their words and thoughts, sparking inspiration and meaningful conversations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg" data-aos="fade-right">
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-base leading-relaxed">
                            We envision a space where writers, thinkers, and dreamers come together to build a community that thrives on openness and
                            creativity. Our goal is to make content creation simple and accessible to everyone.
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg" data-aos="fade-left">
                        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-base leading-relaxed">
                            We aim to empower individuals to share their stories with the world. Whether you are a blogger, student, or professional,
                            BlogSite provides the tools to publish content and reach a wider audience effortlessly.
                        </p>
                    </div>
                </div>

                <div className="mt-12" data-aos="fade-up">
                    <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
                    <p className="text-base leading-relaxed mb-8">
                        Our passionate team of developers, designers, and writers work tirelessly to create an enjoyable experience for you. We believe in
                        fostering creativity and building lasting connections.
                    </p>
                </div>

                <div className="flex justify-center gap-4 mt-6" data-aos="zoom-in">
                    <button
                        onClick={() => {
                            navigate('/contact');
                        }}
                        className="px-6 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition duration-300"
                    >
                        Contact Us
                    </button>
                    <button
                        onClick={() => {
                            navigate('/all-posts');
                        }}
                        className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    >
                        Explore Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
