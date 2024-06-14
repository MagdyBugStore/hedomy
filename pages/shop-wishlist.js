import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import {
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist
} from "../redux/action/wishlistAction";

const Wishlist = ({
    wishlist,
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist,
    addToCart,
}) => {


    const handleCart = (product) => {
        addToCart(product);
        toast("تمت اضافة المنتج إلي السلة");
    };
    return (
        <>
            <Layout parent="الصفحة الرئيسية" sub="المتجر" subChild="قائمة الأماني">
                <section className="mt-50 mb-50" dir="rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                {wishlist.items.length > 0 ? (
                                    <div className="table-responsive shopping-summery">
                                        <table className="table table-wishlist">
                                            <thead>
                                                <tr className="main-heading">
                                                    <th className="custome-checkbox end pr-30" colSpan="2">
                                                        المنتج
                                                    </th>
                                                    <th scope="col">السعر</th>
                                                    <th scope="col">
                                                        حالة المخزون
                                                    </th>
                                                    <th scope="col">الإجراء</th>
                                                    <th scope="col" className="start">
                                                        إزالة
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishlist.items.map(
                                                    (product, i) => (
                                                        <tr className="pt-30" key={i}>
                                                            <td className="image product-thumbnail pt-40">
                                                                <img
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .img
                                                                    }
                                                                    alt=""
                                                                    className="img-fluid"
                                                                />
                                                            </td>

                                                            <td className="product-des product-name">
                                                                <h6 className="product-name  mb-10">
                                                                    <a>
                                                                        {
                                                                            product.title.ar
                                                                        }
                                                                    </a>
                                                                </h6>
                                                                <div className="product-rate-cover">
                                                                    <div className="product-rate d-inline-block">
                                                                        <div
                                                                            className="product-rating"
                                                                            style={{
                                                                                width: "80%",
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <span className="font-small ml-5 text-muted">
                                                                        {" "}
                                                                        (4.0)
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td
                                                                className="price"
                                                                data-title="السعر"
                                                            >
                                                                <h3 className="text-brand">
                                                                    {product.price} ج.م
                                                                </h3>
                                                            </td>
                                                            <td
                                                                className="text-center detail-info"
                                                                data-title="حالة المخزون"
                                                            >
                                                                {product.stock ===
                                                                    0 ? (
                                                                    <span className="stock-status out-stock mb-0">
                                                                        نفدت الكمية
                                                                    </span>
                                                                ) : (
                                                                    <span className="stock-status in-stock mb-0">
                                                                        متوفر
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                data-title="العربة"
                                                            >
                                                                {product.stock ===
                                                                    0 ? (
                                                                    <button className="btn btn-sm btn-secondary">
                                                                        اتصل بنا
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-sm"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleCart(
                                                                                product
                                                                            )
                                                                        }
                                                                    >
                                                                        إضافة إلى العربة
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="action"
                                                                data-title="إزالة"
                                                            >
                                                                <a
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteFromWishlist(
                                                                            product._id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fi-rs-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-right">
                                            <span
                                                className="clear-btn"
                                                onClick={clearWishlist}
                                            >
                                                مسح الكل
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <h4 className="mb-0">لا توجد منتجات</h4>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

        </>
    );
};

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    closeWishlistModal,
    deleteFromWishlist,
    clearWishlist,
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
