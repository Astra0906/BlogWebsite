import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authservice from '../appwrite/auth';
import { login as storelogin } from '../store/authSlice';
import Input from './Input';
import Button from './Button';
import Logo from './Logo';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, seterror] = useState("")
    const login = async (data) => {
        seterror("");
        try {
            const session = await authservice.login(data);

            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) {
                    dispatch(storelogin(userData))
                    navigate("/");
                }
            }
        } catch (error) {
            seterror(error.message);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 ">
           
            <form onSubmit={handleSubmit(login)} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign in</h2>

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                        }
                    })}

                />

                <Input
                    label="Password"
                    type="password"
                    
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}

                />

                <Button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg mt-6 hover:bg-purple-700 transition duration-300">
                    Log In
                </Button>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;