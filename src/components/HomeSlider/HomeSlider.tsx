import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Image from 'next/image';

const HomeSlider = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [banners, setBanners] = useState([
        {
            imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1713283604225_rer.jpg' //'https://s3proxygw.cineplexx.at/cms-live/asset/_default_upload_bucket/GUXIMI_1206x500.jpg'
        },
        {
            imgUrl: 'https://assets-in.bmscdn.com/promotions/cms/creatives/1706382336630_web.jpg' //https://s3proxygw.cineplexx.at/cms-live/asset/_default_upload_bucket/Tarot-1206x500-cpxx-kos.jpg
        }
    ]);

    useEffect(() => {
        // This ensures window dimensions are only accessed in the client-side environment
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize(); // Set initial size

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <Image src={banner.imgUrl} alt="" width={windowSize.width} height={windowSize.height / 2}
                        style={{ objectFit: "cover" }} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default HomeSlider;
