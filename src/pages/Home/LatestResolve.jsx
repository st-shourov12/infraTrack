import React from 'react';
import Heading from '../../components/Shared/Heading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const LatestResolve = () => {


    const axiosSecure = useAxiosSecure();

    const { data: issues = []} = useQuery({
            queryKey: ['myIssues'],
            queryFn: async () => {
                const res = await axiosSecure.get(`/latestResolve`);
                return res.data;
            },
           
        });

      
        const filteredIssues = issues;
    return (
        <div className='py-16 md:py-24'>
            <Heading center={true} title="Latest Resolved Issue" subtitle="Resolve Issue smoothly with our skilled staff"></Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.map((issue, i) => (
                    <Link to={`/issues/${issue?._id}`} key={issue?._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
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
                               
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-400 mt-2">
                                Reported: {new Date(issue?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </div>

                           
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    );
};

export default LatestResolve;