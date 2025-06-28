import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res?.data?.company?._id}`);
            }
        } catch (error) {
            toast.error("Failed to create company. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 mt-10 bg-gray-900 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="font-bold text-3xl text-blue-400">Create Your Company</h1>
                    <p className="text-gray-400">Enter a name for your company. You can change this later.</p>
                </div>

                <div className="mb-4">
                    <Label className="text-gray-300">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 bg-gray-800 text-white border border-gray-600 p-3 rounded-md focus:ring focus:ring-blue-500"
                        placeholder="Enter your company name"
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
