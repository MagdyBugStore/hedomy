import Link from "next/link";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
const CompareTable = ({ data, features, deleteFromCompare, addToCart }) => {



    const handleCart = (product) => {
        addToCart(product);
        toast("تمت اضافة المنتج إلي السلة");
    };
    return (
        <table className="table text-center" dir="rtl">
            <tbody>
                {features.map((feature) => (
                    <tr>
                        <th
                            className="text-muted font-md fw-600"
                            style={{ textTransform: "capitalize" }}
                        >
                            {feature}
                        </th>
                        {data.map((product) =>
                            feature == "معاينة" ? (
                                <td className="row_img">
                                    <img src={product.images[0].img} />
                                </td>
                            ) : feature == "الاسم" ? (
                                <td className="product_name">
                                    <h5>
                                        <a href="#">{product.title.ar}</a>
                                    </h5>
                                </td>
                            ) : feature == "السعر" ? (
                                <td className="product_price">
                                    <span className="price">{product.price} ج.م </span>
                                </td>
                            ) : feature == "التقييم" ? (
                                <td>
                                    <div className="rating_wrap">
                                        {product.review >= 0 && (
                                            <>
                                                <div className="product-rate d-inline-block">
                                                    <div
                                                        className="product-rating"
                                                        style={{
                                                            width: `ج.م{product.ratingScore}%`,
                                                        }}
                                                    ></div>
                                                </div>

                                                <span className="rating_num">
                                                    ({product.review})
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </td>
                            ) : feature == "الوصف" ? (
                                <td className="row_text font-xs">
                                    { product.desc &&
                                    <p>{product.desc.ar}</p>
                                    }
                                </td>
                            ) : feature == "المخزون" ? (
                                <td className="row_stock">
                                    {product.stock >= 0 ? (
                                        <span>متوفر</span>
                                    ) : (
                                        <span className="text-danger font-weight-bold">
                                            نفذت الكمية
                                        </span>
                                    )}
                                </td>
                            ) : feature == "الوزن" ? (
                                <td className="row_weight">
                                    {product.weight} جرام
                                </td>
                            ) : feature == "الأبعاد" ? (
                                <td className="row_dimensions">غير متاح</td>
                            ) 
                            : feature == "شراء" ? (
                                <td className="row_btn">
                                    {product.stock >= 0 ? (
                                        <button
                                            className="btn  btn-sm"
                                            onClick={(e) => handleCart(product)}
                                        >
                                            <i className="fi-rs-shopping-bag ml-5"></i>
                                            إضافة إلى العربة
                                        </button>
                                    ) : (
                                        <Link href="/contact">
                                            <button className="btn  btn-sm btn-secondary">
                                                <i className="fi-rs-headset ml-5"></i>
                                                اتصل بنا
                                            </button>
                                        </Link>

                                    )}
                                </td>
                            )
                             : feature == " " ? (
                                <td className="row_remove">
                                    <a
                                        onClick={() =>
                                            deleteFromCompare(product._id)
                                        }
                                    >
                                        <i className="fi-rs-trash ml-5"></i>
                                        <span>إزالة</span>
                                    </a>
                                </td>
                            ) : null
                        )}
                    </tr>

                ))}
            </tbody>
        </table>
    );
};

const mapDispatchToProps = {
    addToCart,
};

export default connect(null, mapDispatchToProps)(CompareTable);
