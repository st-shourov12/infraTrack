import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, XCircle, AlertCircle, DollarSign, Users, FileText, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { GrCompliance } from 'react-icons/gr';
import { IoCloseCircleSharp } from 'react-icons/io5';

const UserDash = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    });

    const { data: issues = [] } = useQuery({
        queryKey: ['issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`)
            return res.data
        }
    }
    )




    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments?userEmail=${user?.email}`
            );
            return res.data;
        }
    });

    const payment = payments.filter(p => p?.userEmail === user?.email);


    const pendingIssue = issues.filter(p => p.status === 'pending')
    const resolvedIssue = issues.filter(p => p.status === 'resolved')
    const closedIssue = issues.filter(p => p.status === 'closed')
    const inProgressIssue = issues.filter(p => p.status === 'in-progress')
    const rejectedIssue = issues.filter(p => p.status === 'rejected');



    const latestIssues = issues.slice(0, 6)
    const latestPayments = payment.slice(0, 6)

    const totalAmount = payment?.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
    ) || 0;




    // Mock data for stats
    const stats = {
        totalIssues: issues.length,
        resolvedIssues: resolvedIssue.length,
        pendingIssues: pendingIssue.length,
        closedIssues: closedIssue.length,
        inProgressIssues: inProgressIssue.length,
        rejectedIssues: rejectedIssue.lentgh,


    };

    // Chart data
    const issueStatusData = [
        { name: 'Closed', value: stats.closedIssues, color: '#10b981' },
        { name: 'Resolved', value: stats.resolvedIssues, color: '#22c55e' },
        { name: 'Pending', value: stats.pendingIssues, color: '#f59e0b' },
        { name: 'In Progress', value: stats.inProgressIssues, color: '#efd044ff' },
        { name: 'Rejected', value: stats.rejectedIssues, color: '#ef4444ff' }
    ].filter(item => item.value > 0);


    const getMonthlyPaymentData = (payments) => {
        const map = {};

        payments.forEach(p => {
            if (!p?.createdAt || !p?.amount) return;

            const date = new Date(p.createdAt);
            const monthKey = date.toLocaleString('en-US', {
                month: 'short',
                year: 'numeric'
            });

            if (!map[monthKey]) {
                map[monthKey] = 0;
            }

            map[monthKey] += Number(p.amount);
        });

        return Object.keys(map).map(month => ({
            month,
            payment: map[month]
        }));
    };


    const monthlyPaymentData = getMonthlyPaymentData(payment);

    const parse = Math.ceil((rejectedIssue.length / issues.length) * 100)




    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'text-green-600 bg-green-50';
            case 'pending': return 'text-yellow-600 bg-yellow-50';
            case 'rejected': return 'text-red-600 bg-red-50';

            case 'in-progress': return 'text-orange-600 bg-orange-50';
            case 'closed': return 'text-blue-600 bg-blue-50';

            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome to DashBoard</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.totalIssues}</h3>
                                <p className="text-green-600 text-sm mt-2 flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    +12% from last month
                                </p>
                            </div>
                            <FileText className="w-12 h-12 text-blue-500 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Closed Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.closedIssues}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {((stats.closedIssues / stats.totalIssues) * 100).toFixed(1)}% closing rate
                                </p>
                            </div>
                            <GrCompliance className="w-12 h-12 text-green-500 opacity-80" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Resolved Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.resolvedIssues}</h3>

                            </div>
                            <CheckCircle className="w-12 h-12 text-green-500 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Pending Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingIssues}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {((stats.pendingIssues / stats.totalIssues) * 100).toFixed(1)}% pending rate
                                </p>
                            </div>
                            <Clock className="w-12 h-12 text-yellow-500 opacity-80" />
                        </div>
                    </div>



                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Payment</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">${totalAmount.toLocaleString()}</h3>

                            </div>
                            <DollarSign className="w-12 h-12 text-purple-500 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{users?.length}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {stats.activeIssues} active issues
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-indigo-500 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-300 col-span-1 ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Active Issues (In Progress)</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.inProgressIssues}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {stats.pendingIssues} pending
                                </p>
                            </div>
                            <AlertCircle className="w-12 h-12 text-orange-500 opacity-80" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-800 col-span-1 ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Rejected</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{isNaN(rejectedIssue.length) ? 0 : rejectedIssue.length}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {parse}% rejected rate
                                </p>
                            </div>
                            <IoCloseCircleSharp className="w-12 h-12 text-orange-700 opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Issue Status Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Issue Status Distribution
                        </h3>


                        {issueStatusData.some(item => item.value > 0) ? (
                            <ResponsiveContainer width="100%" height={300}>



                                <PieChart>
                                    <Pie
                                        data={issueStatusData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, percent = 0 }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }

                                    >
                                        {issueStatusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry?.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-500">
                                No issue data available
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Monthly Payment Analytics
                        </h3>

                        {monthlyPaymentData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyPaymentData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`৳${value}`, 'Total Payment']}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="payment"
                                        name="Total Payment"
                                        fill="#8b5cf6"
                                        radius={[6, 6, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-500">
                                No payment data available
                            </p>
                        )}
                    </div>

                    {/* Monthly Issues Trend
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Issues Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="issues" stroke="#3b82f6" name="Total Issues" strokeWidth={2} />
                                <Line type="monotone" dataKey="resolved" stroke="#10b981" name="Resolved" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div> */}

                    {/* Monthly Payment Trend */}
                    {/* <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payment Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="payment" fill="#8b5cf6" name="Payment ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
                </div>

                {/* Latest Data Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Latest Issues */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">My Issues</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reporter</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {latestIssues.map((issue) => (
                                        <tr key={issue?._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue?.reporterName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{issue?.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue?.status)}`}>
                                                    {issue?.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue?.priority)}`}>
                                                    {issue?.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(issue?.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Latest Payments */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Latest Payments</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reciept</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {latestPayments.map((payment, i) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment?.userName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${payment?.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a

                                                    href={`https://infratrack-server.vercel.app/invoice/${payment?._id}`}
                                                    target="_blank"
                                                    className=" text-white flex flex-col items-center justify-center gap-2 btn bg-green-600 hover:bg-green-700"
                                                >
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Latest Registered Users */}
                    {/* <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Latest Registered Staff</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {latestStaff.map((user) => (
                                        <tr key={user?._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user?.nid}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.fullName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user?.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.department}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}


                    {/* <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Latest Users</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {latestUsers.map((user, i) => (
                                        <tr key={user?._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.displayName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user?.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.isPremium ? 'Premium' : 'Free'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserDash;