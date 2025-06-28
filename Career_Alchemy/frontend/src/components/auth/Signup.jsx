import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
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
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-600 bg-gray-900 p-6 rounded-lg my-10 shadow-lg'>
                    <h1 className='font-bold text-2xl text-purple-400 mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className='text-gray-300'>Full Name</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter Your Full Name" className="bg-gray-800 text-white border-gray-600" />
                    </div>
                    <div className='my-2'>
                        <Label className='text-gray-300'>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="****@gmail.com" className="bg-gray-800 text-white border-gray-600" />
                    </div>
                    <div className='my-2'>
                        <Label className='text-gray-300'>Phone Number</Label>
                        <Input
                        type="tel"
                        value={input.phoneNumber}
                        name="phoneNumber"
                        onChange={changeEventHandler}
                        placeholder="Enter Your Mobile Number"
                        className="bg-gray-800 text-white border-gray-600"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-gray-300'>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter Your Password" className="bg-gray-800 text-white border-gray-600" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label className='text-gray-300'>Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label className='text-gray-300'>Employer</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label className='text-gray-300'>Profile</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer bg-gray-800 text-white border-gray-600" />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4 bg-purple-500 text-white"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-purple-600 hover:bg-purple-700 text-white">Signup</Button>
                    }
                    <span className='text-sm text-gray-400'>Already have an account? <Link to="/login" className='text-blue-400'>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
