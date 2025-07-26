import { useState, useEffect } from 'react';
import axios from 'axios';
import { SAVED_JOBS_ENDPOINT } from '../utils/constant';
import { toast } from 'sonner';

const useGetSavedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSavedJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(SAVED_JOBS_ENDPOINT, { withCredentials: true });
            if (response.data.success) {
                setJobs(response.data.jobs);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch saved jobs');
            toast.error('Failed to fetch saved jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedJobs();
    }, []);

    return { jobs, loading, error, refetch: fetchSavedJobs };
};

export default useGetSavedJobs; 