import React from 'react';
import { Autoplay, Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import bannerImg1 from '../../assets/hq720.jpg';
import bannerImg2 from '../../assets/s.jpg';
import bannerImg3 from '../../assets/1.jpg';


const BeforeAfter = () => {
    return (
        <div>


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
                className="w-full h-100 "
            >

                <SwiperSlide>

                    {/* potholes  service */}

                    <div className="relative w-full h-100">

                        <img
                            src={bannerImg1}
                            alt='Report Issues'
                            className="w-full h-full object-cover"
                        />


                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div>

                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    Our Services
                                </h2>
                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    To Make a better World
                                </h2>
                            </div>


                        </div>

                    </div>









                </SwiperSlide>
                <SwiperSlide>

                    {/* broken bench */}

                    <div className="relative w-full h-100">

                        <img
                            src={bannerImg2}
                            alt='Report Issues'
                            className="w-full h-full object-cover"
                        />


                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div>

                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    Our Services
                                </h2>
                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    To Make a better World
                                </h2>
                            </div>


                        </div>

                    </div>









                </SwiperSlide>
                <SwiperSlide>

                    {/* traffic service */}

                    <div className="relative w-full h-100">

                        <img
                            src={bannerImg3}
                            alt='Report Issues'
                            className="w-full h-full object-cover"
                        />


                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div>

                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    Our Services
                                </h2>
                                <h2 className="text-xl text-white font-bold flex justify-center items-center">
                                    To Make a better World
                                </h2>
                            </div>


                        </div>

                    </div>









                </SwiperSlide>






            </Swiper>

        </div>
    );
};

export default BeforeAfter;