import React, { useEffect, useState } from 'react';  
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="bg-gray-950 text-white min-h-screen p-8">
            <div className="max-w-6xl mx-auto bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
                <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Admin Job Listings</h2>
                <Table className="w-full border border-gray-800 rounded-lg overflow-hidden">
                    <TableCaption className="text-gray-400">A list of your recently posted jobs</TableCaption>
                    <TableHeader className="bg-gray-850 text-white">
                        <TableRow>
                            <TableHead className="text-blue-400 font-semibold p-4 text-left">Company Name</TableHead>
                            <TableHead className="text-green-400 font-semibold p-4 text-left">Role</TableHead>
                            <TableHead className="text-yellow-400 font-semibold p-4 text-left">Date</TableHead>
                            <TableHead className="text-red-400 font-semibold p-4 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterJobs?.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-800 transition-all border-b border-gray-700">
                                <TableCell className="px-4 py-3 text-gray-300">{job?.company?.name}</TableCell>
                                <TableCell className="px-4 py-3 text-gray-300">{job?.title}</TableCell>
                                <TableCell className="px-4 py-3 text-gray-300">{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3 text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-400 hover:text-gray-200 cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 bg-gray-900 text-white border border-gray-700 p-3 rounded-lg shadow-lg">
                                            <div 
                                                onClick={() => navigate(`/admin/companies/${job._id}`)} 
                                                className='flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-800 rounded-md transition-all'>
                                                <Edit2 className='w-4 text-blue-300' />
                                                <span>Edit</span>
                                            </div>
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex items-center gap-2 w-full cursor-pointer p-2 hover:bg-gray-800 rounded-md transition-all mt-2'>
                                                <Eye className='w-4 text-green-300'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminJobsTable;
