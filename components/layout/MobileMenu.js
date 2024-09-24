import { useState } from "react";
import useClickOutside from "../../util/outsideClick";
import NestedMenu from "../elements/NestedMenu";
import headers from '../../public/static/men/header_content.json'


const MobileMenu = ({ isToggled, toggleClick }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: [-1, -1, -1],
    });

    const handleToggle = (key, index) => {
        var newkey = isActive.key;
        if (newkey[index] == key)
            newkey[index] = -1
        else
            newkey[index] = key

        setIsActive({
            status: true,
            key: newkey
        });
    };

    let domNode = useClickOutside(() => {
        setIsActive({
            status: false,
            key: isActive.key
        });
    });
    const dir = "rtl"
    const drop_dir = " left-0"
    return (
        <>
            <div
                className={
                    isToggled
                        ? "mobile-header-active mobile-header-wrapper-style sidebar-visible"
                        : "mobile-header-active mobile-header-wrapper-style"
                }
            >
                <div className="mobile-header-wrapper-inner bg-CS_bg_color" dir={dir}>
                    <div className="mobile-header-top bg-CS_bg_color">
                        <div className="mobile-header-logo">
                            <a href="#">
                                <img
                                    src={
                                        "/assets/imgs/theme/logo.jpg"
                                    }
                                    alt="logo"
                                />
                            </a>
                        </div>
                        <div className="mobile-header-top bg-CS_bg_color">
                            <div className="mobile-menu-close close-style-wrap close-style-position-inherit">
                                <button
                                    className="close-style search-close"
                                    onClick={toggleClick}
                                >
                                    <i className="icon-top"></i>
                                    <i className="icon-bottom"></i>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="mobile-header-content-area">

                        <div className="mobile-menu-wrap mobile-header-border">

                            <nav>
                                <ul className="mobile-menu" ref={domNode}>
                                    <li
                                        className={
                                            isActive.key === 1
                                                ? "text-CS_text_color"
                                                : ""
                                                + " menu-item-has-children border-CS_Soft_border_color"
                                        }
                                    >
                                        <a href="#">الرئيسية</a>
                                    </li>
                                    {
                                        isActive.key &&
                                        headers.map((header, index) => (
                                            <li key={index}
                                                className={
                                                    isActive.key[0] == index
                                                        ? "menu-item-has-children active"
                                                        : "menu-item-has-children"
                                                }
                                            >
                                                <span
                                                    className={`menu-expand ${drop_dir}`}
                                                    onClick={() => handleToggle(index, 0)}
                                                >
                                                    <i className="fi-rs-angle-small-down"></i>
                                                </span>
                                                <a href="#">{header.category}</a>
                                                <ul
                                                    className={
                                                        isActive.key[0] == index ? "dropdown" : "dropdown-close"
                                                    }
                                                >
                                                    <ul>
                                                        {header.subcategories.map((item, index) => (
                                                            <li
                                                                key={index}
                                                                className={
                                                                    isActive.key[1] == index ? "menu-item-has-children active" : "menu-item-has-children"
                                                                }
                                                            >
                                                                <span className={`menu-expand ${drop_dir}`} onClick={() => handleToggle(index, 1)}>
                                                                    <i className="fi-rs-angle-small-down"></i>
                                                                </span>
                                                                <a href="#">{item.title}</a>
                                                                <ul className={isActive.key[1] == index ? "dropdown" : "dropdown-close"}>
                                                                    {item.items.map((value, valueIndex) => (
                                                                        <li key={valueIndex}>
                                                                            <a href="#">{value}</a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </ul>
                                            </li>
                                        ))}


                                    <li
                                        className={
                                            isActive.key === 1
                                                ? "menu-item-has-children active"
                                                : "menu-item-has-children"
                                        }
                                    >
                                        <a href="/about">من نحن</a>
                                    </li>

                                    <li
                                        className={
                                            isActive.key === 1
                                                ? "menu-item-has-children active"
                                                : "menu-item-has-children"
                                        }
                                    >
                                        <a href="/contact">اتصل بنا</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="my-3 p-4 border-l border-r border-b border-t border-solid rounded-md border-CS_Soft_border_color">
                            <div className="pb-3">
                                <a href="tel:+971563272736">010xxxxxxxx</a>
                            </div>
                            <div>
                                <a href="tel:+971505108831">010xxxxxxxx</a>
                            </div>
                        </div>

                        <div className="mobile-social-icon">
                            <h6 className="pb-2">تابعنا</h6>
                            <a href="https://www.facebook.com/Kambooshacar?mibextid=2JQ9o">
                                <img
                                    src="/assets/imgs/theme/icons/icon-facebook-white.svg"
                                    alt=""
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="/assets/imgs/theme/icons/icon-twitter-white.svg"
                                    alt=""
                                />
                            </a>
                            <a href="https://instagram.com/Kambooshacar?igshid=MzRlODBiNWFlZA==">
                                <img
                                    src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                    alt=""
                                />
                            </a>
                        </div>

                        <div className="py-6" dir="ltr">
                            {/* <DLtoggle ckey={3} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default MobileMenu;


const NestedMenuPage = () => {
    const menuData = [
        {
            label: 'Item 1',
            subMenu: [
                {
                    label: 'Sub Item 1.1',
                },
                {
                    label: 'Sub Item 1.2',
                },
            ],
        },
        {
            label: 'Item 2',
            subMenu: [
                {
                    label: 'Sub Item 2.1',
                    subMenu: [
                        {
                            label: 'Sub Sub Item 2.1.1',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div>
            <h1>My Nested Menu</h1>
            <NestedMenu menuData={menuData} />
        </div>
    );
};