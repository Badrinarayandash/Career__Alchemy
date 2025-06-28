import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center w-full my-10">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl bg-gray-900/80 shadow-xl rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Post a New Job</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience'].map((field) => (
                            <div key={field}>
                                <Label className="text-gray-300 capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
                                <Input
                                    type="text"
                                    name={field}
                                    value={input[field]}
                                    onChange={changeEventHandler}
                                    className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring-blue-500"
                                />
                            </div>
                        ))}
                        <div>
                            <Label className="text-gray-300">No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-1 bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring-blue-500"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label className="text-gray-300">Select a Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full bg-gray-800 text-white border border-gray-700 p-3 rounded-md focus:ring-blue-500">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all hover:scale-105">
                                Post New Job
                            </Button>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className='text-xs text-red-500 font-bold text-center my-3'>*Please register a company first before posting a job.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
