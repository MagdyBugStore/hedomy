import React, { useEffect, useState } from "react";
import Link from "next/link";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { server } from "../../config/index";

import menMenuData from '../../public/static/men/categories.json'
import womenMenuData from '../../public/static/women/categories.json'
import kidsMenuData from '../../public/static/kids/categories.json'
import {storage} from '../../util/localStorage';


SwiperCore.use([Navigation, Autoplay]);

const CategorySlider2 = () => {

    var MenuData = menMenuData;

    var gender = storage.get('type')
    if (gender == 'women') {
        MenuData = womenMenuData
    }
    else if (gender == 'kids') {
        MenuData = kidsMenuData
    }

    return (
        MenuData &&
        <>
            <div className="section-title" dir="rtl">
                <div className="title">
                    <h3>التسوق حسب الفئات</h3>
                    <Link href="/shop-grid-right">
                        <a className="show-all">
                            كل الفئات
                            <i className="fi-rs-angle-left"></i>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="carausel-8-columns-cover position-relative">
                <div
                    className="carausel-8-columns"
                    id="carausel-8-columns"
                >

                    <Swiper
                        spaceBetween={0}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
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
                            1400: {
                                slidesPerView: 6, 
                            },
                            1600: {
                                slidesPerView: 7, 
                            },
                            1800: {
                                slidesPerView: 8, 
                            },
                        }}
                        navigation={{
                            prevEl: ".custom_prev_ct1",
                            nextEl: ".custom_next_ct1",
                        }}
                        className="custom-class"
                    >
                        {
                            MenuData.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="card-1">
                                        <figure className=" img-hover-scale overflow-hidden">
                                            <Link href="/shop-grid-right">
                                                <a>
                                                    <img
                                                        src={`assets/imgs/theme/icons/${item.img}`}
                                                        alt=""
                                                    />
                                                </a>
                                            </Link>
                                        </figure>
                                        <h6>
                                            <Link href="/shop-grid-right">
                                                <a>{item.title}</a>
                                            </Link>
                                        </h6>
                                        <span>26 items</span>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    <div
                        className="slider-arrow slider-arrow-2 carausel-10-columns-arrow"
                        id="carausel-10-columns-arrows"
                    >
                        <span className="slider-btn slider-prev slick-arrow custom_prev_ct1">
                            <i className="fi-rs-arrow-small-left"></i>
                        </span>
                        <span className="slider-btn slider-next slick-arrow custom_next_ct1">
                            <i className="fi-rs-arrow-small-right"></i>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategorySlider2;
