import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(true);
    const [countdown, setCountdown] = useState(5); // For the circle countdown
    const navigate = useNavigate(); // To navigate to another route

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (formData.email === 'admin@mitcode.com' && formData.password === 'mitcode@123') {
                setSubmitted(true);
                console.log('Login successful', formData);
            } else {
                alert("Wrong credentials!")
            }
            // Reset form after submission
            setFormData({ email: '', password: '' });
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        if (submitted && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            // navigate('/home'); // Redirect to home page after countdown finishes
        }
    }, [submitted, countdown, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-100 to-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>
                {submitted ? (
                    <>
                        <div className="flex justify-center mb-4">
                            <div className="relative h-20 w-20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-2xl text-indigo-600 font-bold">{countdown}</p>
                                </div>
                                <div className="circle h-full w-full border-4 border-transparent border-t-black rounded-full animate-spin-slow"></div>
                            </div>
                        </div>
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center text-sm">
                            Login successful! Redirecting in {countdown}...
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-400 focus:border-indigo-400 transition"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-600 transition duration-200"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
