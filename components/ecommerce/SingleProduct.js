import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import { StaticDb } from '../../util/localStorage';

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {

    const handleCart = (product) => {
        addToCart(product);
        toast("تمت إضافة المنتج إلى السلة !");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("تمت الإضافة إلى قائمة المقارنة !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("تمت الإضافة إلى قائمة الرغبات !");
    };

    return (
        <>
            {product &&
                <div className="product-cart-wrap mb-30" dir="rtl">
                    <div className="product-img-action-wrap">
                        <div className="product-img product-img-zoom">
                            <Link
                                href={`/products/${product._id}`}
                            >
                                <a>
                                    <img
                                        className="default-img"
                                        src={product.productPhotos?.defaultImages[0]}
                                        alt=""
                                    />
                                    {
                                        product.productPhotos?.defaultImages.length > 0 ?
                                            <img
                                                className="hover-img"
                                                src={product.productPhotos.defaultImages[1]}
                                                alt=""
                                            /> :
                                            <img
                                                className="hover-img"
                                                src={product.productPhotos?.defaultImages[0]}
                                                alt=""
                                            />
                                    }
                                </a>
                            </Link>
                        </div>

                        {/* <div className="outOfStock"> خلصان للاسف </div> : */}
                        <div className="product-action-1">
                            <a
                                aria-label="عرض سريع"
                                className="action-btn hover-up"
                                data-bs-toggle="modal"
                                onClick={(e) => openQuickView(product)}
                            >
                                <i className="fi-rs-eye"></i>
                            </a>
                            <a
                                aria-label="إضافة إلى قائمة الرغبات"
                                className="action-btn hover-up"
                                onClick={(e) => handleWishlist(product)}
                            >
                                <i className="fi-rs-heart"></i>
                            </a>
                            <a
                                aria-label="مقارنة"
                                className="action-btn hover-up"
                                onClick={(e) => handleCompare(product)}
                            >
                                <i className="fi-rs-shuffle"></i>
                            </a>
                        </div>

                        <div className="product-badges product-badges-position product-badges-mrg">
                            {product.trending && <span className="hot">رائج</span>}
                            {product.created && <span className="new">جديد</span>}
                            {product.group > 1 && (
                                <span className="best">البيع {product.group} قطعه</span>
                            )}
                            {product.totalSell > 100 && (
                                <span className="best">أكثر مبيعًا</span>
                            )}
                            {product.discount?.percentage >= 5 && (
                                <span className="sale">
                                    {product.discount.percentage}%
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="product-content-wrap">
                        <div className="product-category">
                            <Link href="/products">
                                <a>{StaticDb.brand(product.brand)}</a>
                            </Link>
                        </div>
                        <h2>
                            <Link
                                href="/products/[slug]"
                                as={`/products/${product._id}`}
                            >
                                <a>{product.name_ar || product.name_en}</a>
                            </Link>
                        </h2>

                        {
                            product.ratingScore &&
                            <div className="product-rate-cover">
                                <div className="product-rate d-inline-block">
                                    <div
                                        className="product-rating"
                                        style={{ width: "80%" }}
                                    ></div>
                                </div>
                                <span className="font-small ml-5 text-muted">
                                    {" "}
                                    ({product.ratingScore})
                                </span>
                            </div>
                        }

                        <div>
                            <span className="font-small text-muted">
                                بواسطة{" "}
                                <Link href="/vendor/1"><a>{product.vendor}</a></Link>
                            </span>
                        </div>

                        <div className="product-card-bottom">
                            <div className="product-price">
                                <span>{product.price} ج.م</span>
                                {product.oldPrice && (
                                    <span className="old-price">
                                        <br />
                                        {product.oldPrice} ج.م
                                    </span>
                                )}
                            </div>
                            <div className="add-cart">
                                <a
                                    className="add"
                                    onClick={(e) => handleCart(product)}
                                >
                                    <i className="fi-rs-shopping-cart mr-5"></i> إضافة
                                </a>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
