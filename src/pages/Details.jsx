import React, { useState } from 'react';

function Details() {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar with border and card-like job listings */}
            <div className="md:w-1/4 p-4 bg-white border-r border-gray-300 hidden md:block">
                <h2 className="text-xl font-bold text-purple-600 mb-4">Other Jobs</h2>
                <ul className="space-y-4">
                    <li className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                        <h3 className="text-purple-500 font-medium">Sales Specialist, YouTube</h3>
                        <p className="text-gray-600 text-sm">Location: San Bruno, CA, USA</p>
                        <a href="#" className="text-purple-600 hover:underline text-sm mt-2 inline-block">Learn More</a>
                    </li>
                    <li className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                        <h3 className="text-purple-500 font-medium">AI/ML Cloud Consultant, Google Cloud</h3>
                        <p className="text-gray-600 text-sm">Location: Mountain View, CA, USA</p>
                        <a href="#" className="text-purple-600 hover:underline text-sm mt-2 inline-block">Learn More</a>
                    </li>
                    <li className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                        <h3 className="text-purple-500 font-medium">Product Manager, Facebook</h3>
                        <p className="text-gray-600 text-sm">Location: Menlo Park, CA, USA</p>
                        <a href="#" className="text-purple-600 hover:underline text-sm mt-2 inline-block">Learn More</a>
                    </li>
                    <li className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                        <h3 className="text-purple-500 font-medium">Full Stack Engineer, Airbnb</h3>
                        <p className="text-gray-600 text-sm">Location: San Francisco, CA, USA</p>
                        <a href="#" className="text-purple-600 hover:underline text-sm mt-2 inline-block">Learn More</a>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="md:w-3/4 p-6 bg-gradient-to-b from-purple-300 via-blue-200 to-white text-gray-900">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">
                    Senior UX Researcher, gTech Users and Products
                </h1>
                <p className="text-gray-600">Google, Boulder, CO, USA; Atlanta, GA, USA</p>

                <h2 className="font-medium mt-6 text-xl text-purple-500">Job Description</h2>
                <p className="text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo vitae sapien vestibulum vehicula. Nulla facilisi. Donec nec libero id mi venenatis fermentum.
                </p>

                <h2 className="font-medium text-xl text-purple-500">Salary</h2>
                <p className="text-gray-700 mb-4">$120,000 - $150,000 per year</p>

                <h2 className="font-medium text-xl text-purple-500">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Conduct user research to understand user needs and behaviors.</li>
                    <li>Work closely with product teams to identify research opportunities.</li>
                    <li>Design and execute research studies using various methodologies.</li>
                    <li>Analyze and present research findings to stakeholders.</li>
                </ul>

                <h2 className="font-medium text-xl text-purple-500">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Bachelor's degree in Human-Computer Interaction, Psychology, or related field.</li>
                    <li>5+ years of experience in UX research or a related field.</li>
                    <li>Proficiency in research methods such as usability testing, surveys, and interviews.</li>
                    <li>Excellent communication and presentation skills.</li>
                </ul>

                <div className="mt-6 flex justify-center md:justify-start">
                    <a
                        href="#"
                        className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Details;
