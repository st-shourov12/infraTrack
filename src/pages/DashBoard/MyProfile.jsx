
import React, { useState } from 'react';
import { User, Crown, Edit2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../Utils';
import { Link } from 'react-router';

export default function MyProfile() {

    const { user, updateUserProfile } = useAuth();

    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch: refetchUser } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
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

    const latestPayment = payments.filter(p => p?.userEmail === user?.email);

    console.log(latestPayment)


    console.log('pay', latestPayment);

    // USER FROM DB
    const x = users.find(us => us.email === user?.email);



    const { data: issues = [] } = useQuery({
        queryKey: ['issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`)
            return res.data
        }
    }
    )

    const closeIssue = issues.filter(p => p.status == 'closed');

    const parse = (closeIssue.length / issues.length) * 100
    

    const [isEditing, setIsEditing] = useState(false);
    // const [editData, setEditData] = useState({
    //     displayName: user.displayName,
    //     photoURL: user.photoURL
    // });

    const handleUpdateProfile = async (data) => {
        try {
            const name = data?.name || x?.displayName;

            let photoURL = x?.photoURL;
            if (data.image?.[0]) {
                const uploaded = await imageUpload(data.image[0]);
                if (uploaded) photoURL = uploaded;
            }

            // Firebase
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL,
            });

            // MongoDB
            await axiosSecure.patch(`/users/${x._id}`, {
                displayName: name,
                photoURL,
            });

            await refetchUser();
            setIsEditing(false);
        } catch (err) {
            console.error('Profile update failed:', err);
        }
        console.log(user);
    };



    const handleCancelEdit = () => {
        // setEditData({
        //     displayName: user.displayName,
        //     photoURL: user.photoURL
        // });
        setIsEditing(false);
    };

    const handlePayment = async (user) => {
        const paymentInfo = {
            cost: Number(1000),
            userId: user?._id,
            userEmail: user?.email,
            userName: user?.displayName,
            photo: user?.photoURL
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)

        window.location.assign(res.data.url);
    }



    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header with Premium Badge */}
                    <div className="bg-linear-to-r from-indigo-600 to-purple-600 h-32 relative">
                        {x?.isPremium && (
                            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                                <Crown className="w-4 h-4" />
                                Premium Member
                            </div>
                        )}
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-6 pb-8">
                        {/* Profile Picture */}
                        <div className="flex justify-center -mt-16 mb-4">
                            <div className="relative">
                                {x?.photoURL && (
                                    <img
                                        src={x?.photoURL}
                                        alt={x?.displayName}
                                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                    />
                                )}
                                {isEditing && (
                                    <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition">
                                        <Edit2 className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="text-center mb-6">
                            {isEditing ? (
                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                    <div className="space-y-4 max-w-md mx-auto">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                                                Display Name
                                            </label>
                                            <input
                                                type="text"
                                                {...register('name')}
                                                defaultValue={x?.displayName}

                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="issueImage"
                                                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                                            >
                                                Upload Image (required)
                                            </label>
                                            <input
                                                type="file"
                                                {...register('image')}
                                                accept="image/*"

                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4  file:rounded-md file:border-0  file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100  bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-1"
                                            />

                                        </div>
                                    </div>
                                    <div className="flex mt-3 gap-3">
                                        <button
                                            type='submit'
                                            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                </form>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {x?.displayName}
                                    </h1>
                                    <p className="text-gray-600 flex items-center justify-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                                        {user?.email}
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        {!isEditing && (
                            <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-gray-200">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600">{issues.length}</p>
                                    <p className="text-sm text-gray-600">Reports</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600">{closeIssue?.length > 0 ? `${closeIssue.length}` : 0 }</p>
                                    <p className="text-sm text-gray-600">Closed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-indigo-600">{closeIssue?.length > 0 ? `${parse} %` : 0 }</p>
                                    <p className="text-sm text-gray-600">Success Rate</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            {isEditing ||
                                // ? (
                                //     <div className="flex gap-3">
                                //         <button
                                //             onClick={handleUpdateProfile}
                                //             className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
                                //         >
                                //             Save Changes
                                //         </button>
                                //         <button
                                //             onClick={handleCancelEdit}
                                //             className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
                                //         >
                                //             Cancel
                                //         </button>
                                //     </div>
                                // ) : 
                                (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                            Update Profile
                                        </button>

                                        {!x?.isPremium && (
                                            <button onClick={() => handlePayment(x)}

                                                className="w-full bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                            >
                                                <Crown className="w-5 h-5" />
                                                Upgrade to Premium
                                            </button>
                                        )}
                                    </>
                                )}
                        </div>

                        

                        {/* Premium Benefits */}

                        {x?.isPremium && latestPayment.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Pay Reciept</h3>

                                {latestPayment.map(p => (
                                    <a
                                        key={p._id}
                                        href={`http://localhost:3000/invoice/${p._id}`}
                                        target="_blank"
                                        className=" text-white flex flex-col items-center justify-center gap-2 btn bg-green-600 hover:bg-green-700"
                                    >
                                        {p.invoiceId} - Download Invoice (PDF)
                                    </a>
                                ))}
                            </div>
                        )}

                        {!x?.isPremium && !isEditing && (
                            <div className="mt-6 bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Crown className="w-5 h-5 text-yellow-600" />
                                    Premium Benefits
                                </h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Priority support for your reports</li>
                                    <li>• Advanced analytics dashboard</li>
                                    <li>• Unlimited issue submissions</li>
                                    <li>• Early access to new features</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {
                        x?.isBlock &&
                        <h3 className="text-red-700 text-center text-xl font-bold w-1/2 mx-auto">
                            You have been Blocked by admin. Please Contact with us.

                        </h3>
                    }
                </div>
            </div>
        </div>
    );
}