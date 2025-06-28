import React, { useEffect, useState } from 'react'; 
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

// Importing image
import jobImage from '@/assets/apply2.jpg';  

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center pt-16">
         

            {/* Job Description Box - Same Width as Image */}
            <div className="relative w-full max-w-7xl bg-opacity-10 backdrop-blur-lg border border-gray-500 
                            text-white p-8 rounded-2xl shadow-xl transition duration-300 
                            hover:shadow-2xl hover:border-purple-400 mb-6"  
                 style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-extrabold text-2xl text-white">{singleJob?.title}</h1>
                        <div className="flex items-center gap-3 mt-4">
                            <Badge className="text-blue-400 font-bold bg-transparent border border-blue-400">{singleJob?.postion} Positions</Badge>
                            <Badge className="text-red-400 font-bold bg-transparent border border-red-400">{singleJob?.jobType}</Badge>
                            <Badge className="text-purple-400 font-bold bg-transparent border border-purple-400">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-full px-5 py-2 text-white transition-all duration-300
                                    ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className="border-b border-gray-600 font-medium py-4 text-gray-200">Job Description</h1>
                <div className="my-4">
                    <h1 className="font-bold my-1 text-white">Role: <span className="pl-4 font-normal text-gray-400">{singleJob?.title}</span></h1>
                    <h1 className="font-bold my-1 text-white">Location: <span className="pl-4 font-normal text-gray-400">{singleJob?.location}</span></h1>
                    <h1 className="font-bold my-1 text-white">Description: <span className="pl-4 font-normal text-gray-400">{singleJob?.description}</span></h1>
                    <h1 className="font-bold my-1 text-white">Experience: <span className="pl-4 font-normal text-gray-400">{singleJob?.experience} yrs</span></h1>
                    <h1 className="font-bold my-1 text-white">Salary: <span className="pl-4 font-normal text-gray-400">{singleJob?.salary} LPA</span></h1>
                    <h1 className="font-bold my-1 text-white">Total Applicants: <span className="pl-4 font-normal text-gray-400">{singleJob?.applications?.length}</span></h1>
                    <h1 className="font-bold my-1 text-white">Posted Date: <span className="pl-4 font-normal text-gray-400">{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>

                {/* Back to Jobs Button */}
                <div className="flex justify-end mt-6">
                    <Button 
                        onClick={() => navigate('/jobs')}  
                        className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300">
                         Back to Jobs
                    </Button>
                </div>
                   {/* Job Image - Aligned Width to Job Description */}
            </div>
            <img 
                src={jobImage} 
                alt="Job Image" 
                className="w-full max-w-7xl h-auto object-cover rounded-lg shadow-lg mb-6"
            />
       </div>
    );
};

export default JobDescription;
