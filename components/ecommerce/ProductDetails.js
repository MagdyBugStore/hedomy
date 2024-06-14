import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";

const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
}) => {
    const [quantity, setQuantity] = useState(product.group);


    const handleCart = (product) => {
        addToCart(product);
        toast("تمت اضافة المنتج إلي السلة");
    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };

    const inCart = cartItems.find((cartItem) => cartItem.id === product._id);
    return (
        <>
            <section className="mt-50 mb-50" dir="rtl">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50 mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>

                                            <div className="product-image-slider">
                                                <ThumbSlider product={product} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info pr-30 pl-30">

                                            {
                                                product.group > 1 &&
                                                <span className="stock-status out-stock"> البيع ب {product.group} قطعه </span>
                                            }
                                            
                                            <h2 className="title-detail">{product.title.ar}</h2>
                                            <div className="product-detail-rating">
                                                <div className="product-rate-cover text-end">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ width: "40%" }}></div>
                                                    </div>
                                                    <span className="font-small ml-5 text-muted"> (32 تقييم)</span>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price text-brand">{product.price} ج.م </span>
                                                    {product.discount.percentage &&
                                                    <span>
                                                        <span className="save-price font-md color3 mr-15">{product.discount.percentage}% تخفيض</span>
                                                        <span className="old-price font-md ml-15">{product.oldPrice ? `ج.م ${product.oldPrice}` : null}</span>
                                                    </span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="short-desc mb-30">
                                                <p className="font-lg">{product.desc.ar}</p>
                                            </div>
                                            <div className="attr-detail attr-color mb-15">
                                                <strong className="ml-10">الالوان</strong>
                                                <ul className="list-filter color-filter">
                                                    {product.variations.map((clr, i) => (
                                                        <li key={i}>
                                                            <a href="#">
                                                                <span className={`product-color-${clr}`}></span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="attr-detail attr-size">
                                                <strong className="ml-10">اندازه</strong>
                                                <ul className="list-filter size-filter font-small">
                                                    
                                                {product.sizes.split('-').map((size, index) => (
                                                    <li key={index} className={index === 0 ? 'active' : ''}>
                                                        <a>{size}</a>
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                <div className="detail-qty border radius">
                                                    <a onClick={(e) => (!inCart ? setQuantity(quantity > product.group ? quantity - product.group : product.group) : decreaseQuantity(product?.id))} className="qty-down">
                                                        <i className="fi-rs-angle-small-down"></i>
                                                    </a>
                                                    <span className="qty-val">{inCart?.quantity || quantity}</span>
                                                    <a onClick={() => (!inCart ? setQuantity(quantity + product.group) : increaseQuantity(product._id))} className="qty-up">
                                                        <i className="fi-rs-angle-small-up"></i>
                                                    </a>
                                                </div>
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity: quantity || 1
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        اضافة الي العربة
                                                    </button>
                                                    <a aria-label="افزودن به لیست علاقه‌مندی‌ها" className="action-btn hover-up" onClick={(e) => handleWishlist(product)}>
                                                        <i className="fi-rs-heart"></i>
                                                    </a>
                                                    <a aria-label="مقایسه" className="action-btn hover-up" onClick={(e) => handleCompare(product)}>
                                                        <i className="fi-rs-shuffle"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                    SKU :
                                                    <a href="#">FWM15VKT</a>
                                                </li>
                                                <li className="mb-5">
                                                    برچسب‌ها :
                                                    <a href="#" rel="tag" className="me-1">
                                                        لباس
                                                    </a>
                                                </li>
                                                <li>
                                                    موجودی :
                                                    <span className="in-stock text-success mr-5">{product.stock} عدد موجود در انبار</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>



                                {quickView ? null : (
                                    <>
                                        <ProductTab />
                                        <div className="row mt-60">
                                            <div className="col-12">
                                                <h3 className="section-title style-1 mb-30">منتجات ذات صلة</h3>
                                            </div>
                                            <div className="col-12">
                                                <div className="row related-products position-relative">
                                                    <RelatedSlider />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
