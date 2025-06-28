import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl text-white'>{user?.fullname}</h1>
                            <p className='text-gray-400'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-gray-700 hover:bg-gray-600 text-white" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-gray-300'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-gray-300'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-white'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-blue-600 text-white">{item}</Badge>) : <span className='text-gray-400'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold text-white">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span className='text-gray-400'>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-gray-900 rounded-2xl p-5'>
                <h1 className='font-bold text-lg my-5 text-white'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
