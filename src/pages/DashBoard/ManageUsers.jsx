import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';
import { FaMagnifyingGlass, FaTrashCan, FaUserShield } from 'react-icons/fa6';
import { MdBlockFlipped } from 'react-icons/md';
import { CgUnblock } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { LuUserRoundX, LuUserX } from 'react-icons/lu';
import Heading from '../../components/Shared/Heading';

const ManageUsers = () => {
    // const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch: refetchUser } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })

    // , refetch: refetchStaff
    const { data: staffs = [] } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs`)
            return res.data
        }
    })




    const handleUserBlock = (mu) => {

        Swal.fire({
            title: 'Are you sure?',
            text: `Block ${mu.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Block!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${mu?._id}`, {
                    isBlock: true
                })
                    .then(() => {
                        refetchUser();
                        Swal.fire('Block', '', 'warning')

                    })
            }





        })

    }
    const handleUserUnblock = async (mu) => {


        Swal.fire({
            title: 'Are you sure?',
            text: `UnBlock ${mu.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Block!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${mu?._id}`, {
                    isBlock: false
                })
                    .then(() => {
                        refetchUser();
                        Swal.fire('UnBlock', '', 'success')

                    })
            }





        })



    }

    const handleMakeAdmin = mu => {

        Swal.fire({
            title: 'Are you sure?',
            text: `Make Admin ${mu?.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Make admin!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${mu?._id}`, {
                    role: 'admin'
                })
                    .then(() => {
                        refetchUser();
                        Swal.fire('Admin', '', 'success')

                    })
            }





        })


    }

    const handleRemoveAdmin = (mu) => {

        // if (!staffs.length) {
        //     Swal.fire('Staff data not loaded yet');
        //     return;
        // }

        const isStaff = staffs.find(
            (s) => s.email === mu.email
        );

        const role = isStaff ? 'staff' : 'user';

        Swal.fire({
            title: 'Are you sure?',
            text: `Remove Admin ${mu.displayName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${mu._id}`, {
                    role,
                }).then(() => {
                    refetchUser();
                    Swal.fire('Removed', '', 'success');
                });
            }
        });
    };



    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
           <Heading
                center={false}
                title="Manage Users"
                subtitle="Add, authorized, explore the role"
            />
            <div className="overflow-x-auto bg-white rounded-lg shadow my-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>User</th>
                            <th>Premium Ship</th>
                            <th>Role</th>
                            <th>Authorized</th>
                            {/* <th>Location</th>
                                        <th>Status</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((manageUser, i) =>
                                <tr key={manageUser?._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={manageUser?.photoURL}
                                                        alt={manageUser?.displayName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{manageUser?.displayName}</div>

                                            </div>
                                        </div>
                                    </td>

                                    <td className=''>
                                        {manageUser?.isPremium ?
                                            <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>Premium</span> :
                                            <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>Free</span>
                                        }

                                    </td>
                                    <td className=''>
                                        {manageUser?.role === 'premium-citizen' ?
                                            <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>{manageUser?.role}</span> :
                                            <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>{manageUser?.role}</span>
                                        }

                                    </td>
                                    <td className=''>
                                        {manageUser?.isBlock ?

                                            <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>Blocked</span> :
                                            <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>Verified</span>
                                        }

                                    </td>
                                    {/* <td>{manageUser?.role}</td>
                                                <td></td> */}
                                    <td className='flex items-center gap-2'>


                                        {/* <button className="btn btn-square">
                                                        <FaEdit />
                                                    </button> */}
                                        {
                                            manageUser?.isBlock ?
                                                <button onClick={() => { handleUserUnblock(manageUser) }} className="btn text-green-500">
                                                    <CgUnblock />Unblock
                                                </button>
                                                :
                                                <button onClick={() => { handleUserBlock(manageUser) }} className="btn text-red-500">
                                                    <MdBlockFlipped />Block
                                                </button>
                                        }
                                        {
                                            manageUser?.role === 'user' || manageUser?.role === 'staff' ?
                                                <button onClick={() => { handleMakeAdmin(manageUser) }} className="btn text-green-500">
                                                    <FaUserShield />Make Admin
                                                </button> :

                                                <button onClick={() => { handleRemoveAdmin(manageUser) }} className="btn text-red-500">
                                                    <LuUserRoundX />Remove Admin
                                                </button>
                                        }


                                    </td>
                                </tr>
                            )
                        }





                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;