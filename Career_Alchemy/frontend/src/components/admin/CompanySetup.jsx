import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="max-w-2xl mx-auto my-10 p-8 bg-gray-900/80 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center gap-5 mb-8">
                    <Button onClick={() => navigate("/admin/companies")} variant="outline"
                        className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all px-4 py-2 rounded-lg">
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className="font-bold text-2xl text-blue-400">Company Setup</h1>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-300">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label className="text-gray-300">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label className="text-gray-300">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8">
                        {loading ? (
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all hover:scale-105">
                                Update
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
