import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Ensure this path is correct
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

function ApplicationForm({props}) {
    const { jobId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [jobDetails, setJobDetails] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            resume: e.target.files[0],
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        if (!formData.resume) newErrors.resume = 'Resume is required';
        if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            console.log('Form submitted successfully', formData);
            // Reset form after submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                resume: null,
                coverLetter: '',
            });
        } else {
            setErrors(validationErrors);
        }
    };

    // Fetch job details based on jobId
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (jobId) {
                const jobDoc = doc(db, 'CareerJobs', jobId);
                const jobSnapshot = await getDoc(jobDoc);
                if (jobSnapshot.exists()) {
                    const data = jobSnapshot.data();
                    console.log('Job Details:', data); // Log the job details
                    setJobDetails(data);
                } else {
                    console.error('No such job document!');
                }
            }
        };

        fetchJobDetails();
    }, [jobId]);

    return (
        <div className="p-6 bg-gradient-to-b from-indigo-100 to-white min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Application Form</h1>
                {jobDetails && (
                    <div className="mb-4">
                        <h2 className="text-xl font-bold">Job Title : {jobDetails.title}</h2>
                        <p className="text-gray-600">Job Type: {jobDetails.type || 'N/A'}</p>
                    </div>
                )}
                {submitted ? (
                    <p className="text-green-500 text-center">Application submitted successfully! </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-400 focus:ring-indigo-400 transition"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-400 focus:ring-indigo-400 transition"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-400 focus:ring-indigo-400 transition"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="resume">Resume:</label>
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-lg p-2 w-full focus:border-indigo-400 focus:ring-indigo-400 transition"
                            />
                            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="coverLetter">Cover Letter:</label>
                            <textarea
                                id="coverLetter"
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full h-28 focus:border-indigo-400 focus:ring-indigo-400 transition"
                            />
                            {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 transition duration-200"
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ApplicationForm;
