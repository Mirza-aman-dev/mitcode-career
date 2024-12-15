import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config'; // Ensure this path is correct
import { collection, addDoc, getDocs } from 'firebase/firestore';
import 'tailwindcss/tailwind.css';

const MainPanel = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [newJobTitle, setNewJobTitle] = useState('');
    const [newJobType, setNewJobType] = useState('');
    const [minQualification, setMinQualification] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch jobs and applications from Firestore when the component mounts
    useEffect(() => {
        const fetchJobs = async () => {
            const jobsCollection = collection(db, 'CareerJobs');
            const jobSnapshot = await getDocs(jobsCollection);
            const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(jobList);
        };

        const fetchApplications = async () => {
            const applicationsCollection = collection(db, 'Applications');
            const applicationSnapshot = await getDocs(applicationsCollection);
            const applicationList = applicationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setApplications(applicationList);
        };

        fetchJobs();
        fetchApplications();
    }, []);

    // Handle adding a new job
    const handleAddJob = async () => {
        if (!newJobTitle || !newJobType || !minQualification) {
            alert("Please fill in all fields.");
            return;
        }

        const confirmation = window.confirm(`Adding new job "${newJobTitle}"?`);
        if (confirmation) {
            setLoading(true); // Start loading animation

            try {
                await addDoc(collection(db, 'CareerJobs'), {
                    title: newJobTitle,
                    type: newJobType,
                    minQualification: minQualification,
                });

                // Clear input fields
                setNewJobTitle('');
                setNewJobType('');
                setMinQualification('');
            } catch (error) {
                console.error("Error adding job: ", error);
            } finally {
                setLoading(false); // Stop loading animation
            }
        }
    };

    // Count the number of applications for each job
    const countApplicationsForJob = (jobId) => {
        return applications.filter(app => app.jobId === jobId).length; // Adjust based on your actual app structure
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex flex-col items-center">
            <header className="bg-indigo-500 text-white w-full p-4 shadow-lg">
                <h1 className="text-3xl font-semibold text-center">Admin Panel</h1>
            </header>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mt-10 space-y-8 lg:space-y-0 lg:space-x-10 px-4">
                {/* Jobs Section */}
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Jobs</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 text-left font-semibold text-gray-600">Job Title</th>
                                <th className="py-2 text-left font-semibold text-gray-600">Type</th>
                                <th className="py-2 text-left font-semibold text-gray-600">Applicants</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <tr key={job.id} className="border-t">
                                        <td className="py-2">{job.title}</td>
                                        <td className="py-2">{job.type}</td>
                                        <td className="py-2">{countApplicationsForJob(job.id)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="border-t">
                                    <td colSpan="4" className="py-2 text-center text-gray-600">
                                        No jobs available. Please add new jobs.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-6 flex flex-col space-y-4">
                        <h3 className="text-xl font-semibold text-gray-700">Add New Job</h3>
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={newJobTitle}
                            onChange={(e) => setNewJobTitle(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        <input
                            type="text"
                            placeholder="Job Type (e.g., Full-time, Part-time)"
                            value={newJobType}
                            onChange={(e) => setNewJobType(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        <input
                            type="text"
                            placeholder="Min Qualification"
                            value={minQualification}
                            onChange={(e) => setMinQualification(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-400 focus:border-indigo-400"
                        />
                        <button
                            onClick={handleAddJob}
                            className={`bg-indigo-500 text-white py-3 rounded-lg shadow-md hover:bg-indigo-600 transition flex items-center justify-center`}
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Add Job'
                            )}
                        </button>
                    </div>
                </div>

                {/* Applications Section */}
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Applications</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 text-left font-semibold text-gray-600">Applicant Name</th>
                                <th className="py-2 text-left font-semibold text-gray-600">Job Title</th>
                                <th className="py-2 text-left font-semibold text-gray-600">Status</th>
                                <th className="py-2 text-left font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="border-t">
                                    <td className="py-2">{app.name}</td>
                                    <td className="py-2">{app.jobTitle}</td>
                                    <td className="py-2">{app.status}</td>
                                    <td className="py-2">
                                        {app.status !== 'Interview Scheduled' && (
                                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition">
                                                View
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="mt-8 p-4 w-full text-center text-gray-600">
                © 2024 Admin Panel by MITCode
            </footer>
        </div>
    );
};

export default MainPanel;