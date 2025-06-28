import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-6 bg-gray-900 shadow-lg rounded-lg">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-full max-w-md px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            className="ml-4 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md transition-all"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
