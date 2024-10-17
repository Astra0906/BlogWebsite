import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6">
            <form onSubmit={handleSubmit(create)} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign up</h2>

                <Input
                    label="Full name"
                    type="text"
                    placeholder="Enter your Name"
                    {...register("name", { required: true })}
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
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}
                />

                <Button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg mt-6 hover:bg-purple-700 transition duration-300"
                >
                    Sign up
                </Button>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
