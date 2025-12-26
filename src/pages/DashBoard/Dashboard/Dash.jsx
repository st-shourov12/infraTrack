import React from 'react';
import AdminDash from './AdminDash';
import UserDash from './UserDash';
import StaffDash from './StaffDash';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Dash = () => {


    const { user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    });

    const userAdmin = users.filter(user => user?.role === 'admin');
    const userStaff = users.filter(user => user?.role === 'staff');
    const userCityzen = users.filter(user => user?.role === 'user');
    const userPCityzen = users.filter(user => user?.role === 'premium-citizen');
    const citizen =  userCityzen.length !== 0  ?  userCityzen : userPCityzen ;

    console.log(userAdmin)

    return (
        <div>
            {
                userAdmin.length === 0 || <AdminDash />
            }
            {
                userStaff.length === 0 || <StaffDash></StaffDash>
            }
            {
                citizen.length === 0 || <UserDash />
            }
            

            

            
            
        </div>
    );
};

export default Dash;