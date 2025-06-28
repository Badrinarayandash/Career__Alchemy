import React from 'react' 
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-5 rounded-md shadow-xl bg-black border border-gray-700 cursor-pointer transition-transform duration-200 hover:scale-105"
        >
            {/* Company Name */}
            <div>
                <h1 className="font-medium text-lg text-white">{job?.company?.name}</h1>
                <p className="text-sm text-gray-400">India</p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-lg my-2 text-white">{job?.title}</h1>
                <p className="text-sm text-gray-300">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-400 font-bold border border-blue-500 bg-gray-900" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#2fbeb2] font-bold border border-[rgb(2,182,248)] bg-gray-900" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#F83002] font-bold border border-[#b70909] bg-gray-900" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
