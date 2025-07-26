import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Database, Palette, Globe, Smartphone, Cpu, Shield, Zap } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Globe, color: "from-blue-500 to-cyan-500" },
    { name: "Backend Developer", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Full Stack Developer", icon: Code, color: "from-purple-500 to-pink-500" },
    { name: "Data Science", icon: Cpu, color: "from-orange-500 to-red-500" },
    { name: "UI/UX Designer", icon: Palette, color: "from-pink-500 to-rose-500" },
    { name: "Mobile Developer", icon: Smartphone, color: "from-indigo-500 to-blue-500" },
    { name: "DevOps Engineer", icon: Zap, color: "from-yellow-500 to-orange-500" },
    { name: "Cybersecurity", icon: Shield, color: "from-red-500 to-pink-500" }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            {/* Header */}
            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                    Popular Job Categories
                </h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Explore opportunities in the most in-demand fields. 
                    Find your perfect role in technology and design.
                </p>
            </div>

            {/* Categories Carousel */}
            <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <Button 
                                    onClick={() => searchJobHandler(category.name)} 
                                    variant="outline" 
                                    className="w-full h-24 flex flex-col items-center justify-center gap-3 rounded-xl border-2 hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 group"
                                >
                                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className='w-6 h-6 text-white' />
                                    </div>
                                    <span className='font-medium text-gray-700 group-hover:text-sky-700 transition-colors duration-300'>
                                        {category.name}
                                    </span>
                                </Button>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white border-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50" />
                <CarouselNext className="right-4 bg-white border-2 border-gray-200 hover:border-sky-300 hover:bg-sky-50" />
            </Carousel>

            {/* Browse All Categories Button */}
            <div className='text-center mt-8'>
                <Button 
                    onClick={() => navigate("/browse")} 
                    className="hirnest-button-secondary"
                >
                    Browse All Categories
                </Button>
            </div>
        </div>
    )
}

export default CategoryCarousel