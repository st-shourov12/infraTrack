import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Forbidden from '../components/Shared/Forbidden';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

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
        return <LoadingSpinner />
    }

    const isStaff = users.some(u => u.role === 'staff');

    if (!isStaff) {
        return <Forbidden />;
    }

    return children;
};

export default StaffRoute;
