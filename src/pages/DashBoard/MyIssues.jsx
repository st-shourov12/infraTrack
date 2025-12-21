import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: myIssue = [] , refetch } = useQuery({
        queryKey: ['myIssues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`)
            return res.data
        }
    })


    const handleIssueDelete = (issue) => {
        console.log(issue);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/issues/${issue}`)
                    .then(res => {
                        

                        if(res.data.deletedCount){
                            refetch()
                            Swal.fire({
                            title: "Deleted!",
                            text: "Your issue request has been deleted.",
                            icon: "success"
                            });
                        }

                    })

               
            }
        });
    }


    return (
        <div>
            <h2>
                All of my Issues : {myIssue?.length}
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Issue</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            myIssue.map((issue, i) =>
                                <tr key={issue?._id}>
                                    <th>{i + 1}</th>
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

                                            </div>
                                        </div>
                                    </td>
                                    <td>{issue?.description}</td>
                                    <td>{issue?.district}, {issue?.upzila}, {issue?.location} </td>
                                    <td>{issue?.status}</td>
                                    <td>

                                        <button className="btn btn-square">
                                            <FaMagnifyingGlass />
                                        </button>
                                        <button className="btn btn-square">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => { handleIssueDelete(issue?._id) }} className="btn btn-square">
                                            <FaTrashCan />
                                        </button>
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

export default MyIssues;