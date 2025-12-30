import React from 'react';
import { 
    FaBell, 
    FaChartLine, 
    FaMobileAlt, 
    FaShieldAlt, 
    FaUsers, 
    FaMapMarkedAlt,
    FaClock,
    FaTrophy,
    FaFileInvoice,
    FaHeadset
} from 'react-icons/fa';
import { MdRocketLaunch, MdVerified } from 'react-icons/md';
import { Link } from 'react-router';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: <MdRocketLaunch className="text-4xl" />,
            title: "Real-time Tracking",
            description: "Monitor your reported issues 24/7 with live status updates and timeline tracking.",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            id: 2,
            icon: <FaChartLine className="text-4xl" />,
            title: "Smart Prioritization",
            description: "AI-powered system automatically prioritizes issues based on urgency and community votes.",
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600"
        },
        {
            id: 3,
            icon: <FaMobileAlt className="text-4xl" />,
            title: "Mobile First Design",
            description: "Report issues on the go with our responsive mobile interface. Available anywhere, anytime.",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            id: 4,
            icon: <FaBell className="text-4xl" />,
            title: "Push Notifications",
            description: "Get instant updates when your issue status changes or when staff responds.",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-600"
        },
        {
            id: 5,
            icon: <FaMapMarkedAlt className="text-4xl" />,
            title: "Interactive Maps",
            description: "Visualize all issues on an interactive map with location-based filtering and clustering.",
            color: "from-red-500 to-red-600",
            bgColor: "bg-red-50",
            iconColor: "text-red-600"
        },
        {
            id: 6,
            icon: <FaUsers className="text-4xl" />,
            title: "Community Voting",
            description: "Upvote important issues to help prioritize what matters most to your community.",
            color: "from-indigo-500 to-indigo-600",
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            id: 7,
            icon: <FaShieldAlt className="text-4xl" />,
            title: "Secure & Private",
            description: "Your data is protected with enterprise-grade security and privacy measures.",
            color: "from-cyan-500 to-cyan-600",
            bgColor: "bg-cyan-50",
            iconColor: "text-cyan-600"
        },
        {
            id: 8,
            icon: <MdVerified className="text-4xl" />,
            title: "Verified Updates",
            description: "All status updates are verified by government officials ensuring transparency.",
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
            iconColor: "text-teal-600"
        },
        {
            id: 9,
            icon: <FaClock className="text-4xl" />,
            title: "Quick Response",
            description: "Average response time of 24 hours with dedicated staff assigned to each issue.",
            color: "from-yellow-500 to-yellow-600",
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-600"
        },
        {
            id: 10,
            icon: <FaTrophy className="text-4xl" />,
            title: "Gamification & Rewards",
            description: "Earn badges, points, and recognition for being an active community contributor.",
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-50",
            iconColor: "text-pink-600"
        },
        {
            id: 11,
            icon: <FaFileInvoice className="text-4xl" />,
            title: "Detailed Analytics",
            description: "Access comprehensive reports and insights on city-wide infrastructure trends.",
            color: "from-violet-500 to-violet-600",
            bgColor: "bg-violet-50",
            iconColor: "text-violet-600"
        },
        {
            id: 12,
            icon: <FaHeadset className="text-4xl" />,
            title: "24/7 Support",
            description: "Round-the-clock customer support to help you with any queries or concerns.",
            color: "from-rose-500 to-rose-600",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-600"
        }
    ];

    return (
        <section className="py-10">
            <div className="">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                            ✨ Features
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
                        Everything You Need to
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-orange-500">
                            Build Better Cities
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        InfraTrack combines powerful features with an intuitive interface to make civic engagement effortless and effective.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                                opacity: 0
                            }}
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                            
                            {/* Icon Container */}
                            <div className={`relative inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={feature.iconColor}>
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative Corner */}
                            <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-linear-to-r from-blue-600 to-orange-500 p-8 rounded-2xl shadow-lg">
                        <div className="text-white text-left">
                            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                            <p className="text-blue-100">Join thousands of citizens making a difference in their communities.</p>
                        </div>
                        <Link to={'/signUp'} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap">
                            Start Reporting Now →
                        </Link>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
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

                /* Floating animation for icons */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .group:hover .icon-float {
                    animation: float 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Features;