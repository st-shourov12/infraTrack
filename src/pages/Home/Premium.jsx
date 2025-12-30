import { Crown, User } from 'lucide-react';
import React from 'react';

const Premium = () => {
    return (
        <div className='bg-linear-to-r from-blue-600 to-orange-500 py-20'>
            <Heading center={true} title="Premium Subscription" subtitle="Buy Premium Subscription for better Experience"></Heading>

            <div className='max-w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>

                
                <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-400 rounded-lg p-5 lg:p-10">
                    <h3 className="font-semibold text-3xl text-gray-900 mb-2 flex items-center  gap-2">
                        <Crown className="w-5 h-5 text-yellow-600" />
                        Premium Benefits
                    </h3>
                    <ul className="text-xl text-blue-700 space-y-1">
                        <li>• Priority support for your reports than Normal User</li>
                        <li>• Advanced analytics dashboard</li>
                        <li>• Unlimited issue submissions</li>
                        <li>• Early access to new features</li>
                    </ul>
                </div>
                <div className="bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-400 rounded-lg p-5 lg:p-10">
                    <h3 className="font-semibold text-3xl text-gray-900 mb-2 flex items-center  gap-2">
                        <User className="w-5 h-5 text-yellow-600" />
                        Free Cityzen
                    </h3>
                    <ul className="text-xl text-blue-700 space-y-1">
                        <li>• Priority support for your reports less Premium user</li>
                        <li>• Unable to know the latest news</li>
                        <li>• Limited in 3 issue submissions</li>
                        <li>• Have to Buy new Features</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Premium;