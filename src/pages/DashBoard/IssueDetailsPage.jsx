import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

// Mock data - replace with your actual data fetching
const issueData = {
  _id: "6946c5593c643a04967af5b7",
  reporterName: "DevShow",
  reporterEmail: "shourov@cm.com",
  reporterPhoto: "https://i.ibb.co/HfGgYbmQ/Snipaste-2023-12-20-17-00-28.png",
  category: "Potholes",
  description: "There are multiple dangerous potholes on the main road near Mouchak market. These potholes have been causing issues for commuters and have led to several accidents. The situation worsens during rain as the holes fill with water making them invisible to drivers.",
  photo: "https://i.ibb.co/tMgd63tk/Snipaste-2025-12-05-12-47-41.png",
  priority: "High",
  region: "Chattogram",
  district: "Chattogram",
  upzila: "Hathazari",
  location: "Mouchak",
  userRole: "user",
  status: "in-progress",
  createdAt: "2025-12-20T15:48:41.096+00:00",
  boosted: true,
  assignedStaff: {
    name: "John Doe",
    email: "john.doe@staff.com",
    photo: "https://i.pravatar.cc/150?img=12",
    phone: "+880 1712-345678",
    department: "Road Maintenance"
  },
  timeline: [
    {
      id: 1,
      status: "resolved",
      message: "Issue has been successfully resolved. Road has been repaired and is now safe for use.",
      updatedBy: "John Doe (Staff)",
      role: "staff",
      date: "2025-12-21T10:30:00.000Z"
    },
    {
      id: 2,
      status: "in-progress",
      message: "Work started on repairing the potholes. Expected completion in 2 days.",
      updatedBy: "John Doe (Staff)",
      role: "staff",
      date: "2025-12-21T08:00:00.000Z"
    },
    {
      id: 3,
      status: "boost",
      message: "Issue priority boosted to High through payment (৳100)",
      updatedBy: "DevShow (Citizen)",
      role: "citizen",
      date: "2025-12-20T18:30:00.000Z"
    },
    {
      id: 4,
      status: "assigned",
      message: "Issue assigned to Staff: John Doe from Road Maintenance Department",
      updatedBy: "Admin",
      role: "admin",
      date: "2025-12-20T17:15:00.000Z"
    },
    {
      id: 5,
      status: "pending",
      message: "Issue reported and awaiting review",
      updatedBy: "DevShow (Citizen)",
      role: "citizen",
      date: "2025-12-20T15:48:41.096Z"
    }
  ]
};

// Mock current user - replace with actual auth
const currentUser = {
  email: "shourov@cm.com",
  role: "user"
};

const IssueDetailsPage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [issue, setIssue] = useState(issueData);

  const isOwner = currentUser.email === issue.reporterEmail;
  const canEdit = isOwner && issue.status === "pending";
  const canDelete = isOwner;
  const canBoost = !issue.boosted;

  const handleEdit = () => {
    alert("Redirect to edit page");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      alert("Issue deleted");
    }
  };

  const handleBoostPayment = () => {
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setIssue({
        ...issue,
        priority: "High",
        boosted: true,
        timeline: [
          {
            id: Date.now(),
            status: "boost",
            message: "Issue priority boosted to High through payment (৳100)",
            updatedBy: `${currentUser.email} (Citizen)`,
            role: "citizen",
            date: new Date().toISOString()
          },
          ...issue.timeline
        ]
      });
      setShowPaymentModal(false);
      alert("Payment successful! Issue priority boosted to High.");
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'badge-warning';
      case 'in-progress': return 'badge-info';
      case 'resolved': return 'badge-success';
      case 'closed': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'badge-error';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  const getTimelineIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-info" />;
      case 'boost':
        return <TrendingUp className="w-6 h-6 text-warning" />;
      case 'assigned':
        return <User className="w-6 h-6 text-primary" />;
      default:
        return <AlertCircle className="w-6 h-6 text-warning" />;
    }
  };

  const getRoleBadge = (role) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'badge-error';
      case 'staff': return 'badge-info';
      case 'citizen': return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="btn btn-ghost btn-sm mb-4">
            ← Back to Issues
          </button>
          <h1 className="text-4xl font-bold">Issue Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Card */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 pt-6">
                <img
                  src={issue.photo}
                  alt={issue.category}
                  className="rounded-xl w-full h-96 object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h2 className="card-title text-3xl mb-2">{issue.category}</h2>
                    <div className="flex flex-wrap gap-2">
                      <div className={`badge ${getPriorityColor(issue.priority)}`}>
                        {issue.priority} Priority
                      </div>
                      <div className={`badge ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </div>
                      {issue.boosted && (
                        <div className="badge badge-accent">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Boosted
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {canEdit && (
                      <button onClick={handleEdit} className="btn btn-primary btn-sm">
                        Edit Issue
                      </button>
                    )}
                    {canDelete && (
                      <button onClick={handleDelete} className="btn btn-error btn-sm">
                        Delete
                      </button>
                    )}
                    {canBoost && (
                      <button onClick={handleBoostPayment} className="btn btn-accent btn-sm">
                        <TrendingUp className="w-4 h-4" />
                        Boost Priority (৳100)
                      </button>
                    )}
                  </div>
                </div>

                <div className="divider"></div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{issue.description}</p>
                </div>

                <div className="divider"></div>

                {/* Location Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase mb-1">Location</h4>
                      <p className="font-medium">{issue.location}</p>
                      <p className="text-sm text-gray-600">{issue.upzila}, {issue.district}</p>
                      <p className="text-sm text-gray-500">{issue.region}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase mb-1">Reported On</h4>
                      <p className="font-medium">
                        {new Date(issue.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(issue.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Issue Timeline</h2>
                <div className="space-y-6">
                  {issue.timeline.map((entry, index) => (
                    <div key={entry.id} className="flex gap-4">
                      {/* Timeline Icon */}
                      <div className="flex flex-col items-center">
                        <div className="bg-base-200 p-2 rounded-full">
                          {getTimelineIcon(entry.status)}
                        </div>
                        {index < issue.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-base-300 mt-2"></div>
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`badge ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                          <span className={`badge badge-sm ${getRoleBadge(entry.role)}`}>
                            {entry.role}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-1">{entry.message}</p>
                        <p className="text-sm text-gray-500">by {entry.updatedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Reporter Info */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Reported By</h3>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={issue.reporterPhoto} alt={issue.reporterName} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{issue.reporterName}</p>
                    <p className="text-sm text-gray-600">{issue.reporterEmail}</p>
                    <div className="badge badge-sm badge-ghost mt-1">{issue.userRole}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Staff Info */}
            {issue.assignedStaff && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Assigned Staff</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                          <img src={issue.assignedStaff.photo} alt={issue.assignedStaff.name} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{issue.assignedStaff.name}</p>
                        <div className="badge badge-info badge-sm">Staff</div>
                      </div>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Department</p>
                        <p className="text-sm">{issue.assignedStaff.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                        <p className="text-sm">{issue.assignedStaff.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                        <p className="text-sm">{issue.assignedStaff.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="card bg-linear-to-br from-primary to-secondary text-primary-content shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg">Issue Statistics</h3>
                <div className="space-y-3 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Timeline Events</span>
                    <span className="font-bold text-lg">{issue.timeline.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Priority Level</span>
                    <span className="font-bold text-lg">{issue.priority}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Current Status</span>
                    <span className="font-bold text-lg capitalize">{issue.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Boost Issue Priority</h3>
            <div className="space-y-4">
              <div className="alert alert-info">
                <AlertCircle className="w-5 h-5" />
                <span>Boosting will upgrade your issue priority to <strong>High</strong> and move it to the top of the queue.</span>
              </div>
              
              <div className="bg-base-200 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Boost Fee:</span>
                  <span className="text-2xl font-bold">৳100</span>
                </div>
                <p className="text-sm text-gray-600">One-time payment for priority boost</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Payment Method</span>
                </label>
                <select className="select select-bordered">
                  <option>bKash</option>
                  <option>Nagad</option>
                  <option>Rocket</option>
                  <option>Credit Card</option>
                </select>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setShowPaymentModal(false)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={processPayment} className="btn btn-primary">
                Pay ৳100 & Boost
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowPaymentModal(false)}></div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailsPage;