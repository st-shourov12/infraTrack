import React from 'react';
import { Link } from 'react-router';

// Swiper core & required modules
import { Autoplay, Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Images
import bannerImg1 from '../../assets/bg-infra1.jpg';
import bannerImg2 from '../../assets/bg-infra2.jpg';
import bannerImg3 from '../../assets/bg-ifra3.jpg';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';


const Hero = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allIssues = [] } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
        const res = await axiosSecure.get(`/issues`);
        return Array.isArray(res.data) ? res.data : res.data.issues || [];
        },
    });
    const { user} = useAuth();

    const { data: users = [] } = useQuery({
    queryKey: ['users', user?.email],
    enabled: !!user?.accessToken, 
    queryFn: async () => {
        const res = await axiosSecure.get('/users');
        return res.data;
    }
    });
    const { data: staffs = [] } = useQuery({
    queryKey: ['users', user?.email],
    enabled: !!user?.accessToken, 
    queryFn: async () => {
        const res = await axiosSecure.get('/staffs');
        return res.data;
    }
    });


    



  const closedIssue = allIssues?.filter(p => p.status === 'closed');
  const parse = Math.ceil(Number(closedIssue?.length) / Number(allIssues.length) * 100)




    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, A11y, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true 
                }}
                className="w-full h-150 "
            >
              
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            
                            <img
                                src={bannerImg1}
                                alt='Report Issues'
                                className="w-full h-full object-cover"
                            />
                            
                            
                            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"></div>

                         
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                                    <div className="max-w-3xl text-white">
                                        
                       
                                        <div 
                                            className="inline-block mb-4 px-4 py-2 bg-blue-600/90 rounded-full text-sm font-semibold backdrop-blur-sm animate-fade-in"
                                            style={{ animationDelay: '0.2s' }}
                                        >
                                            🏙️ Report Issues
                                        </div>

                    
                                        <h1 
                                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in"
                                            style={{ animationDelay: '0.4s' }}
                                        >
                                            Building Better Cities Together
                                        </h1>

                                
                                        <p 
                                            className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in"
                                            style={{ animationDelay: '0.6s' }}
                                        >
                                            Your voice matters. Report civic issues in your community and track their resolution in real-time.
                                        </p>

                                        <div 
                                            className="grid grid-cols-3 gap-4 mb-8 animate-fade-in"
                                            style={{ animationDelay: '0.8s' }}
                                        >
                                            
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        {allIssues?.length}
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Issues Reported
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        {closedIssue?.length}
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Issues Resolved
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        24Hrs
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Avg Response Time
                                                    </div>
                                                </div>
                                            
                                        </div>

  
                                        <div 
                                            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
                                            style={{ animationDelay: '1s' }}
                                        >
                                            <Link
                                                to={'/dashboard/report'}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            >
                                                Report Issue Now
                                                <svg 
                                                    className="w-5 h-5 ml-2" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                                                    />
                                                </svg>
                                            </Link>

                                            {/* <Link
                                                to={slide.secondaryBtn.link}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border-2 border-white/50 backdrop-blur-sm hover:border-white transition-all duration-300"
                                            >
                                                {slide.secondaryBtn.text}
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            
                            <img
                                src={bannerImg2}
                                alt='Track Progress'
                                className="w-full h-full object-cover"
                            />
                            
                            
                            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"></div>

                         
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                                    <div className="max-w-3xl text-white">
                                        
                       
                                        <div 
                                            className="inline-block mb-4 px-4 py-2 bg-blue-600/90 rounded-full text-sm font-semibold backdrop-blur-sm animate-fade-in"
                                            style={{ animationDelay: '0.2s' }}
                                        >
                                            📊 Track Progress
                                        </div>

                   

                    
                                        <h1 
                                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in"
                                            style={{ animationDelay: '0.4s' }}
                                        >
                                            Real-Time Infrastructure Monitoring
                                        </h1>

                                
                                        <p 
                                            className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in"
                                            style={{ animationDelay: '0.6s' }}
                                        >
                                            Stay updated with live tracking, instant notifications, and transparent resolution updates from your local government.
                                        </p>

                                        <div 
                                            className="grid grid-cols-3 gap-4 mb-8 animate-fade-in"
                                            style={{ animationDelay: '0.8s' }}
                                        >
                                            
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        {users?.length}
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Active Citizens
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                         {parse} %
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                       Success Rate
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        48Hrs
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Resolution Time
                                                    </div>
                                                </div>
                                            
                                        </div>

  
                                        <div 
                                            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
                                            style={{ animationDelay: '1s' }}
                                        >
                                            <Link
                                                to={'/dashboard'}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            >
                                               Track My Issues
                                                <svg 
                                                    className="w-5 h-5 ml-2" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                                                    />
                                                </svg>
                                            </Link>

                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            
                            <img
                                src={bannerImg3}
                                alt='Join Community'
                                className="w-full h-full object-cover"
                            />
                            
                            
                            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent"></div>

                         
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                                    <div className="max-w-3xl text-white">
                                        
                       
                                        <div 
                                            className="inline-block mb-4 px-4 py-2 bg-blue-600/90 rounded-full text-sm font-semibold backdrop-blur-sm animate-fade-in"
                                            style={{ animationDelay: '0.2s' }}
                                        >
                                            🚀 Join Community
                                        </div>

                   

                    
                                        <h1 
                                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in"
                                            style={{ animationDelay: '0.4s' }}
                                        >
                                            Empower Your Neighborhood
                                        </h1>

                                
                                        <p 
                                            className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in"
                                            style={{ animationDelay: '0.6s' }}
                                        >
                                            Vote on priority issues, collaborate with neighbors, and witness the transformation of your city through collective action.
                                        </p>

                                        <div 
                                            className="grid grid-cols-3 gap-4 mb-8 animate-fade-in"
                                            style={{ animationDelay: '0.8s' }}
                                        >
                                            
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        Responsible
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Communities
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        {staffs?.length}
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Total Staff
                                                    </div>
                                                </div>
                                                <div 
                                                   
                                                    className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                                >
                                                    <div className="text-2xl md:text-3xl font-bold text-orange-400">
                                                        48Hrs
                                                        
                                                    </div>
                                                    <div className="text-sm text-gray-300 mt-1">
                                                        Transparency
                                                    </div>
                                                </div>
                                            
                                        </div>

  
                                        <div 
                                            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
                                            style={{ animationDelay: '1s' }}
                                        >
                                            <Link
                                                to={'/signUp'}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            >
                                               Get Started Free
                                                <svg 
                                                    className="w-5 h-5 ml-2" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                                                    />
                                                </svg>
                                            </Link>

                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
            </Swiper>

         
           
        </div>
    );
};

export default Hero;



// <style jsx>{`
//                 @keyframes fade-in {
//                     from {
//                         opacity: 0;
//                         transform: translateY(20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 .animate-fade-in {
//                     animation: fade-in 0.8s ease-out forwards;
//                     opacity: 0;
//                 }

                
//                 :global(.swiper-button-next),
//                 :global(.swiper-button-prev) {
//                     color: white;
//                     background: rgba(255, 255, 255, 0.1);
//                     backdrop-filter: blur(10px);
//                     width: 50px;
//                     height: 50px;
//                     border-radius: 50%;
//                     border: 2px solid rgba(255, 255, 255, 0.3);
//                 }

//                 :global(.swiper-button-next:hover),
//                 :global(.swiper-button-prev:hover) {
//                     background: rgba(37, 99, 235, 0.8);
//                     border-color: rgba(37, 99, 235, 1);
//                 }

//                 :global(.swiper-button-next::after),
//                 :global(.swiper-button-prev::after) {
//                     font-size: 20px;
//                     font-weight: bold;
//                 }

               
//                 :global(.swiper-pagination-bullet) {
//                     width: 12px;
//                     height: 12px;
//                     background: white;
//                     opacity: 0.5;
//                 }

//                 :global(.swiper-pagination-bullet-active) {
//                     opacity: 1;
//                     background: #2563EB;
//                     width: 32px;
//                     border-radius: 6px;
//                 }
//             `}</style> 
