// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: payments = [] } = useQuery({
//         queryKey: ['payments', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments`)
//             return res.data;
//         }
//     })

//     return (
//         <div>
//             <h2 className="text-5xl">Payment History: {payments.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
                           
//                             <th>Amount</th>
//                             <th>Paid Time</th>
//                             <th>Transaction Id</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             payments.map((payment, index) => <tr key={payment._id}>
//                                 <th>{index + 1}</th>
                                
//                                 <td>${payment.amount}</td>
//                                 <td>{payment.createdAt}</td>
//                                 <td>{payment.transactionId}</td>
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;



import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
    FaSearch, 
    FaDownload, 
    FaFilter, 
    FaCalendarAlt,
    FaFileInvoice,
    FaCheckCircle,
    FaCreditCard
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [amountFilter, setAmountFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('newest');

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        }
    });

    // Filter and Sort Logic
    const filteredPayments = useMemo(() => {
        let filtered = [...payments];

        // Search Filter
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(payment =>
                payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.userName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Date Filter
        if (dateFilter !== 'all') {
            const now = new Date();
            filtered = filtered.filter(payment => {
                const paymentDate = new Date(payment.createdAt);
                const diffDays = Math.floor((now - paymentDate) / (1000 * 60 * 60 * 24));

                switch (dateFilter) {
                    case 'today':
                        return diffDays === 0;
                    case 'week':
                        return diffDays <= 7;
                    case 'month':
                        return diffDays <= 30;
                    case 'year':
                        return diffDays <= 365;
                    default:
                        return true;
                }
            });
        }

        // Amount Filter
        if (amountFilter !== 'all') {
            filtered = filtered.filter(payment => {
                switch (amountFilter) {
                    case 'premium':
                        return payment.amount === 1000;
                    case 'boost':
                        return payment.amount === 100;
                    case 'high':
                        return payment.amount > 500;
                    case 'low':
                        return payment.amount <= 500;
                    default:
                        return true;
                }
            });
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'highest':
                    return b.amount - a.amount;
                case 'lowest':
                    return a.amount - b.amount;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [payments, searchQuery, dateFilter, amountFilter, sortBy]);

    // Calculate Statistics
    const stats = useMemo(() => {
        const total = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
        const premium = filteredPayments.filter(p => p.amount === 1000).length;
        const boost = filteredPayments.filter(p => p.amount === 100).length;

        return { total, count: filteredPayments.length, premium, boost };
    }, [filteredPayments]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPaymentType = (amount) => {
        if (amount === 1000) return { label: 'Premium', color: 'bg-purple-100 text-purple-700' };
        if (amount === 100) return { label: 'Boost', color: 'bg-orange-100 text-orange-700' };
        return { label: 'Other', color: 'bg-gray-100 text-gray-700' };
    };

    // const downloadInvoice = (paymentId) => {
    //     window.open(`/invoice/${paymentId}`, '_blank');
    // };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <MdPayment className="text-blue-600" />
                        Payment History
                    </h1>
                    <p className="text-gray-600">View and manage all your payment transactions</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Payments</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaFileInvoice className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Amount</p>
                                <p className="text-2xl font-bold text-green-600">৳{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaCreditCard className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Premium Plans</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.premium}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Issue Boosts</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.boost}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FaCalendarAlt className="text-orange-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by transaction ID, tracking ID, or name..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-300"
                        >
                            <FaFilter />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                                <select
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 Days</option>
                                    <option value="month">Last 30 Days</option>
                                    <option value="year">Last Year</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                                <select
                                    value={amountFilter}
                                    onChange={(e) => setAmountFilter(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Amounts</option>
                                    <option value="premium">Premium (৳1000)</option>
                                    <option value="boost">Boost (৳100)</option>
                                    
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="highest">Highest Amount</option>
                                    <option value="lowest">Lowest Amount</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Transaction ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tracking ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <FaFileInvoice className="text-5xl mb-3" />
                                                <p className="text-lg font-medium">No payments found</p>
                                                <p className="text-sm">Try adjusting your filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment, index) => {
                                        const paymentType = getPaymentType(payment.amount);
                                        return (
                                            <tr key={payment._id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900">{payment.userName}</span>
                                                        <span className="text-xs text-gray-500">{payment.userEmail}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${paymentType.color}`}>
                                                        {paymentType.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-green-600">
                                                    ৳{payment.amount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                        {payment.transactionId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs font-mono bg-blue-50 px-2 py-1 rounded text-blue-700">
                                                        {payment.trackingId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {formatDate(payment.createdAt)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={`http://localhost:3000/invoice/${payment?._id}`}
                                                        target="_blank"
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                                                    >
                                                        <FaDownload />
                                                        Invoice
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Results Info */}
                {filteredPayments.length > 0 && (
                    <div className="mt-4 text-center text-gray-600">
                        Showing {filteredPayments.length} of {payments.length} payments
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;