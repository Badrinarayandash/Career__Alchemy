import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div>
            <Table className="border border-gray-700 rounded-lg overflow-hidden">
                <TableCaption className="text-gray-400">A list of your applied jobs</TableCaption>
                <TableHeader>
    <TableRow className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg border-b border-gray-600">
        <TableHead className="p-4 font-semibold tracking-wide text-white">Date</TableHead>
        <TableHead className="font-semibold tracking-wide text-white">Job Role</TableHead>
        <TableHead className="font-semibold tracking-wide text-white">Company</TableHead>
        <TableHead className="text-right font-semibold tracking-wide text-white">Status</TableHead>
    </TableRow>
</TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-400 p-4">You haven't applied for any job yet.</td>
                            </tr>
                        ) : (
                            allAppliedJobs.map((appliedJob, index) => (
                                <TableRow 
                                    key={appliedJob._id} 
                                    className={`transition duration-300 ease-in-out ${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'} hover:bg-blue-700 hover:scale-[1.02]`}
                                >
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-500' : appliedJob.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
