import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-6 rounded-lg shadow-lg bg-gray-900">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className="w-1/3 p-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    );
};

export default Companies;
