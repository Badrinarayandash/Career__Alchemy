import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <Table className="w-full border border-gray-700">
                <TableCaption className="text-gray-400">A list of recent applicants</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-900 text-white">
                        <TableHead className="text-blue-400">Full Name</TableHead>
                        <TableHead className="text-green-400">Email</TableHead>
                        <TableHead className="text-yellow-400">Contact</TableHead>
                        <TableHead className="text-red-400">Resume</TableHead>
                        <TableHead className="text-purple-400">Date</TableHead>
                        <TableHead className="text-right text-gray-300">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-800">
                            <TableCell className="border border-gray-700">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="border border-gray-700">{item?.applicant?.email}</TableCell>
                            <TableCell className="border border-gray-700">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="border border-gray-700">
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-400 hover:underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="border border-gray-700">
                                {item?.applicant.createdAt.split("T")[0]}
                            </TableCell>
                            <TableCell className="border border-gray-700 text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-300 hover:text-white cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 bg-gray-900 text-gray-300 border border-gray-700 rounded-md p-2">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(status, item?._id)}
                                                className="p-2 hover:bg-gray-700 rounded-md cursor-pointer text-center"
                                            >
                                                {status}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
