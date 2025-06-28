import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import hire from '@/assets/hire2.jpg';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                     job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
                    // job.salary.includes(searchedQuery); // Added salary filtering
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Banner Image */}
            <div className="w-[60%] mx-auto mt-6">
                <img
                    src={hire}
                    alt="AI Concept"
                    className="w-full h-[550px] object-cover rounded-lg"
                />
            </div>

            {/* Main Job Section */}
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    
                    {/* Left Sidebar - Filter Card */}
                    <div className="w-1/4">
                        <FilterCard />
                    </div>

                    {/* Job Listings Section */}
                    <div className="flex-1 h-[88vh] overflow-y-auto pb-5 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                        {filterJobs.length <= 0 ? (
                            <span className="text-red-500">Job not found</span>
                        ) : (
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Jobs;
