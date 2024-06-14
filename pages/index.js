import CategoryTab from "../components/ecommerce/categoryTab";
// import FeatchDeals from "../components/ecommerce/fetchDeals";
import Layout from "../components/layout/Layout";
import CategoryProduct from "../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../components/ecommerce/Filter/PriceRangeSlider";
import SizeFilter from "../components/ecommerce/Filter/SizeFilter";
import VendorFilter from "../components/ecommerce/Filter/VendorFilter";
// import Banner5 from "../components/elements/Banner5";
// import Bottom from "../components/elements/Bottom";
// import IntroPopup from "../components/elements/IntroPopup";
import CategorySlider2 from '../components/sliders/Category2';
import Intro from "../components/sliders/IntroMen";
// import Intro2 from "../components/sliders/Intro2";
// import Link from "next/link"
import React from "react";
import Side from "../components/ecommerce/right_side";

function Home() {
    
    return (
        <Layout noBreadcrumb="d-none" headerStyle="header-style-1" dir="rtl">
            <div className="container mb-30">
                <div className="row flex-row-reverse">
                    <div className="col-lg-1-5 primary-sidebar sticky-sidebar pt-30" dir="rtl">
                        <div className="sidebar-widget widget-category-2 mb-30">
                            <h5 className="section-title style-1 mb-30">
                                الفئة
                            </h5>
                            <CategoryProduct />
                        </div>

                        <div className="sidebar-widget price_range range mb-30">
                            <h5 className="section-title style-1 mb-30">ملء حسب السعر</h5>
                            <div className="bt-1 border-color-1"></div>

                            <div className="price-filter">
                                <div className="price-filter-inner">
                                    <br />
                                          <PriceRangeSlider />
                                    <br />
                                </div>
                            </div>

                            <div className="list-group">
                                <div className="list-group-item mb-10 mt-10">
                                    <label className="fw-900">اللون</label>
                                    <VendorFilter />
                                    <label className="fw-900 mt-15">
                                        الحجم
                                    </label>
                                    <SizeFilter />
                                </div>
                            </div>
                            <br />
                        </div>
                        <Side />

                        <div className="hidden">

                            <div className="banner-img wow fadeIn mb-lg-0 animated d-lg-block d-none">
                                <img
                                    src="/assets/imgs/banner/men/Men_poster.png"
                                    alt=""
                                />
                                <div className="banner-text">
                                    <span>عضوي</span>
                                    <h4>
                                        احفظ 17% <br />
                                        على <span className="text-brand">عضوي</span>
                                        <br />
                                        عصير
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4-5">
                        <section className="home-slider position-relative mb-30">
                            <div className="home-slide-cover mt-30">
                                <Intro />
                            </div>
                        </section>

                        <section className="product-tabs section-padding position-relative">
                            <CategoryTab gender={1} />
                        </section>
                    </div>
                </div>
            </div>

            <section className="popular-categories section-padding">
                <div className="container">
                    <CategorySlider2 />
                </div>
            </section>
        </Layout>
        )
}

export default Home;
