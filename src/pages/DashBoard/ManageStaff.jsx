import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Heading from '../../components/Shared/Heading';
import { imageUpload } from '../../Utils';
import { FaTrashCan, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { icons } from 'lucide-react';

const ManageStaff = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const { register: registerAdd, handleSubmit: handleSubmitAdd, reset: resetAdd, formState: { errors: errorsAdd } } = useForm();
    const { register: registerUpdate, handleSubmit: handleSubmitUpdate, reset: resetUpdate, formState: { errors: errorsUpdate } } = useForm();

    const departments = [
        "Road Maintenance",
        "Electrical Services",
        "Water Supply",
        "Waste Management",
        "Public Health",
        "Traffic Management",
        "Park & Recreation",
        "Building Inspector",
        "Emergency Services",
        "Other",
    ];

    // Fetch all staff
    const { data: staffList = [], isLoading , refetch} = useQuery({
        queryKey: ['staff'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staffs');
            return res.data;
        }
    });

    const handleDeleteStaff = (staff) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${staff.fullName}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/staffs/${staff._id}`)
                .then(res=>{
                    if(res.data.deletedCount){
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Staff member has been removed.',
                        });
                    }
                });
            }
        });
    }

    const handleReject = (staff) => {
        const updatedInfo = {applicationStatus: 'rejected'}
        axiosSecure.patch(`/staffs/${staff._id}`, updatedInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'Staff Rejected',
                    showConfirmButon: false,
                    timer: 2000
                })
            }
        })
    }


    const handleApproval = (staff) => {
        const updatedInfo = {applicationStatus: 'approved'}
        axiosSecure.patch(`/staffs/${staff._id}`, updatedInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Staff Approved',
                    showConfirmButon: false,
                    timer: 2000
                })
            }
        })
    }

    // Add Staff Mutation
    // const addStaffMutation = useMutation({
    //     mutationFn: async (staffData) => {
    //         // First create user in Firebase (you'll need to implement this endpoint in your backend)
    //         const firebaseResponse = await axiosSecure.post('/auth/create-staff', {
    //             email: staffData.email,
    //             password: staffData.password,
    //             displayName: staffData.name
    //         });

    //         // Then save staff data to database
    //         const dbResponse = await axiosSecure.post('/staffs', {
    //             ...staffData,
    //             firebaseUid: firebaseResponse.data.uid,
    //             role: 'staff',
    //             createdAt: new Date().toISOString()
    //         });

    //         return dbResponse.data;
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['staffs']);
    //         setShowAddModal(false);
    //         resetAdd();
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Staff Added!',
    //             text: 'Staff member has been successfully added.',
    //         });
    //     },
    //     onError: (error) => {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Failed to Add Staff',
    //             text: error?.response?.data?.message || 'Something went wrong',
    //         });
    //     }
    // });

    // // Update Staff Mutation
    // const updateStaffMutation = useMutation({
    //     mutationFn: async ({ id, data }) => {
    //         const res = await axiosSecure.patch(`/staffs/${id}`, data);
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['staffs']);
    //         setShowUpdateModal(false);
    //         setSelectedStaff(null);
    //         resetUpdate();
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Staff Updated!',
    //             text: 'Staff information has been successfully updated.',
    //         });
    //     },
    //     onError: (error) => {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Failed to Update Staff',
    //             text: error?.response?.data?.message || 'Something went wrong',
    //         });
    //     }
    // });

    // // Delete Staff Mutation
    // const deleteStaffMutation = useMutation({
    //     mutationFn: async (id) => {
    //         const res = await axiosSecure.delete(`/staffs/${id}`);
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['staff']);
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Deleted!',
    //             text: 'Staff member has been removed.',
    //         });
    //     },
    //     onError: (error) => {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Failed to Delete',
    //             text: error?.response?.data?.message || 'Something went wrong',
    //         });
    //     }
    // });

    // Handle Add Staff Form Submit
    const handleAddStaff = async (data) => {
        const { name, email, phone, password, department, photo } = data;
        
        // Upload photo if provided
        const photoFile = photo[0];
        const photoURL = photoFile ? await imageUpload(photoFile) : 'https://i.pravatar.cc/150';

        const staffData = {
            name,
            email,
            phone,
            password,
            department,
            photo: photoURL
        };

        // addStaffMutation.mutate(staffData);
    };

    // Handle Update Staff Form Submit
    const handleUpdateStaff = async (data) => {
        const { name, phone, department, photo } = data;
        
        let photoURL = selectedStaff.photo;
        
        // Upload new photo if provided
        if (photo && photo[0]) {
            const photoFile = photo[0];
            photoURL = await imageUpload(photoFile);
        }

        const updatedData = {
            name,
            phone,
            department,
            photo: photoURL
        };

        // updateStaffMutation.mutate({ id: selectedStaff._id, data: updatedData });
    };

    // Handle Delete Staff
    // const handleDeleteStaff = (staff) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: `You are about to delete ${staff.name}. This action cannot be undone!`,
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#3085d6',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // deleteStaffMutation.mutate(staff._id);
    //         }
    //     });
    // };

    // Open Update Modal
    const openUpdateModal = (staff) => {
        setSelectedStaff(staff);
        resetUpdate({
            name: staff.name,
            phone: staff.phone,
            department: staff.department
        });
        setShowUpdateModal(true);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <Heading center={false} title="Manage Staff" subtitle="Add, update, or remove staff members" />

            {/* Add Staff Button */}
            <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setShowAddModal(true)} 
                    className="btn btn-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Add Staff
                </button>
            </div>

            {/* Staff Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Staff Info</th>
                            <th>Contact</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No staff members found. Click "Add Staff" to add one.
                                </td>
                            </tr>
                        ) : (
                            staffList.map((staff, index) => (
                                <tr key={staff?._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={staff?.photo} alt={staff?.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{staff?.name}</div>
                                                <div className="text-sm opacity-50">{staff?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{staff?.phone}</td>
                                    <td>
                                        <span className="badge badge-info badge-sm">{staff?.department}</span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm ${staff?.applicationStatus === 'approved' && ' badge-success'} ${staff?.applicationStatus === 'rejected' && ' bg-red-400 text-red-800'} ${staff?.applicationStatus === 'pending' && ' badge-info'}`}>{staff?.applicationStatus}</span>
                                    </td>
                                    <td>
                                        {new Date(staff?.appliedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button onClick={() => {
                                                handleApproval(staff)
                                            }} className='btn'>
                                                <FaUserCheck></FaUserCheck>
                                            </button>
                                            <button onClick={()=>{handleReject(staff)}} className='btn'>
                                                <IoPersonRemoveSharp></IoPersonRemoveSharp>
                                            </button>
                                            <button onClick={()=> handleDeleteStaff(staff)} className='btn'>
                                                <FaTrashCan></FaTrashCan>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Staff Modal */}
            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Add New Staff Member</h3>
                        <form onSubmit={handleSubmitAdd(handleAddStaff)} className="space-y-4">
                            {/* Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name *</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        {...registerAdd('name', { required: 'Name is required' })}
                                        placeholder="Enter full name" 
                                        className="input input-bordered"
                                    />
                                    {errorsAdd.name && <span className="text-error text-sm">{errorsAdd.name.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email *</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        {...registerAdd('email', { required: 'Email is required' })}
                                        placeholder="Enter email" 
                                        className="input input-bordered"
                                    />
                                    {errorsAdd.email && <span className="text-error text-sm">{errorsAdd.email.message}</span>}
                                </div>
                            </div>

                            {/* Phone and Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone *</span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        {...registerAdd('phone', { required: 'Phone is required' })}
                                        placeholder="+880 1XXX-XXXXXX" 
                                        className="input input-bordered"
                                    />
                                    {errorsAdd.phone && <span className="text-error text-sm">{errorsAdd.phone.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password *</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        {...registerAdd('password', { 
                                            required: 'Password is required',
                                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                        })}
                                        placeholder="Enter password" 
                                        className="input input-bordered"
                                    />
                                    {errorsAdd.password && <span className="text-error text-sm">{errorsAdd.password.message}</span>}
                                </div>
                            </div>

                            {/* Department */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department *</span>
                                </label>
                                <select 
                                    {...registerAdd('department', { required: 'Department is required' })}
                                    className="select select-bordered"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Department</option>
                                    {departments.map((dept, idx) => (
                                        <option key={idx} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                {errorsAdd.department && <span className="text-error text-sm">{errorsAdd.department.message}</span>}
                            </div>

                            {/* Photo Upload */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input 
                                    type="file" 
                                    {...registerAdd('photo')}
                                    accept="image/*"
                                    className="file-input file-input-bordered"
                                />
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetAdd();
                                    }} 
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={addStaffMutation.isLoading}
                                >
                                    {addStaffMutation.isLoading ? 'Adding...' : 'Add Staff'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowAddModal(false)}></div>
                </div>
            )}

            {/* Update Staff Modal */}
            {showUpdateModal && selectedStaff && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Update Staff Member</h3>
                        <form onSubmit={handleSubmitUpdate(handleUpdateStaff)} className="space-y-4">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name *</span>
                                </label>
                                <input 
                                    type="text" 
                                    {...registerUpdate('name', { required: 'Name is required' })}
                                    placeholder="Enter full name" 
                                    className="input input-bordered"
                                />
                                {errorsUpdate.name && <span className="text-error text-sm">{errorsUpdate.name.message}</span>}
                            </div>

                            {/* Email (Read-only) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    value={selectedStaff.email}
                                    readOnly
                                    className="input input-bordered bg-gray-100"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                                </label>
                            </div>

                            {/* Phone */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone *</span>
                                </label>
                                <input 
                                    type="tel" 
                                    {...registerUpdate('phone', { required: 'Phone is required' })}
                                    placeholder="+880 1XXX-XXXXXX" 
                                    className="input input-bordered"
                                />
                                {errorsUpdate.phone && <span className="text-error text-sm">{errorsUpdate.phone.message}</span>}
                            </div>

                            {/* Department */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department *</span>
                                </label>
                                <select 
                                    {...registerUpdate('department', { required: 'Department is required' })}
                                    className="select select-bordered"
                                >
                                    {departments.map((dept, idx) => (
                                        <option key={idx} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                {errorsUpdate.department && <span className="text-error text-sm">{errorsUpdate.department.message}</span>}
                            </div>

                            {/* Photo Upload */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Update Photo (optional)</span>
                                </label>
                                <input 
                                    type="file" 
                                    {...registerUpdate('photo')}
                                    accept="image/*"
                                    className="file-input file-input-bordered"
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-500">Leave empty to keep current photo</span>
                                </label>
                            </div>

                            {/* Current Photo Preview */}
                            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                <span className="text-sm font-medium">Current Photo:</span>
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={selectedStaff.photo} alt={selectedStaff.name} />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setShowUpdateModal(false);
                                        setSelectedStaff(null);
                                        resetUpdate();
                                    }} 
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={updateStaffMutation.isLoading}
                                >
                                    {updateStaffMutation.isLoading ? 'Updating...' : 'Update Staff'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowUpdateModal(false)}></div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;