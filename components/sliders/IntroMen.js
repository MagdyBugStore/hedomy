import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import men from '../../public/static/men/slider.json';
import women from '../../public/static/women/slider.json';
import kids from '../../public/static/kids/slider.json';
import { storage } from '../../util/localStorage';
import { useEffect, useState } from "react";

SwiperCore.use([Navigation, Pagination, EffectFade]);

const Intro2 = () => {
    const [slideData, setSlideData] = useState([]);

    useEffect(() => {
        const storageType = storage.get('type');
        if (!storageType) {
            storage.set('type', 'men');
        }
        let data;
        switch (storageType || 'men') {
            case 'men':
                data = men;
                break;
            case 'women':
                data = women;
                break;
            case 'kids':
                data = kids;
                break;
            case '4':
                data = [];  // Handle the case for type 4 with appropriate data if available
                break;
            default:
                data = [];  // Handle other cases if needed
                break;
        }
        setSlideData(data);
    }, []);


    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                effect={"fade"}
                fadeEffect={{
                    crossFade: true,
                }}

                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: ".custom_prev_i1",
                    nextEl: ".custom_next_i1",
                }}
                className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="single-hero-slider single-animation-wrap"
                            style={{
                                backgroundImage: `url(${slide.backgroundImage})`,
                            }}
                        >
                            <div className="slider-content">
                                <h1 className="display-2 mb-40">
                                    {slide.title}
                                    <br />
                                    {slide.subtitle}
                                </h1>
                                <p className="mb-65">{slide.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="slider-arrow hero-slider-1-arrow">
                <span className="slider-btn slider-prev slick-arrow custom_prev_i1">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_i1">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
        </>
    );
};

export default Intro2;
