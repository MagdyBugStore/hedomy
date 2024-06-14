import { useEffect, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchByCatagory } from "../../redux/action/product";
import SingleProduct from "./../ecommerce/SingleProduct";
import { useMyProducts } from "../../redux/stores/apis";

SwiperCore.use([Navigation]);

const RelatedSlider = () => {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // With Category
        const {products} = await useMyProducts({ limit: 12 });
        setRelated(products);
    };
    if (related.length == 0)
        return (
            <>
                <div>
                    loading....
                </div>
            </>
        )
        return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                    576: {
                        slidesPerView: 2, 
                    },
                    768: {
                        slidesPerView: 3, 
                    },
                    992: {
                        slidesPerView: 4, 
                    },
                    1200: {
                        slidesPerView: 5, 
                    },
                    
                    
                }}
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
                className="custom-class"
            >

                {related.map((product, i) => (

                    <SwiperSlide key={i}>
                        <SingleProduct product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_n">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>

        </>
    );
};

export default RelatedSlider;
