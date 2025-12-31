import React from 'react';
import { Link } from 'react-router';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedinIn, 
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaArrowRight,
    FaGithub
} from 'react-icons/fa';
import { MdRocketLaunch } from 'react-icons/md';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Issues', path: '/issues' },
        { name: 'Report Issue', path: '/dashboard/report' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Be a Staff', path: '/dashboard/staff' },
        
    ];

    const resources = [
        { name: 'Help Center', path: '/help' },
        { name: 'API Documentation', path: '/api-docs' },
    
        { name: 'Blog', path: '/blog' },
        { name: 'Guidelines', path: '/guidelines' },
        { name: 'FAQ', path: '/faq' }
    ];

    const legal = [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Data Security', path: '/security' }
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, url: 'https://www.facebook.com/mirazulislam.shourov', name: 'Facebook', color: 'hover:bg-blue-600' },
        { icon: <FaGithub />, url: 'https://github.com/st-shourov12', name: 'GitHub', color: 'hover:bg-gray-500' },
        { icon: <FaInstagram />, url: 'https://www.instagram.com/shourov_miraz/', name: 'Instagram', color: 'hover:bg-pink-600' },
        { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/miraz-shourov/', name: 'LinkedIn', color: 'hover:bg-blue-700' },
        
    ];

    return (
        <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            
            {/* Newsletter Section */}
            {/* <div className="bg-linear-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-white text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated</h3>
                            <p className="text-blue-100">Subscribe to get weekly updates on resolved issues and city improvements.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-80"
                            />
                            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                                Subscribe
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer Content */}
            <div className="max-w-11/12 mx-auto  py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <MdRocketLaunch className="text-white text-2xl" />
                            </div>
                            <span className="text-2xl font-bold text-white">InfraTrack</span>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Empowering citizens to report, track, and resolve civic infrastructure issues. Building better cities together through transparency and accountability.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                                <span className="text-sm">123 Civic Center, Dhaka-1000, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                                <FaPhoneAlt className="text-blue-500 shrink-0" />
                                <span className="text-sm">+880 1234-567890</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                                <FaEnvelope className="text-blue-500 shrink-0" />
                                <span className="text-sm">support@infratrack.com</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {resources.map((resource, index) => (
                                <li key={index}>
                                    <Link
                                        to={resource.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                                    >
                                        {resource.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {legal.map((item, index) => (
                                <li key={index}>
                                    <button
                                        to={item.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 inline-block"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* App Download Badges */}
                        <div className="mt-6 space-y-2">
                            <a 
                                href="https://www.apple.com/app-store/" 
                                className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl">📱</div>
                                    <div>
                                        <div className="text-xs text-gray-400">Download on</div>
                                        <div className="text-sm font-semibold text-white">App Store</div>
                                    </div>
                                </div>
                            </a>
                            <a 
                                href="https://play.google.com/store/apps?hl=en" 
                                className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-2 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl">🤖</div>
                                    <div>
                                        <div className="text-xs text-gray-400">Get it on</div>
                                        <div className="text-sm font-semibold text-white">Google Play</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span>© {currentYear} InfraTrack.</span>
                            <span className="hidden md:inline">All rights reserved.</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                Made with <span className="text-red-500 animate-pulse">❤️</span> for Better Cities
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link to="/privacy" className="hover:text-white transition-colors duration-300">
                                Privacy
                            </Link>
                            <span>•</span>
                            <Link to="/terms" className="hover:text-white transition-colors duration-300">
                                Terms
                            </Link>
                            <span>•</span>
                            <Link to="/sitemap" className="hover:text-white transition-colors duration-300">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {/* <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
                aria-label="Back to top"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 10l7-7m0 0l7 7m-7-7v18" 
                    />
                </svg>
            </button> */}

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                .animate-pulse {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;