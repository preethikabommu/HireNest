import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Building2, Briefcase, Home, Search, Bookmark } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg flex items-center justify-center'>
                        <Building2 className='w-5 h-5 text-white' />
                    </div>
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-sky-700 to-cyan-600 bg-clip-text text-transparent'>
                        Hire<span className='text-sky-700'>Nest</span>
                    </h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors duration-200'>
                                            <Building2 className='w-4 h-4' />
                                            Companies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors duration-200'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors duration-200'>
                                            <Home className='w-4 h-4' />
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/jobs" className='flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors duration-200'>
                                            <Briefcase className='w-4 h-4' />
                                            Jobs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-sky-600 transition-colors duration-200'>
                                            <Bookmark className='w-4 h-4' />
                                            My Saved Jobs
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className='border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300'>
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="hirnest-button-primary">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-sky-100 hover:ring-sky-200 transition-all duration-200">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4">
                                    <div className='space-y-4'>
                                        <div className='flex gap-3 items-center p-3 bg-cyan-50 rounded-lg'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-semibold text-gray-900'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio || 'Welcome to HireNest!'}</p>
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                                                        <User2 className='w-4 h-4 text-sky-600' />
                                                        <Button variant="link" className='p-0 h-auto font-normal text-gray-700 hover:text-sky-600'>
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200'>
                                                <LogOut className='w-4 h-4 text-red-500' />
                                                <Button onClick={logoutHandler} variant="link" className='p-0 h-auto font-normal text-red-500 hover:text-red-600'>
                                                    Logout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar