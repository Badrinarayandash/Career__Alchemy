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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
    }, [user, navigate]);

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form 
                    onSubmit={submitHandler} 
                    className="w-1/2 border border-gray-700 rounded-md p-6 my-10 bg-gray-900"
                >
                    <h1 className="font-bold text-2xl mb-5 text-white">Login</h1>
                    
                    <div className="my-2">
                        <Label className="text-gray-300">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="****@gmail.com"
                            className="bg-gray-800 border border-gray-600 text-white"
                        />
                    </div>

                    <div className="my-2">
                        <Label className="text-gray-300">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="bg-gray-800 border border-gray-600 text-white"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-blue-500"
                                />
                                <Label className="text-gray-300">Candidate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-blue-500"
                                />
                                <Label className="text-gray-300">Employer</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 bg-gray-700 hover:bg-gray-600">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                            Login
                        </Button>
                    )}

                    <span className="text-sm text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-500">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
