import React from 'react';
import { FaCamera, FaMapMarkerAlt, FaBell, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { MdTimeline, MdHowToVote } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: <FaCamera className="text-5xl" />,
            title: "Report the Issue",
            description: "Spot a problem? Take a photo, add a description, and select the issue category. It takes less than a minute!",
            details: [
                "Upload photo evidence",
                "Add detailed description",
                "Select issue category",
                "Auto-detect location"
            ],
            color: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            number: "01"
        },
        {
            id: 2,
            icon: <FaMapMarkerAlt className="text-5xl" />,
            title: "We Pinpoint Location",
            description: "Our system automatically detects and pins your exact location on the map for accurate tracking and assignment.",
            details: [
                "GPS-based location",
                "Interactive map view",
                "Area-wise clustering",
                "District assignment"
            ],
            color: "from-orange-500 to-orange-600",
            bgGradient: "from-orange-50 to-orange-100",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            number: "02"
        },
        {
            id: 3,
            icon: <IoMdPeople className="text-5xl" />,
            title: "Staff Gets Assigned",
            description: "Local government staff from the relevant department receives instant notification and accepts the assignment.",
            details: [
                "Auto-assign to department",
                "Staff notification",
                "Priority-based queue",
                "Expert assignment"
            ],
            color: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            number: "03"
        },
        {
            id: 4,
            icon: <MdTimeline className="text-5xl" />,
            title: "Track in Real-Time",
            description: "Monitor every step of the resolution process with live updates, photos, and estimated completion time.",
            details: [
                "Live status updates",
                "Timeline tracking",
                "Push notifications",
                "Progress photos"
            ],
            color: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            number: "04"
        },
        {
            id: 5,
            icon: <FaCheckCircle className="text-5xl" />,
            title: "Issue Gets Resolved",
            description: "Staff completes the work and updates with before/after photos. The issue is marked as resolved.",
            details: [
                "Completion verification",
                "Before/after photos",
                "Quality assurance",
                "Case closure"
            ],
            color: "from-teal-500 to-teal-600",
            bgGradient: "from-teal-50 to-teal-100",
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
            number: "05"
        },
        {
            id: 6,
            icon: <MdHowToVote className="text-5xl" />,
            title: "Community Votes",
            description: "Residents verify the solution and vote. High-impact issues get community recognition and badges.",
            details: [
                "Upvote/downvote system",
                "Community feedback",
                "Quality rating",
                "Earn badges & points"
            ],
            color: "from-pink-500 to-pink-600",
            bgGradient: "from-pink-50 to-pink-100",
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600",
            number: "06"
        }
    ];

    return (
        <section className="max-w-11/12 mx-auto bg-white py-5 md:py-10 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full text-sm font-semibold">
                            🚀 Simple Process
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How InfraTrack
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                            Actually Works
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        From reporting to resolution in 6 simple steps. Our streamlined process ensures your voice is heard and issues are resolved efficiently.
                    </p>
                </div>

                {/* Timeline for Desktop */}
                <div className="hidden lg:block relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 transform -translate-y-1/2 z-0"></div>
                    
                    <div className="relative z-10 grid grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`${index >= 3 ? 'mt-32' : ''}`}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`,
                                    opacity: 0
                                }}
                            >
                                <div className="relative group">
                                    {/* Card */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent hover:-translate-y-2">
                                        
                                        {/* Step Number Badge */}
                                        <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className={step.iconColor}>
                                                {step.icon}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <h3 className={`text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r ${step.color} transition-all duration-300`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {/* Details List */}
                                        <ul className="space-y-2">
                                            {step.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-500">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${step.color} mr-2`}></div>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Connecting Dot */}
                                    <div className={`absolute ${index >= 3 ? '-top-16' : '-bottom-16'} left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-linear-to-br ${step.color} shadow-lg border-4 border-white`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet View */}
                <div className="lg:hidden space-y-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="relative"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                                opacity: 0
                            }}
                        >
                            {/* Vertical Line */}
                            {index !== steps.length - 1 && (
                                <div className={`absolute left-10 top-20 bottom-0 w-1 bg-linear-to-b ${step.color} opacity-20 transform translate-x-1/2`}></div>
                            )}

                            <div className="relative flex gap-6">
                                {/* Left: Icon & Number */}
                                <div className="flex flex-col items-center shrink-0">
                                    <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl ${step.iconBg} mb-2`}>
                                        <div className={step.iconColor}>
                                            {step.icon}
                                        </div>
                                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                                            {step.number}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                                    <h3 className={`text-xl font-bold text-gray-900 mb-2 bg-linear-to-r ${step.color} bg-clip-text text-transparent`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                    <ul className="space-y-1.5">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center text-xs text-gray-500">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${step.color} mr-2`}></div>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl">
                        <div className="bg-white rounded-2xl p-8 md:p-12">
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Ready to Make a Difference?
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                Join thousands of active citizens who are transforming their neighborhoods one issue at a time.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="group px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                    Start Reporting Issues
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                {/* <button className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300">
                                    Watch Demo Video
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* CSS Animations */}
            {/* <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .group:hover .pulse-animation {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style> */}
        </section>
    );
};

export default HowItWorks;