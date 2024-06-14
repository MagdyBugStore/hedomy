import React, { useState, useEffect } from "react";
import { server } from "../../config/index";

const ProductTab = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [description, setDescription] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [vendorData, setVendor] = useState(null);

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${server}/static/details.json`);
                if (response.ok) {
                    const data = await response.json();
                    setDescription(data.Description);
                    setTableData(data.tableData);
                    setVendor(data.Vendor);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="product-info" dir="rtl">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            توضیحات
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="Additional-info-tab" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            اطلاعات اضافی
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} id="Reviews-tab" data-bs-toggle="tab" onClick={() => handleOnClick(3)}>
                            عن التاجر
                        </a>
                    </li>
                </ul>

                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">

                        {
                            description &&
                            <div className="">
                                {description.paragraphs.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                                <ul className="product-more-infor mt-30">
                                    {description.list.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <hr className="wp-block-separator is-style-dots" />
                                <p>{description.paragraphs1[0]}</p>
                                <h4 className="mt-30">التعبئة والتوصيل</h4>
                                <hr className="wp-block-separator is-style-wide" />
                                {description.paragraphs2.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        }
                    </div>
                    <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="Additional-info">
                        {tableData &&
                            <table className="font-md">
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <th>{item.label}</th>
                                            <td>
                                                <p>{item.value}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>}
                    </div>
                    {
                        vendorData &&
                        <div
                            className={`tab-pane fade ${activeIndex === 3 ? 'show active' : ''}`}
                            id="Vendor"
                        >
                            <div className="vendor-logo d-flex mb-30">
                                <img src={vendorData.vendorLogo} alt="" />
                                <div className="vendor-name ml-15">
                                    <h6>
                                        <a href="vendor-details-2.html">{vendorData.vendorName}</a>
                                    </h6>
                                    <div className="product-rate-cover text-end">
                                        <div className="product-rate d-inline-block">
                                            <div
                                                className="product-rating"
                                                style={{ width: vendorData.ratingWidth }}
                                            ></div>
                                        </div>
                                        <span className="font-small ml-5 text-muted"> ({vendorData.reviewCount} تقييم)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden">

                                <div className="d-flex mb-55">
                                    <div>
                                        <p className="text-brand font-xs">استجابة الدردشة</p>
                                        <h4 className="mb-0">{vendorData.Chat_response}%</h4>
                                    </div>
                                    <div className="mr-30">
                                        <p className="text-brand font-xs">الشحن في الوقت المحدد</p>
                                        <h4 className="mb-0">{vendorData.Ship_on_time}%</h4>
                                    </div>
                                    <div className="mr-30">
                                        <p className="text-brand font-xs">التقييم</p>
                                        <h4 className="mb-0">{vendorData.Rating}</h4>
                                    </div>
                                </div>

                            </div>
                            <p>{vendorData.description}</p>
                        </div>
                    }
                    <div className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                        <div className="comments-area">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h4 className="mb-30">Customer questions & answers</h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-2.png" alt="" />
                                                    <h6>
                                                        <a href="#">Jacky Chan</a>
                                                    </h6>
                                                    <p className="font-xxs">Since 2012</p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Thank you very fast shipping from Poland only 3days.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            <a href="#" className="text-brand btn-reply">
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-3.png" alt="" />
                                                    <h6>
                                                        <a href="#">Ana Rosie</a>
                                                    </h6>
                                                    <p className="font-xxs">Since 2008</p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Great low price and works well.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            <a href="#" className="text-brand btn-reply">
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-4.png" alt="" />
                                                    <h6>
                                                        <a href="#">Steven Keny</a>
                                                    </h6>
                                                    <p className="font-xxs">Since 2010</p>
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Authentic and Beautiful, Love these way more than ever expected They are Great earphones</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            <a href="#" className="text-brand btn-reply">
                                                                Reply
                                                                <i className="fi-rs-arrow-right"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <h4 className="mb-30">Customer reviews</h4>
                                    <div className="d-flex mb-30">
                                        <div className="product-rate d-inline-block mr-15">
                                            <div
                                                className="product-rating"
                                                style={{
                                                    width: "90%"
                                                }}
                                            ></div>
                                        </div>
                                        <h6>4.8 out of 5</h6>
                                    </div>
                                    <div className="progress">
                                        <span>5 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 50%"
                                            }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            50%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>4 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 25%"
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            25%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>3 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 45%"
                                            }}
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            45%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>2 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 65%"
                                            }}
                                            aria-valuenow="65"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            65%
                                        </div>
                                    </div>
                                    <div className="progress mb-30">
                                        <span>1 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: " 85%"
                                            }}
                                            aria-valuenow="85"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            85%
                                        </div>
                                    </div>
                                    <a href="#" className="font-xs text-muted">
                                        How are ratings calculated?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="comment-form">
                            <h4 className="mb-15">Add a review</h4>
                            <div className="product-rate d-inline-block mb-30"></div>
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    <form className="form-contact comment_form" action="#" id="commentForm">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <textarea className="form-control w-100" name="comment" id="comment" cols="30" rows="9" placeholder="Write Comment"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input className="form-control" name="name" id="name" type="text" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <input className="form-control" name="email" id="email" type="email" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input className="form-control" name="website" id="website" type="text" placeholder="Website" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="button button-contactForm">
                                                Submit Review
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
