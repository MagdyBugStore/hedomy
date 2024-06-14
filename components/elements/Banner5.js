import React from "react";
import Link from "next/link"
const Banner5 = () => {
    const banners = [
        {
            imgSrc: "/assets/imgs/banner/banner-1.png",
            text: "كل يوم منعش ونظيف مع منتجاتنا",
        },
        {
            imgSrc: "/assets/imgs/banner/banner-2.png",
            text: "اجعل فطورك صحيًا وسهلاً",
        },
        {
            imgSrc: "/assets/imgs/banner/banner-3.png",
            text: "أفضل المنتجات العضوية",
        },
    ];
    return (
        <>
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`col-lg-4 col-md-6 ${index === 2 ? "d-md-none d-lg-flex" : ""}`}
                >
                    <div
                        className="banner-img wow animate__animated animate__fadeInUp"
                        data-wow-delay={`${index * 0.2}s`}
                    >
                        <img src={banner.imgSrc} alt="" />
                        <div className="banner-text">
                            <h4>{banner.text}</h4>
                            <Link href="/products">
                                <a className="btn btn-xs">
                                    تسوق الآن <i className="fi-rs-arrow-small-right"></i>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </>

    );
};

export default Banner5;
