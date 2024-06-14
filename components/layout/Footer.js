import React from "react";
import Link from "next/link"

const Footer = () => {
    const bannerData = [
        {
            icon: "/assets/imgs/theme/icons/icon-1.svg",
            title: "أفضل الأسعار والعروض",
            description: "اسعار واقعيه وتنافسيه",
            delay: "0s",
        },
        {
            icon: "/assets/imgs/theme/icons/icon-2.svg",
            title: "توصيل مجاني",
            description: "الطلبات بقيمة 2000 جنيه أو أكثر",
            delay: ".1s",
        },
        {
            icon: "/assets/imgs/theme/icons/icon-3.svg",
            title: "صفقات يومية رائعة",
            description: "ابدا تجارتك وانت في بيتك",
            delay: ".2s",
        },
        {
            icon: "/assets/imgs/theme/icons/icon-4.svg",
            title: "تشكيلة واسعة",
            description: "جميع منتجات الملابس",
            delay: ".3s",
        },
        {
            icon: "/assets/imgs/theme/icons/icon-5.svg",
            title: "توصيل آمن",
            description: "خلال 3 ايام",
            delay: ".4s",
        },
        // Uncomment and add additional banners if needed
        // {
        //     icon: "/assets/imgs/theme/icons/icon-6.svg",
        //     title: "توصيل آمن",
        //     description: "خلال 30 يومًا",
        //     delay: ".5s",
        // }
    ];
    return (
        <>
            <footer className="main" dir="rtl">
                <section className="featured section-padding">
                    <div className="container">
                        <div className="row">
                            {bannerData.map((banner, index) => (
                                <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0" key={index}>
                                    <div className={`banner-left-icon d-flex align-items-center wow animate__animated animate__fadeInUp`} data-wow-delay={banner.delay}>
                                        <div className="banner-icon">
                                            <img src={banner.icon} alt="category logo" />
                                        </div>
                                        <div className="banner-text">
                                            <h3 className="icon-box-title">{banner.title}</h3>
                                            <p>{banner.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-padding footer-mid">
                    <div className="container pt-15 pb-20">
                        <div className="row">
                            <div className="col">
                                <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0 wow animate__animated animate__fadeInUp" data-wow-delay="0">
                                    <div className="logo mb-30">
                                        <Link href="/"><a className="mb-15">
                                            <img src="/assets/imgs/theme/logo.jpg" alt="شعار" />
                                        </a>
                                        </Link>
                                        <p className="font-lg text-heading">
                                            في هدومي هتلاقي اللي بتدور عليه عندنا
                                        </p>
                                    </div>
                                    <ul className="contact-infor">
                                        <li>
                                            <img src="/assets/imgs/theme/icons/icon-location.svg" alt="" />
                                            <strong>العنوان:</strong> <span>XXXXXXXXXXXX</span>
                                        </li>
                                        <li>
                                            <img src="/assets/imgs/theme/icons/icon-contact.svg" alt="" />
                                            <strong>اتصل بنا:</strong> <span>XXXXXXXXXXXX</span>
                                        </li>
                                        <li>
                                            <img src="/assets/imgs/theme/icons/icon-email-2.svg" alt="" />
                                            <strong>البريد الإلكتروني:</strong> <span>XXXXXXXXXXXX</span>
                                        </li>
                                        <li>
                                            <img src="/assets/imgs/theme/icons/icon-clock.svg" alt="" />
                                            <strong>ساعات العمل:</strong> <span>XXXXXXXXXXXX</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-link-widget col wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                <h4 className="widget-title">الشركة</h4>
                                <ul className="footer-list mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">معلومات عنا</a>
                                    </li>
                                    <li>
                                        <a href="#">معلومات التوصيل</a>
                                    </li>
                                    <li>
                                        <a href="#">سياسة الخصوصية</a>
                                    </li>
                                    <li>
                                        <a href="#">الشروط والأحكام</a>
                                    </li>
                                    <li>
                                        <a href="#">اتصل بنا</a>
                                    </li>
                                    <li>
                                        <a href="/vendors">قائمة البائعين</a>
                                    </li>
                                    {/* <li>
                                        <a href="#">مركز الدعم</a>
                                    </li>
                                    <li>
                                        <a href="#">فرص العمل</a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="footer-link-widget col wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                                <h4 className="widget-title">الحساب</h4>
                                <ul className="footer-list mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="/soon">تسجيل الدخول</a>
                                    </li>
                                    <li>
                                        <a href="shop-cart">عرض السلة</a>
                                    </li>
                                    <li>
                                        <a href="shop-wishlist">قائمة أماني</a>
                                    </li>
                                    <li>
                                        <a href="/soon">تتبع طلبي</a>
                                    </li>
                                    {/* <li>
                                        <a href="/soon">تذكرتي للمساعدة</a>
                                    </li>
                                    <li>
                                        <a href="#">تفاصيل الشحن</a>
                                    </li> */}
                                    <li>
                                        <a href="/shop-compare">مقارنة المنتجات</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-link-widget col wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                                <h4 className="widget-title">تاجر معنا</h4>
                                <ul className="footer-list mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="/soon">ابدا النجارة</a>
                                    </li>
                                    <li>
                                        <a href="/soon">شرح الانشطه التجارة</a>
                                    </li>
                                    {/* <li>
                                        <a href="#">عمل المزارعين</a>
                                    </li>
                                    <li>
                                        <a href="#">وظائف في المزارع</a>
                                    </li>
                                    <li>
                                        <a href="#">موردينا</a>
                                    </li>
                                    <li>
                                        <a href="#">إمكانية الوصول</a>
                                    </li>
                                    <li>
                                        <a href="#">العروض الترويجية</a>
                                    </li> */}
                                </ul>
                            </div>
                            {/* <div className="footer-link-widget col wow animate__animated animate__fadeInUp" data-wow-delay=".4s">
                                <h4 className="widget-title">المنتجات الشهيرة</h4>
                                <ul className="footer-list mb-sm-5 mb-md-0">
                                    <li>
                                        <a href="#">الحليب والحليب المعلب</a>
                                    </li>
                                    <li>
                                        <a href="#">الزبدة والسمن</a>
                                    </li>
                                    <li>
                                        <a href="#">بدائل البيض</a>
                                    </li>
                                    <li>
                                        <a href="#">المربى</a>
                                    </li>
                                    <li>
                                        <a href="#">الكريمة الحامضة والديبس</a>
                                    </li>
                                    <li>
                                        <a href="#">الشاي والكومبوتشا</a>
                                    </li>
                                    <li>
                                        <a href="#">الجبن</a>
                                    </li>
                                </ul>
                            </div> */}

                        </div>

                    </div>
                </section>
                <div className="container pb-30 wow animate__animated animate__fadeInUp" data-wow-delay="0">
                    <div className="row align-items-center">
                        <div className="col-12 mb-30">
                            <div className="footer-bottom"></div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                            <p className="font-sm mb-0">
                                &copy; 2023، <strong className="text-brand">hedomy</strong> - للتجارة الإلكترونية <br />
                                جميع الحقوق محفوظة
                            </p>
                        </div>
                        <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
                            <div className="hotline d-lg-inline-flex mr-30">
                                <img src="/assets/imgs/theme/icons/phone-call.svg" alt="الخط الساخن" />
                                <p>
                                    010xxxxxxxx <span>من 8:00ص حتى 10:00م</span>
                                </p>
                            </div>

                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
                            <div className="mobile-social-icon">
                                <h6>تابعنا</h6>
                                <a href="#">
                                    <img src="/assets/imgs/theme/icons/icon-facebook-white.svg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="/assets/imgs/theme/icons/icon-twitter-white.svg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="/assets/imgs/theme/icons/icon-instagram-white.svg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="/assets/imgs/theme/icons/icon-pinterest-white.svg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="/assets/imgs/theme/icons/icon-youtube-white.svg" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
};

export default Footer;
