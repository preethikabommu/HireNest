import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, MapPin, Building2, DollarSign, X, Code } from 'lucide-react'

const filterData = [
    {
        filterType: "Industry",
        icon: Code,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Cloud Engineer", "Data Science", "Technical Analyst", "Test Engineer", "UI/UX Designer", "Mobile Developer"]
    },
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Remote", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata"]
    },
    {
        filterType: "Job Type",
        icon: Building2,
        array: ["Full Time", "Part Time", "Contract", "Internship", "Freelance"]
    },
    {
        filterType: "Salary",
        icon: DollarSign,
        array: ["0 - 3 LPA", "4 - 11 LPA", "12 - 27 LPA", "28 - 50 LPA"]
    },
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    }

    const clearFilters = () => {
        setSelectedFilters({});
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters, dispatch]);

    const hasActiveFilters = Object.values(selectedFilters).some(Boolean);

    return (
        <div className='hirnest-card p-6'>
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-2'>
                    <Filter className='w-5 h-5 text-sky-600' />
                    <h2 className='font-bold text-lg text-gray-900'>Filters</h2>
                </div>
                {hasActiveFilters && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearFilters}
                        className='text-gray-500 hover:text-gray-700'
                    >
                        <X className='w-4 h-4 mr-1' />
                        Clear
                    </Button>
                )}
            </div>

            <div className='space-y-6'>
                {filterData.map((data, index) => {
                    const IconComponent = data.icon;
                    return (
                        <div key={index} className='border-b border-gray-100 pb-6 last:border-b-0'>
                            <div className='flex items-center gap-2 mb-4'>
                                <IconComponent className='w-4 h-4 text-sky-600' />
                                <h3 className='font-semibold text-gray-900'>{data.filterType}</h3>
                            </div>
                            
                            <RadioGroup 
                                value={selectedFilters[data.filterType] || ''} 
                                onValueChange={(value) => changeHandler(data.filterType, value)}
                            >
                                <div className='space-y-3'>
                                    {data.array.map((item, idx) => {
                                        const itemId = `${data.filterType}-${idx}`;
                                        return (
                                            <div key={itemId} className='flex items-center space-x-3'>
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId}
                                                    className='text-sky-600 border-gray-300'
                                                />
                                                <Label 
                                                    htmlFor={itemId}
                                                    className='text-sm text-gray-700 cursor-pointer hover:text-sky-600 transition-colors duration-200'
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </RadioGroup>
                        </div>
                    );
                })}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className='mt-6 pt-6 border-t border-gray-100'>
                    <h4 className='font-medium text-gray-900 mb-3'>Active Filters:</h4>
                    <div className='flex flex-wrap gap-2'>
                        {Object.entries(selectedFilters).map(([filterType, value]) => {
                            if (!value) return null;
                            return (
                                <div 
                                    key={filterType}
                                    className='inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium'
                                >
                                    <span>{value}</span>
                                    <button
                                        onClick={() => changeHandler(filterType, '')}
                                        className='ml-1 hover:text-sky-900'
                                    >
                                        <X className='w-3 h-3' />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard