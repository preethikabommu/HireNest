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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Building2, User, Mail, Phone, Lock, Briefcase } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    

    
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
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
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8'>
                <div className='w-full max-w-lg'>
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
                        <h2 className='text-3xl font-bold text-gray-900 mb-2'>Join HireNest</h2>
                        <p className='text-gray-600'>Create your account and start your journey</p>
                    </div>

                    {/* Signup Form */}
                    <div className='hirnest-card p-8'>
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Full Name</Label>
                                <div className='relative'>
                                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className='hirnest-input pl-10'
                                        required
                        />
                    </div>
                            </div>

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
                                <Label className='text-sm font-medium text-gray-700 mb-2 block'>Phone Number</Label>
                                <div className='relative'>
                                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <Input
                                        type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
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
                                        placeholder="Create a strong password"
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
                                    Creating account...
                                </Button>
                            ) : (
                                <Button type="submit" className="hirnest-button-primary w-full">
                                    Create Account
                                </Button>
                            )}

                            <div className='text-center'>
                                <span className='text-sm text-gray-600'>
                                    Already have an account?{' '}
                                    <Link to="/login" className='text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200'>
                                        Sign in
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

export default Signup