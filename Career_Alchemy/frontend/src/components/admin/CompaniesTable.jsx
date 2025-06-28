import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies?.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="bg-black text-white p-6 rounded-lg shadow-lg">
            <Table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                <TableCaption className="text-gray-400">A list of your recently registered companies</TableCaption>
                <TableHeader className="bg-gray-900">
                    <TableRow className="text-white">
                        <TableHead className="text-blue-400">Logo</TableHead>
                        <TableHead className="text-green-400">Name</TableHead>
                        <TableHead className="text-yellow-400">Date</TableHead>
                        <TableHead className="text-red-400 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="hover:bg-gray-800 transition-all">
                            <TableCell className="border border-gray-700">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="border border-gray-700">{company.name}</TableCell>
                            <TableCell className="border border-gray-700">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="border border-gray-700 text-right">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer">
                                        <MoreHorizontal className="text-white hover:text-gray-300" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-gray-900 text-white border border-gray-700 p-2 rounded-md">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer hover:text-blue-400"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
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

export default CompaniesTable;
