

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Heading from '../../components/Shared/Heading';

import { FaTrashCan, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Staff2 from '../Staff/Staff2';


const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showAppModal, setShowAppModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        reset: resetAdd,
    } = useForm();

    // ================= FETCH STAFF =================
    const { data: staffList = [], refetch } = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staffs');
            return res.data;
        },
    });

    // ================= DELETE =================
    const handleDeleteStaff = (staff) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${staff.fullName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/staffs/${staff._id}`).then((res) => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire('Deleted!', 'Staff removed.', 'success');
                    }
                });
            }
        });
    };

    // ================= REJECT =================
    const handleReject = (staff) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Reject ${staff.fullName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, reject!',
        }).then((result) => {
            if (result.isConfirmed) {
                if (staff?.userId) {
                    axiosSecure
                        .patch(`/staffs/${staff._id}`, { applicationStatus: 'rejected' })
                        .then((res) => {
                            if (res.data.modifiedCount) {
                                refetch();
                                Swal.fire('Rejected', '', 'warning');
                            }
                        });
                }
                Swal.fire('Directed appointed staff cant be rejected', '', 'warning');
            }
        });
    };

    // ================= APPROVE =================
    const handleAppStaff = async (data) => {
        const { id, password } = data;

        const res = await axiosSecure.patch(`/staffs/${id}`, {
            applicationStatus: 'approved',
            password,
        });

        selectedStaff?.userId

        if (res.data.modifiedCount) {
            if (selectedStaff?.userId) {
                await axiosSecure.patch(`/users/${selectedStaff?.userId}`, { role: 'staff' })
                refetch();
                setShowAppModal(false);
                setSelectedStaff(null);
                resetAdd();
                Swal.fire({ icon: 'success', title: 'Staff Approved', timer: 2000 });
            }
            Swal.fire({ icon: 'success', title: 'Added by admin already', timer: 2000 });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            
            <div className="mb-8">
            <h2 className='text-3xl font-bold lg:text-4xl mb-2'>Manage Staff</h2>
            <p className='text-gray-700 dark:text-white/75'>Add, update, or remove staff members</p>
            
          </div>

            {/* Add Staff Button */}
            <div className="flex justify-end mb-6">
                <button onClick={() => setShowAddModal(true)} className="btn rounded-lg border-0 btn-primary">
                    Add Staff
                </button>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th>#</th>
                            <th>Staff Info</th>
                            <th>Contact</th>
                            <th>Department</th>
                            <th>Password</th>
                            <th>Status</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {staffList.map((staff, index) => (
                            <tr key={staff._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <th className="text-gray-700 dark:text-gray-300">{index + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={staff?.profilePhoto} alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{staff?.fullName}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{staff?.email}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-gray-700 dark:text-gray-300">{staff?.phone}</td>

                                <td className="font-bold text-blue-800 dark:text-blue-400">
                                    {staff?.department}
                                </td>

                                <td className="font-bold text-blue-800 dark:text-blue-400">
                                    {staff?.password}
                                </td>

                                <td className={
                                    staff.applicationStatus === 'approved'
                                        ? 'text-green-700 dark:text-green-400'
                                        : staff.applicationStatus === 'rejected'
                                            ? 'text-red-800 dark:text-red-400'
                                            : 'text-yellow-700 dark:text-yellow-400'
                                }>
                                    {staff.applicationStatus}
                                </td>

                                <td className="text-gray-700 dark:text-gray-300">
                                    {new Date(staff.appliedAt).toLocaleDateString()}
                                </td>

                                <td>
                                    <div className="flex gap-2">
                                        {staff.applicationStatus === 'approved' ? (
                                            <button onClick={() => handleReject(staff)} className="btn border-0 rounded-lg btn-sm">
                                                <IoPersonRemoveSharp /> Reject
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setSelectedStaff(staff);
                                                    setShowAppModal(true);
                                                    resetAdd();
                                                }}
                                                className="btn border-0 rounded-lg btn-sm btn-primary"
                                            >
                                                <FaUserCheck /> Add Staff
                                            </button>
                                        )}

                                        <button onClick={() => handleDeleteStaff(staff)} className="btn border-0 rounded-lg btn-sm">
                                            <FaTrashCan /> Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= APPROVE MODAL ================= */}
            {showAppModal && selectedStaff && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <form onSubmit={handleSubmitAdd(handleAppStaff)} className="space-y-4">
                            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Add Staff Member</h3>

                            {/* Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-300">Full Name</span>
                                    </label>
                                    <input
                                        defaultValue={selectedStaff?.fullName}
                                        type="text"
                                        {...registerAdd('name', { required: 'Name is required' })}
                                        placeholder="Enter full name"
                                        className="input input-bordered bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-300">Email</span>
                                    </label>
                                    <input
                                        defaultValue={selectedStaff?.email}
                                        type="email"
                                        {...registerAdd('email', { required: 'Email is required' })}
                                        placeholder="Enter email"
                                        className="input input-bordered bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Staff ID and Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-300">Staff ID</span>
                                    </label>
                                    <input
                                        defaultValue={selectedStaff?._id}
                                        type="tel"
                                        {...registerAdd('id')}
                                        readOnly
                                        className="input input-bordered bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 dark:text-gray-300">Password *</span>
                                    </label>
                                    <input
                                        defaultValue={selectedStaff?.password}
                                        type="password"
                                        {...registerAdd('password')}
                                        placeholder="Enter password"
                                        className="input input-bordered bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAppModal(false);
                                        setSelectedStaff(null);
                                        resetAdd();
                                    }}
                                    className="btn border-0 rounded-lg btn-ghost dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn border-0 rounded-lg btn-primary">
                                    Approve
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowAppModal(false)}></div>
                </div>
            )}

            {/* ================= ADD STAFF MODAL ================= */}
            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <Staff2 />
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => {
                            refetch();
                            setShowAddModal(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ManageStaff;