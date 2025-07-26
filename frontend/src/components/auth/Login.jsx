import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Building2, Mail, Lock, User, Briefcase } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">
            <Navbar />
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
                <div className='w-full max-w-md'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='flex items-center justify-center gap-2 mb-4'>
                            <div className='w-10 h-10 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg flex items-center justify-center'>
                                <Building2 className='w-6 h-6 text-white' />
                            </div>
                            <h1 className='text-2xl font-bold bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent'>
                                HireNest
                            </h1>
                        </div>
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Welcome back</h2>
                        <p className='text-gray-600'>Sign in to your account to continue</p>
                    </div>

                    {/* Login Form */}
                    <div className='hirnest-card p-8'>
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Email Address</Label>
                                <div className='relative'>
                                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className='hirnest-input pl-10'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Password</Label>
                                <div className='relative'>
                                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='hirnest-input pl-10'
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-3 block'>I am a</Label>
                                <RadioGroup className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 text-sky-600"
                                            required
                                        />
                                        <Label className='flex items-center gap-2 cursor-pointer'>
                                            <User className='w-4 h-4' />
                                            Job Seeker
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer w-4 h-4 text-sky-600"
                                            required
                                        />
                                        <Label className='flex items-center gap-2 cursor-pointer'>
                                            <Briefcase className='w-4 h-4' />
                                            Recruiter
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {loading ? (
                                <Button className="hirnest-button-primary w-full" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Signing in...
                                </Button>
                            ) : (
                                <Button type="submit" className="hirnest-button-primary w-full">
                                    Sign In
                                </Button>
                            )}

                            <div className='text-center'>
                                <span className='text-sm text-gray-600'>
                                    Don't have an account?{' '}
                                    <Link to="/signup" className='text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200'>
                                        Create account
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login