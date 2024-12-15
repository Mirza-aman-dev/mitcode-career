import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate,useParams } from 'react-router-dom';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [jobs, setJobs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            const jobsCollection = collection(db, 'CareerJobs');
            const jobSnapshot = await getDocs(jobsCollection);
            const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(jobList);
        };

        fetchJobs();
    }, []);

    const totalApplications = jobs.reduce((acc, job) => acc + (job.applicants || 0), 0);

    return (
        <div className="p-6 bg-gradient-to-b from-purple-300 via-blue-200 to-white text-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-purple-600">{jobs.length} Jobs found</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <input
                    type="text"
                    placeholder="What do you want to do?"
                    className="border border-purple-300 p-4 rounded-lg w-full md:w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
                <div className="hidden md:flex flex-row space-x-4 ml-4">
                    <div className="w-full">
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="border border-purple-300 p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none"
                        >
                            <option value="">Select Job Type</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location"
                            className="border border-purple-300 p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                        />
                    </div>
                </div>
            </div>

            <div className="block md:hidden mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-3 bg-purple-500 text-white rounded-lg shadow-md transition duration-200 hover:bg-purple-600"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {showFilters && (
                <div className="flex flex-col mb-6 border border-purple-300 p-4 rounded-lg bg-white shadow-lg">
                    <h2 className="text-lg font-semibold text-purple-600 mb-2">Filters</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Type:</label>
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="border border-purple-300 p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white appearance-none"
                        >
                            <option value="">Select Job Type</option>
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter Location"
                            className="border border-purple-300 p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                        />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((item) => (
                    <div key={item.id} className="border border-purple-300 p-5 rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105">
                        <h2 className="text-2xl font-semibold text-purple-600">{item.title || 'Job Title'}</h2>
                        <p className="text-gray-600">{item.location || 'Location'}</p>
                        <h3 className="font-medium mt-3 text-purple-500">Minimum qualifications</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>{item.minQualification || 'Qualification 1'}</li>
                            {/* Add other qualifications as necessary */}
                        </ul>
                        <p className="text-gray-600">Total Applications: {item.applicants || 0}</p>
                        <a onClick={() => { navigate(`/apply/${item.id}`); }} className="text-purple-600 hover:underline cursor-pointer">Apply</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
