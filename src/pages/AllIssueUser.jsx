import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FcAssistant } from 'react-icons/fc';
// import Staff from '../Staff/Staff';
// import Swal from 'sweetalert2';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import { IoPersonRemove } from 'react-icons/io5';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';




const AllIssueUser = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [showModal, setShowModal] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    


    const { data: allIssue = [] } = useQuery({
        queryKey: ['allIssues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues`)
            return res.data
        }
    })

    // const { data: allStaff = [], refetch } = useQuery({
    //     queryKey: ['allStaff', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/staffs`)
    //         return res.data
    //     }
    // })

    // const worth = allStaff.filter(p => p.applicationStatus === 'approved')

    // const exactStaffUp = selectedIssue
    //     ? worth.filter(
    //         staff => staff.preferredUpzila === selectedIssue.upzila
    //     )
    //     : [];
    // const exactStaffZila = selectedIssue
    //     ? worth.filter(
    //         staff => staff.preferredDistrict === selectedIssue.district
    //     )
    //     : [];

    // const exactStaff = exactStaffUp.length > 0 ? exactStaffUp : exactStaffZila;






    // const handleAssign = (staff) => {

    //     const {_id,email, fullName, profilePhoto , phone, department, userRole} = staff
    //     const {timeline} = selectedIssue ;
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: `Assign ${staff.fullName}?`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         confirmButtonText: 'Yes!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.patch(`/staffs/${staff._id}`, {
    //                     workStatus: 'Assigned',

    //             })
    //                 .then((res) => {
    //                     if (res.data.modifiedCount) {
    //                         refetch();

    //                         const updateIssue = {
    //                             status: 'in-progress',
    //                             assignedStaff: {
    //                                 name: fullName  ,
    //                                 email: email,
    //                                 photo: profilePhoto,
    //                                 phone: phone,
    //                                 department: department
    //                             },
    //                             timeline: [
                                    
    //                                 {
    //                                     id: 4,
    //                                     status: "assigned",
    //                                     message: `Issue assigned to Staff: ${fullName} from ${department} Department`,
    //                                     updatedBy: "Admin",
    //                                     role: userRole,
    //                                     date: new Date().toISOString(),
    //                                 },
    //                                 ...timeline,
    //                             ]
    //                         }
    //                         axiosSecure.patch(`/issues/${selectedIssue._id}`, updateIssue)
    //                     }
    //             });
                            
    //         }
    //     });
    // };

    // const handleAssignRemove = async (staff) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: `Cancel Assign ${staff.fullName}?`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         confirmButtonText: 'Yes!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure
    //                 .patch(`/staffs/${staff._id}`, {
    //                     workStatus: 'Available',
    //                 })
    //                 .then((res) => {
    //                     if (res.data.modifiedCount) {
                            
    //                         refetch();
    //                     }
    //                 });
    //         }
    //     });
    // };




    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">
                All Issues : {allIssue?.length}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allIssue.map((issue, i) => (
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
                                            issue?.status === 'resolved' ? 'badge-success' :
                                                'badge-ghost'
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
                            <div className="mt-3 space-y-2">
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

                            {/* Action Button */}
                            <div className="card-actions justify-end mt-4">

                                {/* <button
                                    onClick={() => {

                                        setShowModal(true);
                                        setSelectedIssue(issue);
                                        console.log(issue);
                                    }


                                    }
                                    className="btn"
                                >
                                    <FcAssistant className='text-xl' />
                                </button> */}
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


            {/*
                showModal && selectedIssue && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6">
                                Assign Staff {exactStaff?.length}
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Location</th>
                                            <th>Department</th>
                                            <th>Work Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            exactStaff.map((staff, i) => (
                                                <tr key={staff?._id}>
                                                    <th> {i + 1}</th>
                                                    <td>{staff?.fullName}</td>
                                                    <td>
                                                        {staff?.preferredDistrict}, {staff?.preferredUpzila}
                                                    </td>
                                                    <td>{staff?.department}</td>
                                                    <td>{staff?.workStatus}</td>
                                                    <td>
                                                        {staff?.workStatus === 'Available' ?


                                                            <button onClick={() => {

                                                                handleAssign(staff);

                                                            }} className='btn'>
                                                                <MdOutlineAssignmentInd className='text-lg' />

                                                            </button> :
                                                            <button onClick={() => {

                                                                handleAssignRemove(staff);

                                                            }} className='btn'>
                                                                <IoPersonRemove className='text-lg' />

                                                            </button>

                                                        }
                                                    </td>

                                                </tr>
                                            ))

                                        }


                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="modal-backdrop" onClick={() => { setShowModal(false)}}></div>
                    </div>
                )
            */}
        </div> 
    );
};

export default AllIssueUser;