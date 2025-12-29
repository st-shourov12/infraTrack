import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router';
import { FcAssistant } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import { IoPersonRemove } from 'react-icons/io5';

const AllIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  /* ================= ISSUES ================= */
  const {
    data: allIssue = [],
    refetch: issueFetch,
  } = useQuery({
    queryKey: ['allIssues'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data;
    },
  });

  /* ================= STAFF ================= */
  const {
    data: allStaff = [],
    refetch: staffFetch,
  } = useQuery({
    queryKey: ['allStaff'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/staffs');
      return res.data;
    },
  });

  /* ================= FILTER STAFF ================= */
  const approvedStaff = allStaff.filter(
    (s) => s.applicationStatus === 'approved'
  );

  const exactStaffUp = selectedIssue
    ? approvedStaff.filter(
        (s) => s.preferredUpzila === selectedIssue.upzila
      )
    : [];

  const exactStaffZila = selectedIssue
    ? approvedStaff.filter(
        (s) => s.preferredDistrict === selectedIssue.district
      )
    : [];

  const exactStaff =
    exactStaffUp.length > 0 ? exactStaffUp : exactStaffZila;

  /* ================= REJECT ISSUE ================= */
  const handleRejectIssue = (issue) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Reject ${issue.category}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateIssue = {
          status: 'rejected',
          timeline: [
            {
              id: 4,
              status: 'Rejected',
              message: 'Issue rejected',
              updatedBy: user?.displayName || 'Admin',
              role: 'admin',
              date: new Date().toISOString(),
            },
            ...issue.timeline,
          ],
        };

        const res = await axiosSecure.patch(
          `/issues/${issue._id}`,
          updateIssue
        );

        if (res.data.modifiedCount) {
          issueFetch();
          Swal.fire('Rejected', '', 'warning');
        }
      }
    });
  };

  /* ================= ASSIGN STAFF ================= */
  const handleAssign = (staff) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Assign ${staff.fullName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // update issue
        await axiosSecure.patch(`/issues/${selectedIssue._id}`, {
          
          assignedStaff: {
            name: staff.fullName,
            email: staff.email,
            photo: staff.profilePhoto,
            phone: staff.phone,
            department: staff.department,
          },
          timeline: [
            {
              id: 4,
              status: 'assigned',
              message: `Issue assigned to ${staff.fullName}`,
              updatedBy: user?.displayName || 'Admin',
              role: 'admin',
              date: new Date().toISOString(),
            },
            ...selectedIssue.timeline,
          ],
        });

        // update staff status
        await axiosSecure.patch(`/staffs/${staff._id}`, {
          workStatus: 'Busy',
        });

        issueFetch();
        staffFetch();
        setShowModal(false);
      }
    });
  };

  
  const handleAssignRemove = (staff) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Cancel Assign ${staff.fullName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/issues/${selectedIssue._id}`, {
          status: 'pending',
          assignedStaff: null,
        });

        await axiosSecure.patch(`/staffs/${staff._id}`, {
          workStatus: 'Available',
        });

        issueFetch();
        staffFetch();
        setShowModal(false);
      }
    });
  };

 
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center my-5">
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

                                {/* { 
                                    issue?.status === 'pending' || issue?.status === 'in-progress'  ?   */}
                                    <button
                                        onClick={() => {

                                            setShowModal(true);
                                            setSelectedIssue(issue);
                                            
                                        }


                                        }
                                        className="btn"
                                    >
                                        <FcAssistant className='text-xl' />
                                        {issue?.status === 'pending' ? 'Assign' : 'Assigned'}
                                    </button>
                                     {/* :
                                    
                                        <span className={`text-green-600 bg-green-300 ${issue?.status === 'rejected' ? 'text-red-600 bg-red-300 ' : 'text-green-600 bg-green-300 '} px-3 py-2 rounded-xl`}>{issue?.status === 'rejected' ? 'Rejected' : 'Assign'}</span>
                                } */}

                                

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


            {
                showModal && selectedIssue && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6">
                                Assign Staff {exactStaff?.length}
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    {/* head */}
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
                                                        {selectedIssue?.assignedStaff?.email !== staff?.email &&


                                                            <button onClick={() => {

                                                                handleAssign(staff);

                                                            }} className='btn'>
                                                                <MdOutlineAssignmentInd className='text-lg' />
                                                                Assign

                                                            </button> }

                                                            { selectedIssue?.assignedStaff?.email === staff?.email &&
                                                            <button onClick={() => {

                                                                handleAssignRemove(staff);

                                                            }} className='btn'>
                                                                <IoPersonRemove className='text-lg' />
                                                                Remove
                                                            </button>

                                                        }
                                                    </td>

                                                </tr>
                                            ))

                                        }


                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                          {
                                        selectedIssue?.status === 'pending' && 
                                    

                                    <button onClick={() => { handleRejectIssue(selectedIssue) }} className='bg-red-400 w-full px-3 py-2 rounded-lg text-red-800'>
                                        Reject

                                    </button>
                                    }

                                        </td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                        <div className="modal-backdrop" onClick={() => { setShowModal(false) }}></div>
                    </div>
                )
            }
        </div>
    )
};

export default AllIssues;
