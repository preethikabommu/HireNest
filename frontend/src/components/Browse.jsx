import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import { Bookmark, Search } from 'lucide-react';

const Browse = () => {
    const { jobs: savedJobs, loading, refetch } = useGetSavedJobs();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    // If user is not logged in or not a student, show message
    if (!user) {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto my-10 px-4'>
                    <div className='text-center py-20'>
                        <Bookmark className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Login Required</h2>
                        <p className='text-gray-600 mb-6'>Please login to view your saved jobs</p>
                    </div>
                </div>
            </div>
        );
    }

    if (user.role !== 'student') {
        return (
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto my-10 px-4'>
                    <div className='text-center py-20'>
                        <Bookmark className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Students Only</h2>
                        <p className='text-gray-600 mb-6'>Only students can save and view saved jobs</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h1 className='font-bold text-3xl text-gray-900 mb-2'>My Saved Jobs</h1>
                        <p className='text-gray-600'>Jobs you've saved for later review</p>
                    </div>
                    <div className='text-right'>
                        <p className='text-sm text-gray-500'>Total Saved</p>
                        <p className='text-2xl font-bold text-blue-600'>{savedJobs.length}</p>
                    </div>
                </div>

                {loading ? (
                    <div className='text-center py-20'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                        <p className='text-gray-600 mt-4'>Loading your saved jobs...</p>
                    </div>
                ) : savedJobs.length === 0 ? (
                    <div className='text-center py-20'>
                        <Bookmark className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>No Saved Jobs Yet</h2>
                        <p className='text-gray-600 mb-6'>Start exploring jobs and save the ones you're interested in</p>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200'
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {savedJobs.map((job) => (
                            <Job 
                                key={job._id} 
                                job={job} 
                                onSaveChange={refetch}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse