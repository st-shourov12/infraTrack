import React from 'react';
import useAuth from "../hooks/useAuth";
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // const axiosSecure = useAxiosSecure();

    // const { data: users = []} = useQuery({
    //     queryKey: ['user', user?.email],
    //     enabled: !!user?.email,
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users?email=${user.email}`);
    //         return res.data;
    //     }
    // });
    
    const {role , roleLoading} = useRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }
    

    const isAdmin = users.some(u => u.role === 'admin');

    if (!isAdmin) {
        return <span>Forbidden</span>;
    }

    return children;
};

export default AdminRoute;