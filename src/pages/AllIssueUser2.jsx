import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router';
import LoadingSpinner from '../components/Shared/LoadingSpinner'

import { Filter } from 'lucide-react';
import { FaVoteYea } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';




const AllIssueUser2 = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
        priority: 'all'
    });

    const [showFilters, setShowFilters] = useState(false);


    // const { data: allIssue = [] , refetch : issueFetch } = useQuery({
    //     queryKey: ['allIssues', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/issues`)
    //         return res.data
    //     }
    // })

    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    const currentUser = users[0];

    //   pagination

    const [getIssue, setIssue] = useState([]);
    // const [totalIssue, setTotalIssue] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        setLoading(true);

        axiosSecure.get(
            `/allIssues?limit=6&skip=${currentPage * 6}&search=${searchText}&status=${filters.status}&category=${filters.category}&priority=${filters.priority}&sorting=${-1}`
        )
            .then(res => {
                setIssue(res.data.issues);
                // setTotalIssue(res.data.count);
                setTotalPage(Math.ceil(res.data.count / 6));
            })
            .finally(() => {
                setLoading(false);
            });

    }, [
        axiosSecure,
        currentPage,
        searchText,
        filters.status,
        filters.category,
        filters.priority
    ]);



    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(0);
    };



    // console.log('ss', getIssue, totalIssue, totalPage);



    //   end pagination

    // const filteredIssues = useMemo(() => {
    //     let filtered = [...getIssue];

    //     if (filters.status !== 'all') {
    //         filtered = filtered.filter(
    //             issue => issue.status === filters.status
    //         );
    //     }

    //     if (filters.category !== 'all') {
    //         filtered = filtered.filter(
    //             issue => issue.category === filters.category
    //         );
    //     }

    //     if (filters.priority !== 'all') {
    //         filtered = filtered.filter(
    //             issue => issue.priority?.toLowerCase() === filters.priority
    //         );
    //     }

    //     return filtered;
    // }, [filters, getIssue]);

    const filteredIssues = getIssue;



    const handleToggle = () => {
        setShowFilters(!showFilters)
    }




    const handleVote = (issue) => {
        const { upvoted, _id, category, reporterEmail } = issue;

        const upvote = upvoted + 1;
        const isSameUser = reporterEmail === currentUser?.email;
        const worthyVoter = issue?.upvotedBy?.some(u => u.email === currentUser.email);
        console.log(isSameUser, worthyVoter);


        if (!isSameUser && !worthyVoter) {

            const update =
            {
                upvoted: upvote,
                upvotedBy: [
                    { email: currentUser.email },
                    ...(issue.upvotedBy || [])
                ],

            }


            axiosSecure.patch(`/issues/${_id}`, update)
                .then((res) => {
                    if (res.data.modifiedCount) {


                        // issueFetch()


                        Swal.fire({
                            icon: 'success',
                            title: `${category} issue is upvoted.`,
                            timer: 1000,
                        });





                    }
                })

            setIssue(prev =>
                prev.map(item =>
                    item._id === issue._id
                        ? {
                            ...item,
                            upvoted: item.upvoted + 1,
                            upvotedBy: [
                                { email: currentUser.email },
                                ...(item.upvotedBy || [])
                            ]
                        }
                        : item
                )
            );
        } else if (isSameUser) {
            Swal.fire({
                icon: 'warning',
                title: `You can not vote your own issue`,
                timer: 1000,
            });

        }
        else if (worthyVoter) {
            Swal.fire({
                icon: 'warning',
                title: `You can vote only once`,
                timer: 1000,
            });

        }



    }


    return (
        <div className='max-w-5/6 mx-auto'>
            <h2 className="text-2xl font-bold mb-6 text-center my-5">
                All Issues : {filteredIssues?.length}
            </h2>

            <div className="flex justify-center mb-4">
                <div className="flex w-full max-w-md gap-2">
                    <input
                        type="text"
                        placeholder="Search by category, location..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(0);
                        }}
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary">
                        <FaMagnifyingGlass />
                    </button>
                </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                    <button
                        onClick={() => handleToggle()}
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
                                onChange={(e) => handleFilterChange('status', e.target.value)}
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
                                onChange={(e) => handleFilterChange('category', e.target.value)}
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
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Normal">Normal</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>


            {
                loading && <LoadingSpinner />
            }



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.map((issue, i) => (
                    <div key={issue?._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        <figure className="px-6 pt-6 relative">
                            <img
                                src={issue?.photo}
                                alt={issue?.category}
                                className="rounded-xl h-48 w-full object-cover"
                            />
                            <div className="absolute top-8 right-8 badge badge-lg badge-neutral">
                                #{i + 1}
                            </div>

                        </figure>

                        <div className="card-body">
                            {/* Header with Category and Badges */}
                            <div className="flex justify-between items-start gap-2 flex-wrap">
                                <h2 className="card-title text-lg">{issue?.category}</h2>
                                <div className="flex gap-2">
                                    <div className={`badge badge-sm ${issue?.priority === 'High' ? 'badge-error' :
                                        issue?.priority === 'Medium' ? 'badge-warning' :
                                            'badge-info'
                                        }`}>
                                        {issue?.priority}
                                    </div>
                                    <div className={`badge badge-sm ${issue?.status === 'pending' ? 'badge-warning' :
                                        issue?.status === 'in-progress' ? 'badge-info' :
                                            issue?.status === 'resolved' ? 'badge-accent' :
                                                issue?.status === 'closed' ? 'badge-success' : 'badge-error'
                                        }`}>
                                        {issue?.status}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                                {issue?.description}
                            </p>

                            <div className="divider my-2"></div>

                            {/* Reporter Info */}
                            <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={issue?.reporterPhoto}
                                            alt={issue?.reporterName}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate">{issue?.reporterName}</p>
                                    <p className="text-xs text-gray-500 truncate">{issue?.reporterEmail}</p>
                                    <div className="badge badge-xs badge-ghost mt-1">{issue?.userRole}</div>
                                </div>
                            </div>

                            {/* Location Info */}
                            <div className="mt-3 flex justify-between items-center space-y-2">
                                <div className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-primaryshrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="text-sm">
                                        <p className="font-medium">{issue?.location}</p>
                                        <p className="text-xs text-gray-500">{issue?.upzila}, {issue?.district}</p>
                                        <p className="text-xs text-gray-400">{issue?.region}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleVote(issue)} className="bg-blue-300 py-2 text-xs gap-1 text-center flex justify-center items-center px-3 rounded-lg text-blue-700">
                                    <FaVoteYea className='text-lg' />
                                    {issue?.upvoted}
                                </button>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-400 mt-2">
                                Reported: {new Date(issue?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </div>

                            {/* Action Button */}
                            <div className="card-actions justify-end mt-4">

                                <Link
                                    to={`/issues/${issue._id}`}
                                    className="btn btn-primary btn-sm w-full">
                                    <FaMagnifyingGlass />
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 py-5">

                {
                    currentPage > 0 && <button onClick={() => { setCurrentPage(currentPage - 1) }} className="btn">Prev</button>
                }

                {
                    [...Array(totalPage).keys()].map((i) => (
                        <button onClick={() => { setCurrentPage(i) }} key={i} className={`btn ${i === currentPage && ' btn-primary'}`}>{i + 1}</button>
                    ))
                }

                {
                    currentPage < totalPage - 1 && <button onClick={() => { setCurrentPage(currentPage + 1) }} className="btn">Next</button>
                }

            </div>



        </div>
    );
};

export default AllIssueUser2;