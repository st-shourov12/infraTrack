import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const StaffRoute = ({ children }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    const isStaff = users.some(u => u.role === 'staff');

    if (!isStaff) {
        return <span>Forbidden</span>;
    }

    return children;
};

export default StaffRoute;
