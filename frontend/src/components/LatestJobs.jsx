import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Button } from './ui/button';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const latestJobs = allJobs?.slice(0, 6);
   
    return (
        <div className='max-w-7xl mx-auto px-4 py-20'>
            {/* Header */}
            <div className='text-center mb-12'>
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <div className='w-10 h-10 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg flex items-center justify-center'>
                        <Briefcase className='w-6 h-6 text-white' />
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900'>
                        Latest & Top{' '}
                        <span className='bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent'>
                            Job Openings
                        </span>
                    </h1>
                </div>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Discover the most recent opportunities from top companies. 
                    Find your next career move with our curated selection of jobs.
                </p>
            </div>

            {/* Jobs Grid */}
            <div className='mb-12'>
                {latestJobs?.length <= 0 ? (
                    <div className="text-center py-16">
                        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs available</h3>
                        <p className="text-gray-500">Check back later for new opportunities</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {latestJobs.map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>

            {/* View All Button */}
            <div className='text-center'>
                <Link to="/jobs">
                    <Button className="hirnest-button-primary">
                        View All Jobs
                        <ArrowRight className='w-4 h-4 ml-2' />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LatestJobs