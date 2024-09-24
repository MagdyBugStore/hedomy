import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Search from "../ecommerce/Search";
import Menu from '../elements/menu'
import { storage } from '../../util/localStorage';


const Header = ({
    totalCartItems,
    totalCompareItems,
    toggleClick,
    totalWishlistItems,
}) => {
    const [isToggled, setToggled] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [type, setType] = useState("");

    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY >= 100;
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        });
        setType(storage.get('type'))
    },[]);

    const handleItemClick = (value) => {
        storage.set('type', value)
    };
    const items = [
        { label: 'رجالي', value: 'men', href: "/men" },
        { label: 'حريمي', value: 'women', href: "/women" },
        { label: 'اطفال', value: 'kids', href: "/kids" },
    ];

    const dir = "rtl"


    return (
        <>
            <header className="header-area header-style-1 header-height-2" dir={dir}>
                {/* <div className="mobile-promotion">
                    <span>
                        Grand opening, <strong>up to 15%</strong> off all items. Only <strong>3 days</strong> left
                    </span>
                </div> */}
                <div className="header-top header-top-ptb-1">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-4">
                                <div className="header-info">
                                    <ul>
                                        {items.map((item) => (
                                            <li key={item.value}>
                                                <Link href={item.href}>
                                                    {/* Use the new `onClick` prop directly inside `Link` */}
                                                    <a
                                                        className={type === item.value ? 'selected' : ''}
                                                        onClick={() => handleItemClick(item.value)}
                                                    >
                                                        {item.label}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-4 hidden">
                                <div className="text-center">
                                    <div id="news-flash" className="d-inline-block">
                                        <ul>
                                            <li>
                                                Get great devices up to 50% off
                                                <Link href="/shop-grid-right">
                                                    <a> View details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="header-wrap">
                            <div className="logo logo-width-1">
                                <Link href="/">
                                    <a>
                                        <img src="/assets/imgs/theme/logo.jpg" alt="logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-right">
                                <div className="search-style-2">
                                    <Search />
                                </div>
                                <div className="header-action-right">
                                    <div className="header-action-2">
                                        <div className="header-action-icon-2">
                                            <Link href="/shop-compare">
                                                <a>
                                                    <img className="svgInject" alt="Evara" src="/assets/imgs/theme/icons/icon-compare.svg" />
                                                    <span className="pro-count blue">{totalCompareItems}</span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-compare">
                                                <a>
                                                    <span className="lable ml-0">مقارنة</span>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <Link href="/shop-wishlist">
                                                <a>
                                                    <img className="svgInject" alt="Evara" src="/assets/imgs/theme/icons/icon-heart.svg" />
                                                    <span className="pro-count blue">{totalWishlistItems}</span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-wishlist">
                                                <span className="lable">قائمه الرغبات</span>
                                            </Link>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <Link href="/shop-cart">
                                                <a className="mini-cart-icon">
                                                    <img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg" />
                                                    <span className="pro-count blue">{totalCartItems}</span>
                                                </a>
                                            </Link>
                                            <Link href="/shop-cart">
                                                <a>
                                                    <span className="lable">عربة التسوق</span>
                                                </a>
                                            </Link>
                                        </div>

                                        <div className="header-action-icon-2">
                                            <Link href="/soon">
                                                <a>
                                                    <img className="svgInject" alt="Hedomy" src="/assets/imgs/theme/icons/icon-user.svg" />
                                                </a>
                                            </Link>
                                            <Link href="/soon">
                                                <a>
                                                    <span className="lable ml-0">الحساب</span>
                                                </a>
                                            </Link>
                                            <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                                <ul>
                                                    <li>
                                                        <Link href="/soon">
                                                            <a>
                                                                <i className="fi fi-rs-user ml-10"></i>
                                                                حسابي
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/soon">
                                                            <a>
                                                                <i className="fi fi-rs-location-alt ml-10"></i>
                                                                تتبع الطلب
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href="">
                                                            <a>
                                                                <i className="fi fi-rs-label ml-10"></i>
                                                                My Voucher
                                                            </a>
                                                        </Link>
                                                    </li> */}
                                                    <li>
                                                        <Link href="/shop-wishlist">
                                                            <a>
                                                                <i className="fi fi-rs-heart ml-10"></i>
                                                                قائمه الرغبات
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/soon">
                                                            <a>
                                                                <i className="fi fi-rs-settings-sliders ml-10"></i>
                                                                الاعدادات
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href="/">
                                                            <a>
                                                                <i className="fi fi-rs-sign-out ml-10"></i>
                                                                تسجيل الخروج
                                                            </a>
                                                        </Link>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={scroll ? "header-bottom header-bottom-bg-color sticky-bar stick" : "header-bottom header-bottom-bg-color sticky-bar"}>
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative">
                            <div className="logo logo-width-1 d-block d-lg-none">
                                <Link href="/">
                                    <a>
                                        <img src="/assets/imgs/theme/logo.jpg" alt="logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="header-nav d-none d-lg-flex">
                                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                                    <nav>
                                        <Menu />
                                    </nav>
                                </div>
                            </div>
                            <div className="hotline d-none d-lg-flex">
                                <img src="/assets/imgs/theme/icons/icon-headphone.svg" alt="hotline" />
                                <p>
                                    010xxxxxxxx<span> خدمة العملاء</span>
                                </p>
                            </div>
                            <div className="header-action-icon-2 d-block d-lg-none">
                                <div className="burger-icon burger-icon-white" onClick={toggleClick}>
                                    <span className="burger-icon-top"></span>
                                    <span className="burger-icon-mid"></span>
                                    <span className="burger-icon-bottom"></span>
                                </div>
                            </div>
                            <div className="header-action-right d-block d-lg-none">
                                <div className="header-action-2">
                                    <div className="header-action-icon-2">
                                        <Link href="/shop-wishlist">
                                            <a>
                                                <img alt="Evara" src="/assets/imgs/theme/icons/icon-heart.svg" />
                                                <span className="pro-count white">{totalWishlistItems}</span>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="header-action-icon-2">
                                        <Link href="/shop-cart">
                                            <a className="mini-cart-icon">
                                                <img alt="Evara" src="/assets/imgs/theme/icons/icon-cart.svg" />
                                                <span className="pro-count white">{totalCartItems}</span>
                                            </a>
                                        </Link>
                                        {/* <div className="cart-dropdown-wrap cart-dropdown-hm2">
                                            <ul>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                <img alt="Evara" src="/assets/imgs/shop/thumbnail-3.jpg" />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/shop-grid-right">
                                                                <a>Plain Striola Shirts</a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $800.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="shopping-cart-img">
                                                        <Link href="/shop-grid-right">
                                                            <a>
                                                                <img alt="Evara" src="/assets/imgs/shop/thumbnail-4.jpg" />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="shopping-cart-title">
                                                        <h4>
                                                            <Link href="/shop-grid-right">
                                                                <a>Macbook Pro 2022</a>
                                                            </Link>
                                                        </h4>
                                                        <h3>
                                                            <span>1 × </span>
                                                            $3500.00
                                                        </h3>
                                                    </div>
                                                    <div className="shopping-cart-delete">
                                                        <Link href="/#">
                                                            <a>
                                                                <i className="fi-rs-cross-small"></i>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="shopping-cart-footer">
                                                <div className="shopping-cart-total">
                                                    <h4>
                                                        Total
                                                        <span>$383.00</span>
                                                    </h4>
                                                </div>
                                                <div className="shopping-cart-button">
                                                    <Link href="/shop-cart">
                                                        <a>View cart</a>
                                                    </Link>
                                                    <Link href="/shop-checkout">
                                                        <a>Checkout</a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

const mapStateToProps = (state) => ({
    totalCartItems: state.cart.length,
    totalCompareItems: state.compare.items.length,
    totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);
