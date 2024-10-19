import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import authservice from '../appwrite/auth';
import { login as sLogin } from '../store/authSlice';
import Input from './Input';
import Button from './Button';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        setError("");
        try {
            const resp = await authservice.createAccount(data);
            if (resp) {
                const userData = await authservice.getCurrentUser();
                if (userData) {
                    dispatch(sLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        },
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Backdrop Elements */}
            <div className="absolute -top-16 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute top-36 left-8 w-48 h-48 bg-pink-500/10 rounded-full blur-xl"></div>

            {/* Signup Form with Motion Animation */}
            <motion.form
                onSubmit={handleSubmit(create)}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative backdrop-blur-xl bg-white/10 shadow-xl border border-gray-800/50 rounded-2xl p-6 w-full max-w-lg sm:p-8 z-10"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
                    Sign up
                </h2>

                <Input
                    label="Full name"
                    type="text"
                    placeholder="Enter your Name"
                    {...register("name", { required: true })}
                    className="mb-4"
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPattern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                        },
                    })}
                    className="mb-4"
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}
                    className="mb-6"
                />

                <Button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-4 hover:bg-indigo-700 shadow-lg transition duration-300 transform hover:scale-105"
                >
                    Sign up
                </Button>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-indigo-500 font-semibold"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.form>
        </div>
    );
};

export default Signup;
