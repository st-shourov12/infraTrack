import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const { userId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: users } = useQuery({
        queryKey: ['users', userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${userId}`);
            return res.data;
        }
    })

    const handlePayment = async() => {
        const paymentInfo = {
            cost: Number(10),
            userId: users?._id,
            userEmail: users?.email,
            userName: users?.displayName,
            photo : users?.photoURL
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        console.log(res.data);
        
        window.location.href = res.data.url;
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <h2>Please Pay $10 for Premium Subscription </h2>
            <button onClick={handlePayment} className='btn bg-green-400 text-black'>Subscribe</button>
        </div>
    );
};

export default Payment;