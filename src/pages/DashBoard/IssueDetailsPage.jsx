import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, AlertCircle, CheckCircle, XCircle, TrendingUp, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { LiaSkullCrossbonesSolid } from "react-icons/lia";
import UpdateIssue from '../ReportIssue/UpdateIssue';
import { FaVoteYea } from 'react-icons/fa';



// Mock current user - replace with actual auth


const IssueDetailsPage = () => {
  const { issueId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  console.log(issueId)

  const { data: issue = {}, refetch } = useQuery({
    queryKey: ['issue', issueId],
    enabled: !!issueId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${issueId}`);
      return res.data;
    }
  });

  const { data: users = [] } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    }
  });

  const currentUser = users[0];







  const [showPaymentModal, setShowPaymentModal] = useState(false);


  const isOwner = currentUser?.email === issue?.reporterEmail;
  const canEdit = isOwner && issue?.status === "pending";
  const canDelete = isOwner;
  const canBoost = !issue?.boosted;

  const handleEdit = () => {
    setShowEditModal(true)
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete ${issue?.category}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, reject!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${issue?._id}`)
          .then(() => {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",

            });
          })

      }
    })
  };

  const handleBoostPayment = () => {
    setShowPaymentModal(true);
  };




  const processPayment = async () => {

    const paymentInfo = {
      cost: Number(100),
      userId: currentUser?._id,
      userEmail: currentUser?.email,
      userName: currentUser?.displayName,
      photo: currentUser?.photoURL,
      issueId: issue?._id,
    }
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)

    window.location.assign(res.data.url);


  }

  // const update = {

  //   priority: "High",
  //   boosted: true,
  //   timeline: [
  //     {
  //       id: 3,
  //       status: "boost",
  //       message: "Issue priority boosted to High through payment (৳100)",
  //       updatedBy: `${currentUser.email} (${currentUser?.role})`,
  //       role: "citizen",
  //       date: new Date().toISOString()
  //     },
  //     ...issue.timeline
  //   ]
  // };
  // axiosSecure.patch(`/issues/${issue?._id}`, update)
  //   .then(() => {
  //     setShowPaymentModal(false);
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Issue Boasted',
  //       timer: 2000,
  //     });

  //   });





  const handleVote = (issue) => {
    const { upvoted, upvotedBy, _id, category, reporterEmail } = issue;

    const upvote = upvoted + 1;
    const isSameUser = reporterEmail === currentUser.email;
    const worthyVoter = currentUser?.email !== issue?.upvotedBy?.some(s => s.email)


    if (!isSameUser && worthyVoter) {

      const update =
      {
        upvoted: upvote,
        upvotedBy: [
          { email: currentUser.email },
            ...upvotedBy
        ],
        
      }


      axiosSecure.patch(`/issues/${_id}`,update)
        .then((res) => {
          if (res.data.modifiedCount) {


            refetch()


            Swal.fire({
              icon: 'success',
              title: `${category} issue is upvoted.`,
              timer: 1000,
            });





          }
        })
    } else if (isSameUser) {
      Swal.fire({
        icon: 'warning',
        title: `You can not vote your own issue`,
        timer: 1000,
      });

    }
    else if (!worthyVoter) {
      Swal.fire({
        icon: 'warning',
        title: `You can vote only once`,
        timer: 1000,
      });

    }



  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'boost': return 'badge-secondary';
      case 'assigned': return 'badge-accent';
      case 'rejected': return 'badge-error';
      case 'in-progress': return 'badge-info';
      case 'resolved': return 'badge-success';
      case 'closed': return 'badge-neutral';

      default: return 'badge-ghost';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'badge-error';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  const getTimelineIcon = (status) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return <CheckCircle className="w-6 h-6 text-success" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-info" />;
      case 'rejected':
        return <LiaSkullCrossbonesSolid className="w-6 h-6 text-red-800" />;
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
          <Link to={-1} className="btn btn-ghost btn-sm mb-4">
            ← Back to Issues
          </Link>
          <h1 className="text-4xl font-bold">Issue Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Card */}
            <div className="card bg-base-100 shadow-xl">
              <figure className="px-6 relative pt-6">
                <img
                  src={issue?.photo}
                  alt={issue?.category}
                  className="rounded-xl w-full h-96 object-cover"
                />
                <button onClick={() => handleVote(issue)} className="bg-blue-300 py-2 text-xs gap-1 text-center flex justify-center absolute top-8 right-8 items-center px-3 rounded-lg text-blue-700">
                  <FaVoteYea className='text-lg' />
                  {issue?.upvoted}
                </button>
              </figure>
              <div className="card-body">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h2 className="card-title text-3xl mb-2">{issue?.category}</h2>
                    <div className="flex flex-wrap gap-2">
                      <div className={`badge ${getPriorityColor(issue?.priority)}`}>
                        {issue?.priority} Priority
                      </div>
                      <div className={`badge ${getStatusColor(issue?.status)}`}>
                        {issue?.status}
                      </div>
                      {issue?.boosted && (
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
                      <button onClick={() => { handleEdit(), setEditingIssue(issue) }} className="btn btn-primary btn-sm">
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
                        <UpdateIssue refetch={refetch} editingIssue={editingIssue} setShowEditModal={setShowEditModal}></UpdateIssue>
                      </div>
                    </div>
                  </div>
                )}

                <div className="divider"></div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{issue?.description}</p>
                </div>

                <div className="divider"></div>

                {/* Location Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase mb-1">Location</h4>
                      <p className="font-medium">{issue?.location}</p>
                      <p className="text-sm text-gray-600">{issue?.upzila}, {issue?.district}</p>
                      <p className="text-sm text-gray-500">{issue?.region}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 uppercase mb-1">Reported On</h4>
                      <p className="font-medium">
                        {new Date(issue?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(issue?.createdAt).toLocaleTimeString('en-US', {
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
                  {issue.timeline?.map((entry, index) => (
                    <div key={entry.id} className="flex gap-4">
                      {/* Timeline Icon */}
                      <div className="flex flex-col items-center">
                        <div className="bg-base-200 p-2 rounded-full">
                          {getTimelineIcon(entry?.status)}
                        </div>
                        {index < issue.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-base-300 mt-2"></div>
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`badge ${getStatusColor(entry?.status)}`}>
                            {entry?.status}
                          </span>
                          <span className={`badge badge-sm ${getRoleBadge(entry?.role)}`}>
                            {entry?.role}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry?.assignedAt || entry?.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-1">{entry?.message}</p>
                        <p className="text-sm text-gray-500">by {entry?.updatedBy}</p>
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
                      <img src={issue?.reporterPhoto} alt={issue?.reporterName} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold">{issue?.reporterName}</p>
                    <p className="text-sm text-gray-600">{issue?.reporterEmail}</p>
                    <div className="badge badge-sm badge-ghost mt-1">{issue?.userRole}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Staff Info */}
            {issue?.assignedStaff && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Assigned Staff</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-16 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
                          <img src={issue?.assignedStaff.photo} alt={issue?.assignedStaff.name} />

                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{issue?.assignedStaff.name}</p>
                        <div className="badge badge-info badge-sm">Staff</div>
                      </div>
                    </div>
                    <div className="divider my-2"></div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Department</p>
                        <p className="text-sm">{issue?.assignedStaff.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                        <p className="text-sm">{issue?.assignedStaff.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold">Phone</p>
                        <p className="text-sm">{issue?.assignedStaff.phone}</p>
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
                    <span className="font-bold text-lg">{issue?.timeline?.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Priority Level</span>
                    <span className="font-bold text-lg">{issue?.priority}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Current Status</span>
                    <span className="font-bold text-lg capitalize">{issue?.status}</span>
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