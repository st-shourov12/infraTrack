import React from 'react';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { HiMiniUsers } from 'react-icons/hi2';
import { IoHome } from 'react-icons/io5';
import { Link, Outlet } from 'react-router';
import { GrUserSettings, GrUserWorker } from "react-icons/gr";
import { MdOutlineReport, MdOutlineReportProblem, MdSpaceDashboard } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaCreditCard } from 'react-icons/fa6';
import { GoIssueOpened } from 'react-icons/go';
import { RiSdCardFill } from 'react-icons/ri';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import useRole from '../hooks/useRole';

const DashBoard = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: users = []} = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data;
        }
    });

    

    const isAdmin = users.some(u => u.role === 'admin');
    const isStaff = users.some(u => u.role === 'staff');
    const isUser = users.some(u => u.role === 'user');
    



    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <Link to="/" className='font-semibold'>InfraTrack</Link>
                </nav>
                {/* Page content here */}
                <div className="p-4">{<Outlet />}</div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Homepage">
                                {/* Home icon */}
                                <IoHome className='text-lg' />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                                                
                        <li>
                            <Link to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Dashboard">
                                {/* My Issues icon */}
                                <MdSpaceDashboard className='text-lg' />
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/report'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Report Issue">
                                {/* My Issues icon */}
                                <MdOutlineReport  className='text-lg' />
                                <span className="is-drawer-close:hidden">Report Issue</span>
                            </Link>
                        </li>
                        {
                            isUser && <li>
                            <Link to={'/dashboard/my-issues'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="My Issues">
                                {/* My Issues icon */}
                                <MdOutlineReportProblem className='text-lg' />
                                <span className="is-drawer-close:hidden">My Issues</span>
                            </Link>
                        </li>
                        }
                        {
                            isUser && <li>
                            <Link to={'/dashboard/staff'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Be a Staff">
                                {/* My Issues icon */}
                                <GrUserWorker className='text-lg' />
                                <span className="is-drawer-close:hidden">Be a Staff</span>
                            </Link>
                        </li>
                        }
                        {isAdmin && 
                        <li>
                            <Link to={'/dashboard/all-issues'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="All Issues">
                                {/* All Issues icon */}
                                <AiOutlineIssuesClose className='text-lg' />
                                <span className="is-drawer-close:hidden">All Issues</span>
                            </Link>
                        </li>}
                        {/* <li>
                            <Link to={'/dashboard/assign-issues'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Assign Issues">
                                
                                <AiOutlineIssuesClose className='text-lg' />
                                <span className="is-drawer-close:hidden">Assign Issues</span>
                            </Link>
                        </li> */}
                        {isAdmin && <li>
                            <Link to={'/dashboard/manage-users'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Manage Users">
                                {/* Manage Users icon */}
                                <HiMiniUsers className='text-lg' />
                                <span className="is-drawer-close:hidden">Manage Users</span>
                            </Link>
                        </li>}
                        {isAdmin && <li>
                            <Link to={'/dashboard/manage-staff'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Manage Staff">
                                {/* Manage Staff icon */}
                                <GrUserSettings className='text-lg' />
                                <span className="is-drawer-close:hidden">Manage Staff</span>
                            </Link>
                        </li>}
                        { isStaff &&<li>
                            <Link to={'/dashboard/assign-issues'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Assign Issue">
                                {/* Manage Staff icon */}
                                <GoIssueOpened className='text-lg' />
                                <span className="is-drawer-close:hidden">Assigned Issue</span>
                            </Link>
                        </li>}
                        {isAdmin && <li>
                            <Link to={'/dashboard/payment-history'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Payment History">
                                {/* Manage Staff icon */}
                                <FaCreditCard className='text-lg' />
                                <span className="is-drawer-close:hidden">Payment History</span>
                            </Link>
                        </li>}
                        <li>
                            <Link to={'/dashboard/myProfile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="My Profile">
                                {/* Home icon */}
                                <CgProfile className='text-lg' />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </Link>
                        </li>

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;