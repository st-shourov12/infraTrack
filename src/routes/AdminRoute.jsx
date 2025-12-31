import React from 'react';
import useAuth from "../hooks/useAuth";
 import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import Forbidden from '../components/Shared/Forbidden';

const AdminRoute = ({ children }) => {
    const {  loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    const { data: users = []} = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    });
    
    // const {role, roleLoading} = useRole();
    // console.log('role', role);
   
    const isAdmin = users.some(u => u.role === 'admin');

    if (loading ) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(!isAdmin){
        return <Forbidden></Forbidden>
    }

   


    return children;
};

export default AdminRoute;