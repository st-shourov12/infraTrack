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
                path: 'staff',
                element: <Staff></Staff>,
                loader: () => fetch('/city.json').then(res => res.json())
            },
            {
                path: 'report',
                element: <ReportIssue />,
                loader: () => fetch('/city.json').then(res => res.json())
            }
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
                element: <MyProfile />
            },

            {
                path: 'all-issues',
                element: <AllIssues />
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
                Component: PaymentHistory
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
                element: <ManageUsers />
            },
            {
                path: 'manage-staff',
                element: <ManageStaff />
            },
            {
                path: 'my-issues',
                element: <MyIssues />
            },
        ]
    }
]);