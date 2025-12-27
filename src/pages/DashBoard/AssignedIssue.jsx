import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { Filter } from 'lucide-react';
import Swal from 'sweetalert2';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
// import { useForm } from 'react-hook-form';

const AssignedIssue = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // const { register, handleSubmit } = useForm();

    const { data: staffs = [] } = useQuery({
        queryKey: ['staffs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs?email=${user?.email}`);
            return res.data;
        }
    })

    const staff = staffs[0]

    const { data: assignIssue = [] , refetch:issueFetch} = useQuery({
        queryKey: ['issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues`);
            return res.data;
        }
    })

    const issues = assignIssue.filter(p => p?.assignedStaff?.email === staff?.email)
    console.log(issues);

    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
        priority: 'all'
    });


    const filteredIssues = useMemo(() => {
        let filtered = [...issues];

        if (filters.status !== 'all') {
            filtered = filtered.filter(
                issue => issue.status === filters.status
            );
        }

        if (filters.category !== 'all') {
            filtered = filtered.filter(
                issue => issue.category === filters.category
            );
        }

        if (filters.priority !== 'all') {
            filtered = filtered.filter(
                issue => issue.priority?.toLowerCase() === filters.priority
            );
        }

        return filtered;
    }, [filters, issues]);

    const handleResolved = (issue) => {
  const { _id, category, timeline, assignedStaff } = issue;

  

  const updateIssue = {
    status: 'resolved',
    timeline: [
      {
        id: 2,
        status: "resolved",
        message: `${category} issue is resolved.`,
        updatedBy: assignedStaff?.name,
        role: 'staff',
        date: new Date().toISOString(),
      },
      ...timeline,
    ]
  };

  axiosSecure.patch(`/issues/${_id}`, updateIssue)
    .then(res => {
      if (res.data.modifiedCount) {

        const updateStaff = {
         
          workStatus: 'Available'
        };

        axiosSecure.patch(`/staffs/${staff?._id}`, updateStaff)
          .then(() => {
            issueFetch();
            Swal.fire({
              icon: 'success',
              title: 'Issue resolved',
              timer: 1000,
            });
          });
      }
    });
};

    const handleClosed = (issue) => {
        console.log(issue)
        const { _id, category, timeline, assignedStaff } = issue;

       

        const updateIssue = {
            status: 'closed',

            timeline: [

                {
                    id: 1,
                    status: "closed",
                    message: `${category} issue is closed.`,
                    updatedBy: `${assignedStaff?.name}`,
                    role: 'staff',
                    date: new Date().toISOString(),
                },
                ...timeline,

            ]
        }
        axiosSecure.patch(`/issues/${_id}`, updateIssue)
            .then((res) => {
                if (res.data.modifiedCount) {

                    const updateStaff = {
                       
                        workStatus : 'Available',
                    }

                    axiosSecure.patch(`/issues/${staff?._id}`, updateStaff)
                    .then()

                    issueFetch()


                    Swal.fire({
                        icon: 'success',
                        title: 'Issue closed',
                        timer: 1000,
                    });
                }
            })
    }

    // const handleStatus = (data) => {
    //     console.log(data)
    // }

    return (
        <div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                        <Filter size={20} />
                        {showFilters ? 'Hide' : 'Show'} Filters
                    </button>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                <option value="Potholes">Potholes</option>
                                <option value="Broken Streetlights">Broken Streetlights</option>
                                <option value="Water Leakage">Water Leakage</option>
                                <option value="Garbage Overflow">Garbage Overflow</option>
                                <option value="Damaged Footpaths">Damaged Footpaths</option>
                                <option value="Drainage Blockage">Drainage Blockage</option>
                                <option value="Illegal Parking">Illegal Parking</option>
                                <option value="Broken Park Bench">Broken Park Bench</option>
                                <option value="Faulty Traffic Signal">Faulty Traffic Signal</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={filters.priority}
                                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="normal">Low</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>



            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIssues.map((issue, i) => (
                            <tr key={issue?._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={issue?.photo}
                                                    alt={issue?.category} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{issue?.category}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>

                                    {
                                        issue?.status === 'in-progress' ?
                                            <button
                                                onClick={() => { handleResolved(issue) }}
                                                className='btn text-blue-600 bg-blue-300'
                                            >
                                                <VscWorkspaceTrusted className='text-lg'></VscWorkspaceTrusted>
                                                Resolve

                                            </button> :

                                            <button
                                                onClick={() => handleClosed(issue)}
                                                disabled={issue?.status === 'closed'}
                                                className={` btn text-green-600 bg-green-300 ${issue?.status === 'closed' ? 'btn-disabled opacity-50 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                <IoCheckmarkDoneCircle className="text-lg" />
                                                Closed
                                            </button>



                                    }



                                </th>
                            </tr>))
                        }



                        

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AssignedIssue;