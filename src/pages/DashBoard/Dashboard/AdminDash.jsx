import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, XCircle, AlertCircle, DollarSign, Users, FileText, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminDash = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allIssues = [] } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues`);
            return res.data;
        },


    });
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },


    });

    const { data: staffs = [] } = useQuery({
        queryKey: ['staffs'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staffs`);
            return res.data;
        },


    });


    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],

        queryFn: async () => {
            const res = await axiosSecure.get(
                `/payments`
            );
            return res.data;
        }
    });

    const latestStaff = staffs.slice(0, 6)


    const pendingIssue = allIssues.filter(p => p.status === 'pending')
    const resolvedIssue = allIssues.filter(p => p.status === 'resolved')
    const closedIssue = allIssues.filter(p => p.status === 'closed')
    const inProgressIssue = allIssues.filter(p => p.status === 'in-progress')


    const latestIssues = allIssues.slice(0, 6)
    const latestUsers = users.slice(0, 6)
    const latestPayments = payments.slice(0, 6)

    const totalAmount = payments?.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
    ) || 0;




    // Mock data for stats
    const stats = {
        totalIssues: allIssues.length,
        resolvedIssues: resolvedIssue.length,
        pendingIssues: pendingIssue.length,
        closedIssues: closedIssue.length,
        inProgressIssues: inProgressIssue.length,
        totalPayment: 45750,
        avgResolutionTime: 3.2,
        totalUsers: 1234,
        activeIssues: 58
    };

    // Chart data
    const issueStatusData = [
        { name: 'Closed', value: stats.closedIssues, color: '#10b981' },
        { name: 'Pending', value: stats.pendingIssues, color: '#f59e0b' },
        { name: 'In Progress', value: stats.inProgressIssues, color: '#ef4444' }
    ];



    const monthlyData = [
        { month: 'Jul', issues: 45, resolved: 38, payment: 8500 },
        { month: 'Aug', issues: 52, resolved: 44, payment: 9200 },
        { month: 'Sep', issues: 48, resolved: 42, payment: 8800 },
        { month: 'Oct', issues: 51, resolved: 47, payment: 9800 },
        { month: 'Nov', issues: 39, resolved: 35, payment: 7650 },
        { month: 'Dec', issues: 12, resolved: 8, payment: 1800 }
    ];

    // Latest issues
    //   const latestIssues = [
    //     { id: '#2847', title: 'Payment gateway error', status: 'Pending', priority: 'High', date: '2025-12-24' },
    //     { id: '#2846', title: 'UI bug on mobile', status: 'Resolved', priority: 'Medium', date: '2025-12-24' },
    //     { id: '#2845', title: 'Login issues', status: 'Pending', priority: 'Critical', date: '2025-12-23' },
    //     { id: '#2844', title: 'Feature request - Dark mode', status: 'Rejected', priority: 'Low', date: '2025-12-23' },
    //     { id: '#2843', title: 'Database sync issue', status: 'Resolved', priority: 'High', date: '2025-12-22' }
    //   ];

    // Latest payments
    //   const latestPayments = [
    //     { id: 'PAY-1234', user: 'John Doe', amount: 250, method: 'Credit Card', date: '2025-12-24', status: 'Completed' },
    //     { id: 'PAY-1233', user: 'Jane Smith', amount: 180, method: 'PayPal', date: '2025-12-24', status: 'Completed' },
    //     { id: 'PAY-1232', user: 'Mike Johnson', amount: 320, method: 'Bank Transfer', date: '2025-12-23', status: 'Pending' },
    //     { id: 'PAY-1231', user: 'Sarah Williams', amount: 150, method: 'Credit Card', date: '2025-12-23', status: 'Completed' },
    //     { id: 'PAY-1230', user: 'Robert Brown', amount: 290, method: 'PayPal', date: '2025-12-22', status: 'Completed' }
    //   ];

    // Latest users
    //   const latestUsers = [
    //     { id: 'USR-5678', name: 'Emily Davis', email: 'emily.d@email.com', date: '2025-12-24', issues: 2 },
    //     { id: 'USR-5677', name: 'David Wilson', email: 'david.w@email.com', date: '2025-12-24', issues: 1 },
    //     { id: 'USR-5676', name: 'Lisa Anderson', email: 'lisa.a@email.com', date: '2025-12-23', issues: 3 },
    //     { id: 'USR-5675', name: 'James Martinez', email: 'james.m@email.com', date: '2025-12-23', issues: 0 },
    //     { id: 'USR-5674', name: 'Maria Garcia', email: 'maria.g@email.com', date: '2025-12-22', issues: 1 }
    //   ];

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
                    <p className="text-gray-600 mt-1">Welcome back! Here's your overview</p>
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

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Closed Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.closedIssues}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {((stats.closedIssues / stats.totalIssues) * 100).toFixed(1)}% closing rate
                                </p>
                            </div>
                            <CheckCircle className="w-12 h-12 text-green-500 opacity-80" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Resolved Issues</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-2">{stats.resolvedIssues}</h3>
                                <p className="text-gray-600 text-sm mt-2">
                                    {((stats.resolvedIssues / stats.totalIssues) * 100).toFixed(1)}% resolution rate
                                </p>
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
                                    Avg. {stats.avgResolutionTime} days to resolve
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

                    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500 col-span-1 md:col-span-2 lg:col-span-2">
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
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Issue Status Distribution */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Status Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={issueStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {issueStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Issues Trend */}
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
                    </div>

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
                            <h3 className="text-lg font-semibold text-gray-900">Latest Issues</h3>
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

                                                    href={`http://localhost:3000/invoice/${payment?._id}`}
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
                    <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    </div>


                    <div className="bg-white rounded-lg shadow overflow-hidden">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDash;