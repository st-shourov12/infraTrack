import React, { useState } from 'react';
import { 
    FaApple, 
    FaGooglePlay, 
    FaBell, 
    FaMapMarkerAlt, 
    FaClock,
    FaQrcode,
    FaStar,
    FaDownload,
    FaCheckCircle
} from 'react-icons/fa';
import { MdPhoneAndroid, MdOfflinePin, MdCameraAlt } from 'react-icons/md';

const AppDownload = () => {
    const [activeScreen, setActiveScreen] = useState(1);

    const features = [
        {
            icon: <MdCameraAlt className="text-2xl" />,
            title: "Quick Capture",
            description: "Report issues with just one tap using your camera"
        },
        {
            icon: <FaBell className="text-2xl" />,
            title: "Push Alerts",
            description: "Get instant notifications on issue status updates"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Auto Location",
            description: "GPS automatically detects and pins your location"
        },
        {
            icon: <MdOfflinePin className="text-2xl" />,
            title: "Offline Mode",
            description: "Save reports offline and sync when connected"
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: "Real-time Tracking",
            description: "Monitor progress with live timeline updates"
        },
        {
            icon: <FaCheckCircle className="text-2xl" />,
            title: "Voice Reports",
            description: "Use voice-to-text for faster issue reporting"
        }
    ];

    const screenshots = [
        { id: 1, title: "Dashboard" },
        { id: 2, title: "Report Issue" },
        { id: 3, title: "Track Status" }
    ];

    const stats = [
        { number: "50K+", label: "Downloads" },
        { number: "4.8", label: "Rating", icon: <FaStar className="text-yellow-400" /> },
        { number: "25K+", label: "Reviews" }
    ];

    return (
        <section className="py-16 md:py-24 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden relative">
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold">
                            📱 Mobile App
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Take InfraTrack
                        <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                            Everywhere You Go
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Report issues on the move with our powerful mobile app. Available for iOS and Android with offline support.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left: Phone Mockup */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative mx-auto max-w-sm">
                            
                            {/* Phone Frame */}
                            <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                                
                                {/* Screen */}
                                <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
                                    {/* Status Bar */}
                                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-3 flex justify-between items-center text-white text-xs">
                                        <span className="font-semibold">9:41</span>
                                        <div className="flex gap-1">
                                            <div className="w-1 h-3 bg-white rounded"></div>
                                            <div className="w-1 h-3 bg-white rounded"></div>
                                            <div className="w-1 h-3 bg-white rounded"></div>
                                            <div className="w-1 h-3 bg-white/50 rounded"></div>
                                        </div>
                                    </div>

                                    {/* App Screenshot Carousel */}
                                    <div className="aspect-9/16 bg-linear-to-br from-blue-50 to-purple-50 relative">
                                        {/* Dashboard Screen */}
                                        {activeScreen === 1 && (
                                            <div className="p-6 space-y-4 animate-fade-in">
                                                <h3 className="text-xl font-bold text-gray-900">Dashboard</h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['Total Issues', 'Resolved', 'Pending', 'In Progress'].map((item, i) => (
                                                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                                                            {/* <div className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 100)}</div> */}
                                                            <div className="text-xs text-gray-600">{item}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="space-y-2">
                                                    {[1, 2, 3].map((item) => (
                                                        <div key={item} className="bg-white rounded-lg p-3 shadow-sm">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                                                                <div className="flex-1">
                                                                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Report Screen */}
                                        {activeScreen === 2 && (
                                            <div className="p-6 space-y-4 animate-fade-in">
                                                <h3 className="text-xl font-bold text-gray-900">Report Issue</h3>
                                                <div className="bg-white rounded-xl p-4 shadow-sm aspect-video flex items-center justify-center">
                                                    <MdCameraAlt className="text-6xl text-gray-300" />
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="h-10 bg-white rounded-lg shadow-sm"></div>
                                                    <div className="h-24 bg-white rounded-lg shadow-sm"></div>
                                                    <div className="h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Track Screen */}
                                        {activeScreen === 3 && (
                                            <div className="p-6 space-y-4 animate-fade-in">
                                                <h3 className="text-xl font-bold text-gray-900">Track Status</h3>
                                                <div className="space-y-3">
                                                    {[
                                                        { label: 'Reported', active: true, complete: true },
                                                        { label: 'Assigned', active: true, complete: true },
                                                        { label: 'In Progress', active: true, complete: false },
                                                        { label: 'Resolved', active: false, complete: false }
                                                    ].map((step, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                                step.complete ? 'bg-green-500' : step.active ? 'bg-blue-500' : 'bg-gray-300'
                                                            }`}>
                                                                {step.complete && <FaCheckCircle className="text-white text-sm" />}
                                                            </div>
                                                            <div className="flex-1 bg-white rounded-lg p-3 shadow-sm">
                                                                <div className={`h-2 rounded ${step.active ? 'bg-blue-200' : 'bg-gray-100'} w-2/3`}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Screen Indicators */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                            {screenshots.map((screen) => (
                                                <button
                                                    key={screen.id}
                                                    onClick={() => setActiveScreen(screen.id)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                        activeScreen === screen.id ? 'bg-blue-600 w-6' : 'bg-gray-300'
                                                    }`}
                                                    aria-label={`View ${screen.title} screen`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl flex items-center justify-center animate-bounce-slow">
                                <MdPhoneAndroid className="text-white text-4xl" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl flex flex-col items-center justify-center animate-bounce-slow animation-delay-1000">
                                <FaStar className="text-yellow-300 text-xl mb-1" />
                                <span className="text-white font-bold text-lg">4.8</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="order-1 lg:order-2 space-y-8">
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white rounded-2xl p-4 shadow-lg text-center">
                                    <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                        {stat.number}
                                        {stat.icon}
                                    </div>
                                    <div className="text-xs text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Download Buttons */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="https://www.apple.com/app-store/" 
                                    className="group flex items-center gap-4 bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex-1"
                                >
                                    <FaApple className="text-4xl" />
                                    <div className="text-left">
                                        <div className="text-xs opacity-80">Download on the</div>
                                        <div className="text-lg font-bold">App Store</div>
                                    </div>
                                </a>
                                <a 
                                    href="https://play.google.com/store/apps?hl=en" 
                                    className="group flex items-center gap-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex-1"
                                >
                                    <FaGooglePlay className="text-3xl" />
                                    <div className="text-left">
                                        <div className="text-xs opacity-90">Get it on</div>
                                        <div className="text-lg font-bold">Google Play</div>
                                    </div>
                                </a>
                            </div>

                            {/* QR Code Option */}
                            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 flex items-center gap-4 border border-blue-100">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <FaQrcode className="text-4xl text-gray-700" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-1">Scan QR Code</h4>
                                    <p className="text-sm text-gray-600">Download instantly on your mobile device</p>
                                </div>
                            </div>

                            {/* Total Downloads Badge */}
                            <div className="flex items-center gap-3 text-gray-600">
                                <FaDownload className="text-blue-600" />
                                <span className="text-sm">
                                    Join <span className="font-bold text-gray-900">50,000+</span> users who are making their cities better
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            {/* <style jsx>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2s;
                }

                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }

                .animation-delay-1000 {
                    animation-delay: 1s;
                }

                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style> */}
        </section>
    );
};

export default AppDownload;