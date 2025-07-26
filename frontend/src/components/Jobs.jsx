import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Briefcase } from 'lucide-react';
import { useDispatch } from 'react-redux';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();

    const handleSaveChange = () => {
        // This function will be called when a job is saved/unsaved
        // We can add logic here if needed to refresh user data
    };

    useEffect(() => {
        // If no filters, show all jobs
        if (!searchedQuery || Object.values(searchedQuery).every(v => !v)) {
            setFilterJobs(allJobs);
            return;
        }
        let filtered = allJobs;
        // Industry filter (match in title)
        if (searchedQuery.Industry) {
            filtered = filtered.filter(job => job.title && job.title.toLowerCase().includes(searchedQuery.Industry.toLowerCase()));
        }
        // Location filter
        if (searchedQuery.Location) {
            filtered = filtered.filter(job => job.location && job.location.toLowerCase() === searchedQuery.Location.toLowerCase());
        }
        // Job Type filter
        if (searchedQuery["Job Type"]) {
            filtered = filtered.filter(job => job.jobType && job.jobType.toLowerCase() === searchedQuery["Job Type"].toLowerCase());
        }
        // Salary filter (parse range)
        if (searchedQuery.Salary) {
            const match = searchedQuery.Salary.match(/(\d+)\s*-\s*(\d+)/);
            if (match) {
                const min = parseInt(match[1], 10);
                const max = parseInt(match[2], 10);
                filtered = filtered.filter(job => job.salary >= min && job.salary <= max);
            }
        }
        setFilterJobs(filtered);
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase className="w-8 h-8" />
                        <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
                    </div>
                    <p className="text-sky-100 text-lg">
                        Discover thousands of job opportunities with all the information you need
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='flex gap-6'>
                    {/* Filter Sidebar */}
                    <div className='w-80 flex-shrink-0'>
                        <FilterCard />
                    </div>
                    
                    {/* Jobs Grid */}
                    <div className='flex-1'>
                        {filterJobs.length <= 0 ? (
                            <div className="text-center py-16">
                                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
                                <p className="text-gray-500">
                                    {searchedQuery ? `No jobs match "${searchedQuery}"` : "Try adjusting your search criteria"}
                                </p>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''} found
                                    </h2>
                                    {searchedQuery && Object.values(searchedQuery).some(Boolean) && (
                                        <span className="text-sm text-gray-600">
                                            Results for "
                                            {Object.entries(searchedQuery)
                                                .filter(([_, v]) => v)
                                                .map(([k, v]) => `${k}: ${v}`)
                                                .join(', ')
                                            }"
                                        </span>
                                    )}
                                </div>
                                
                                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                                    {filterJobs.map((job) => (
                                            <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                                <Job job={job} onSaveChange={handleSaveChange} />
                                            </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs