import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["1-8LPA", "8-16LPA", "16-24LPA", "24+LPA"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        setSelectedValue(value);
    };
    
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-black text-white p-4 rounded-xl border-2 border-gray-500 shadow-lg relative overflow-hidden'>
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent rounded-xl bg-gradient-to-r from-gray-600 to-gray-400 opacity-30"></div>

            <h1 className='font-bold text-lg relative z-10'>Filter Jobs</h1>
            <hr className='mt-3 border-gray-600 relative z-10' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-3 relative z-10">
                {
                    fitlerData.map((data, index) => (
                        data.fitlerType !== "Salary" && ( // Hide Salary in UI but keep it in fitlerData
                            <div key={index}>
                                <h1 className='font-bold text-lg mt-4'>{data.fitlerType}</h1>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div key={itemId} className='flex items-center space-x-2 my-2'>
                                                <RadioGroupItem
                                                    value={item}
                                                    id={itemId}
                                                    className="border-white text-white checked:bg-white checked:border-white"
                                                />
                                                <Label htmlFor={itemId} className="text-white cursor-pointer">{item}</Label>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
