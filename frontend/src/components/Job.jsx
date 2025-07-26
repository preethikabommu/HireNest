import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { SAVE_JOB_ENDPOINT, UNSAVE_JOB_ENDPOINT } from '../utils/constant'

const Job = ({ job, onSaveChange }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [isSaved, setIsSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check if job is saved on component mount
    useEffect(() => {
        if (user && user.savedJobs) {
            setIsSaved(user.savedJobs.includes(job._id));
        }
    }, [job._id, user]);

    const handleSaveJob = async () => {
        if (!user) {
            toast.error('Please login to save jobs');
            return;
        }

        if (user.role !== 'student') {
            toast.error('Only students can save jobs');
            return;
        }

        setIsLoading(true);
        try {
            const endpoint = isSaved ? UNSAVE_JOB_ENDPOINT : SAVE_JOB_ENDPOINT;
            const response = await axios.post(endpoint, { jobId: job._id }, { withCredentials: true });
            
            if (response.data.success) {
                setIsSaved(!isSaved);
                toast.success(isSaved ? 'Job removed from saved' : 'Job saved for later');
                if (onSaveChange) {
                    onSaveChange();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        
        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    }

    return (
        <div className='hirnest-card p-6 hover:shadow-xl transition-all duration-300 group w-full min-h-[390px] flex flex-col justify-between'>
            {/* Header */}
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                        <Calendar className='w-4 h-4' />
                        <span>{daysAgoFunction(job?.createdAt)}</span>
                    </div>
                    {user && user.role === 'student' && (
                        <Button 
                            variant="outline" 
                            className={`rounded-full w-8 h-8 p-0 transition-colors duration-200 ${
                                isSaved 
                                    ? 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100' 
                                    : 'hover:bg-blue-50 hover:border-blue-200'
                            }`}
                            size="icon"
                            onClick={handleSaveJob}
                            disabled={isLoading}
                        >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </Button>
                    )}
                </div>

                {/* Company Info */}
                <div className='flex items-center gap-3 mb-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-lg flex items-center justify-center'>
                        <Avatar className='w-8 h-8'>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <div>
                        <h3 className='font-semibold text-gray-900'>{job?.company?.name}</h3>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <MapPin className='w-3 h-3' />
                            <span>{job?.location || 'Remote'}</span>
                        </div>
                    </div>
                </div>

                {/* Job Title & Description */}
                <div className='mb-4'>
                    <h2 className='font-bold text-lg text-gray-900 mb-2 group-hover:text-sky-700 transition-colors duration-200'>
                        {job?.title}
                    </h2>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                        {job?.description}
                    </p>
                </div>

                {/* Job Details */}
                <div className='flex items-center gap-2 mb-4 flex-wrap'>
                    <Badge className='bg-sky-100 text-sky-700 hover:bg-sky-200 font-medium'>
                        <Users className='w-3 h-3 mr-1' />
                        {job?.position} Position{job?.position > 1 ? 's' : ''}
                    </Badge>
                    <Badge className='bg-orange-100 text-orange-700 hover:bg-orange-200 font-medium'>
                        <Clock className='w-3 h-3 mr-1' />
                        {job?.jobType}
                    </Badge>
                    <Badge className='bg-green-100 text-green-700 hover:bg-green-200 font-medium'>
                        <DollarSign className='w-3 h-3 mr-1' />
                        ₹{job?.salary} LPA
                    </Badge>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-3 mt-auto'>
                <div className='flex items-center gap-3'>
                    <Button 
                        onClick={() => navigate(`/description/${job?._id}`)} 
                        className="hirnest-button-secondary flex-1"
                    >
                        View Details
                    </Button>
                    <Button className="hirnest-button-primary">
                        Apply Now
                    </Button>
                </div>
                {/* Save For Later Button - Only for students */}
                {user && user.role === 'student' && (
                    <Button 
                        onClick={handleSaveJob}
                        disabled={isLoading}
                        className={`w-full transition-all duration-200 mt-3 ${
                            isSaved 
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        variant={isSaved ? "outline" : "default"}
                    >
                        {isLoading ? (
                            'Loading...'
                        ) : isSaved ? (
                            'Saved ✓'
                        ) : (
                            'Save For Later'
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Job