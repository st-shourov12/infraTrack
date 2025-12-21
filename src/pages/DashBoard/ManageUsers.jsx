import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { MdBlockFlipped } from 'react-icons/md';
import { CgUnblock } from 'react-icons/cg';

const ManageUsers = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch: refetchUser  } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            return res.data
        }
    })
    
    const handleUserBlock = async(mu) => {
        // updating user into block using
         await axiosSecure.patch(`/users/${mu?._id}`, {
                isBlock : true
            });
            await refetchUser();
            console.log(mu);

    }
    const handleUserUnblock = async(mu) => {
        // updating user into block using
         await axiosSecure.patch(`/users/${mu?._id}`, {
                isBlock : false
            });

            await refetchUser();
            console.log(mu);

    }

    return (
        <div>
            <h3>
                {users.length}
            </h3>
            <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
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
                                                    <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>Premium</span>:
                                                    <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>Free</span>
                                                    }

                                                </td>
                                                <td className=''>
                                                    {manageUser?.role === 'premium-citizen' ? 
                                                    <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>{manageUser?.role}</span>:
                                                    <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>{manageUser?.role}</span>
                                                    }

                                                </td>
                                                <td className=''>
                                                    {manageUser?.isBlock ? 
                                                    
                                                    <span className='bg-red-300 px-4 py-2 rounded-lg text-red-700'>Blocked</span>:
                                                    <span className='bg-green-300 px-4 py-2 rounded-lg text-green-700'>Verified</span>
                                                    }

                                                </td>
                                                {/* <td>{manageUser?.role}</td>
                                                <td></td> */}
                                                <td>
            
                                                    <button className="btn btn-square">
                                                        <FaMagnifyingGlass />
                                                    </button>
                                                    {/* <button className="btn btn-square">
                                                        <FaEdit />
                                                    </button> */}
                                                    {
                                                        manageUser?.isBlock ? 
                                                        <button onClick={() => { handleUserUnblock(manageUser) }} className="btn btn-square">
                                                            <CgUnblock />
                                                        </button>
                                                        :
                                                        <button onClick={() => { handleUserBlock(manageUser) }} className="btn btn-square">
                                                            <MdBlockFlipped />
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