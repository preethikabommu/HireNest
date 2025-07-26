import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, TrendingUp, Users, Award } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className='relative max-w-7xl mx-auto px-4 py-20'>
                <div className='text-center max-w-4xl mx-auto'>
                    <div className='flex flex-col gap-6 mb-8'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mx-auto'>
                            <TrendingUp className='w-4 h-4' />
                            #1 Job Platform for Career Growth
                        </div>
                        
                        <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
                            Find Your Dream Job at{' '}
                            <span className='bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent'>
                                HireNest
                            </span>
                        </h1>
                        
                        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                            Connect with top companies, discover opportunities that match your skills, 
                            and build your career with confidence. Your next big opportunity awaits.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className='max-w-2xl mx-auto mb-12'>
                        <div className='flex w-full shadow-xl border border-gray-200 bg-white rounded-2xl items-center gap-4 p-2'>
                            <div className='flex-1 px-4'>
                                <input
                                    type="text"
                                    placeholder='Search for jobs, companies, or skills...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='outline-none border-none w-full text-lg placeholder-gray-400'
                                    onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="hirnest-button-primary rounded-xl px-8"
                            >
                                <Search className='h-5 w-5 mr-2' />
                                Search Jobs
                            </Button>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Users className='w-8 h-8 text-sky-600' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>10K+</h3>
                            <p className='text-gray-600'>Active Job Seekers</p>
                        </div>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Award className='w-8 h-8 text-cyan-600' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>500+</h3>
                            <p className='text-gray-600'>Top Companies</p>
                        </div>
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <TrendingUp className='w-8 h-8 text-sky-600' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-900'>5K+</h3>
                            <p className='text-gray-600'>Jobs Posted</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection