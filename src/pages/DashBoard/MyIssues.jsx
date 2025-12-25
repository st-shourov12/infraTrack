import React, { useState, useMemo } from 'react';
import { X, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import UpdateIssue from '../ReportIssue/UpdateIssue';

const MyIssues = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    
    const [filters, setFilters] = useState({
        status: 'all',
        category: 'all',
        priority: 'all'
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingIssue, setEditingIssue] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    // const [filteredIssues, setFilteredIssues] = useState([]);

    // Fetch issues from database
    const { data: allIssues = [], refetch, isLoading } = useQuery({
        queryKey: ['myIssues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Apply filters
   const filteredIssues = useMemo(() => {
    let filtered = [...allIssues];

    if (filters.status !== 'all') {
        filtered = filtered.filter(
            issue => issue.status === filters.status
        );
    }

    if (filters.category !== 'all') {
        filtered = filtered.filter(
            issue => issue.category === filters.category
        );
    }

    if (filters.priority !== 'all') {
        filtered = filtered.filter(
            issue => issue.priority?.toLowerCase() === filters.priority
        );
    }

        return filtered;
    }, [filters, allIssues]);

    

    const handleEdit = (issue) => {
        setEditingIssue({ ...issue });
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this issue?')) {
            try {
                await axiosSecure.delete(`/issues/${id}`);
                refetch();
            } catch (error) {
                console.error('Error deleting issue:', error);
                alert('Failed to delete issue');
            }
        }
    };

    const handleViewDetails = (id) => {
        window.location.href = `/issue-details/${id}`;
    };

    // const handleEditSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axiosSecure.patch(`/issues/${editingIssue._id}`, {
    //             category: editingIssue.category,
    //             description: editingIssue.description,
    //             priority: editingIssue.priority,
    //             region: editingIssue.region,
    //             district: editingIssue.district,
    //             upzila: editingIssue.upzila,
    //             location: editingIssue.location
    //         });
    //         refetch();
    //         setShowEditModal(false);
    //         setEditingIssue(null);
    //     } catch (error) {
    //         console.error('Error updating issue:', error);
    //         alert('Failed to update issue');
    //     }
    // };

    // const handleEditChange = (field, value) => {
    //     setEditingIssue({ ...editingIssue, [field]: value });
    // };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        const lowerPriority = priority?.toLowerCase();
        switch (lowerPriority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-orange-100 text-orange-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your issues...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">My Issues</h2>
                    <p className="text-gray-600">Manage and track your reported issues</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <Filter size={20} />
                            {showFilters ? 'Hide' : 'Show'} Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Potholes">Potholes</option>
                                    <option value="Broken Streetlights">Broken Streetlights</option>
                                    <option value="Water Leakage">Water Leakage</option>
                                    <option value="Garbage Overflow">Garbage Overflow</option>
                                    <option value="Damaged Footpaths">Damaged Footpaths</option>
                                    <option value="Drainage Blockage">Drainage Blockage</option>
                                    <option value="Illegal Parking">Illegal Parking</option>
                                    <option value="Broken Park Bench">Broken Park Bench</option>
                                    <option value="Faulty Traffic Signal">Faulty Traffic Signal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <select
                                    value={filters.priority}
                                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Issues List */}
                <div className="space-y-4">
                    {filteredIssues.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <p className="text-gray-500 text-lg">No issues found</p>
                        </div>
                    ) : (
                        filteredIssues.map((issue) => (
                            <div key={issue._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Issue Image */}
                                        <div className="shrink-0">
                                            <img
                                                src={issue.photo}
                                                alt={issue.category}
                                                className="w-full md:w-48 h-48 object-cover rounded-lg"
                                            />
                                        </div>

                                        {/* Issue Details */}
                                        <div className="grow">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {issue.category}
                                                    </h3>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                                                            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                                                            {issue.priority} Priority
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Location:</span>
                                                    <span className="ml-2 text-gray-900">{issue.upzila}, {issue.district}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Region:</span>
                                                    <span className="ml-2 text-gray-900">{issue.region}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-3">
                                                {issue.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleEdit(issue)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                        Edit Issue
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(issue._id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                    Delete
                                                </button>

                                                <button
                                                    onClick={() => handleViewDetails(issue._id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                                >
                                                    <Eye size={18} />
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Edit Modal */}
                {showEditModal && editingIssue && (

                    // convert this form into react hook form
                    
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Edit Issue</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <UpdateIssue editingIssue={editingIssue} setShowEditModal={setShowEditModal}></UpdateIssue>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIssues;