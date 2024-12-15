import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// sample pdf (if you still want to display an existing PDF)
import samplePDF from '../assets/aman.pdf';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12,
    },
});

const ApplicationDetail = () => {
    const [selectedStatus, setSelectedStatus] = useState('Interview Scheduled');
    const [interviewDate, setInterviewDate] = useState(new Date());

    const application = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        coverLetter: 'I am very excited to apply for the Software Developer position. I have a strong background in React and web development...',
        resume: samplePDF, // The path to the sample resume PDF
        submittedAt: '2024-10-21 14:35',
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Application status:', selectedStatus);
        console.log('Interview date:', interviewDate);
    };

    // PDF Document Definition
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Applicant Name</Text>
                    <Text style={styles.text}>{application.name}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.text}>{application.email}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Cover Letter</Text>
                    <Text style={styles.text}>{application.coverLetter}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>Submitted At</Text>
                    <Text style={styles.text}>{application.submittedAt}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white p-8 flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Application Details</h1>
                
                {/* User Info */}
                <div className="space-y-4 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Applicant Name</h2>
                        <p className="text-gray-600">{application.name}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Email</h2>
                        <p className="text-gray-600">{application.email}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Cover Letter</h2>
                        <p className="text-gray-600">{application.coverLetter}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Submitted At</h2>
                        <p className="text-gray-600">{application.submittedAt}</p>
                    </div>
                </div>

                {/* Resume Section (optional if you still want to display a PDF) */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Resume (PDF)</h2>
                    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                        {/* Sample PDF Viewing */}
                        <iframe 
                            src={application.resume} 
                            style={{ width: '100%', height: '400px' }} 
                            title="Resume"
                        />
                    </div>
                </div>
                <div className="text-center mb-6">
                    <PDFDownloadLink document={<MyDocument />} fileName="application_details.pdf">
                        {({ blob, url, loading, error }) => 
                            loading ? 'Loading document...' : 
                            <button className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition">
                                Download PDF
                            </button>
                        }
                    </PDFDownloadLink>
                </div>

                {/* Status Selection */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Application Status</h2>
                    <select
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-400 focus:border-indigo-400"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="Viewed">Viewed</option>
                        <option value="Pending">Pending</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                    </select>
                </div>

                {/* Date Picker (if Interview Scheduled is selected) */}
                {selectedStatus === 'Interview Scheduled' && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Select Interview Date</h2>
                        <DatePicker
                            selected={interviewDate}
                            onChange={(date) => setInterviewDate(date)}
                            className="p-3 border border-gray-300 rounded-lg w-full focus:ring-indigo-400 focus:border-indigo-400"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetail;
