import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";
import ReportIssue from "../pages/ReportIssue/ReportIssue";
import DashBoard from "../layout/DashBoard";
import AllIssues from "../pages/DashBoard/AllIssues";
import ManageUsers from "../pages/DashBoard/ManageUsers";
import ManageStaff from "../pages/DashBoard/ManageStaff";
import MyIssues from "../pages/DashBoard/MyIssues";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/DashBoard/MyProfile";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/Payment/PaymentHistory";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/DashBoard/Payment/PaymentCancelled";
import IssueDetailsPage from "../pages/DashBoard/IssueDetailsPage";
import Staff from "../pages/Staff/Staff";
import AssignedIssue from "../pages/DashBoard/AssignedIssue";
import AllIssueUser from "../pages/AllIssueUser";
import Dash from "../pages/DashBoard/Dashboard/Dash";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            
            {
                path: 'issues',
                element: <AllIssueUser />,
                
            },
            {
                path: 'issues/:issueId',
                element: <IssueDetailsPage />,
                
            },
            
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signUp',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dash />

            },
            {
                path: 'report',
                element: <ReportIssue />,
                loader: () => fetch('/city.json').then(res => res.json())
            },
            {
                path: 'myProfile',
                element: <MyProfile />
            },
            {
                path: 'staff',
                element: <Staff></Staff>,
                loader: () => fetch('/city.json').then(res => res.json())
            },

            {
                path: 'all-issues',
                element: <AdminRoute><AllIssues /></AdminRoute> 
            },
            {
                path: `all-issues/:userId`,
                Component: IssueDetailsPage
            },
            {
                path: `payment/:userId`,
                Component: Payment
            },
            {
                path: 'payment-history',
                element: <AdminRoute><PaymentHistory /></AdminRoute> 
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: 'manage-staff',
                element: <AdminRoute><ManageStaff /></AdminRoute>,
                loader: () => fetch('/city.json').then(res => res.json())
            },
            {
                path: 'my-issues',
                element: <MyIssues />
            },
            {
                path: 'assign-issues',
                element: <StaffRoute><AssignedIssue /></StaffRoute>
            },
        ]
    }
]);