import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShowSelect from "../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../components/ecommerce/Filter/SortSelect";
import Breadcrumb2 from "../components/layout/Breadcrumb2";
import CategoryProduct from "./../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "./../components/ecommerce/Filter/PriceRangeSlider";
import SizeFilter from "./../components/ecommerce/Filter/SizeFilter";
import VendorFilter from "./../components/ecommerce/Filter/VendorFilter";
import Pagination from "./../components/ecommerce/Pagination";
import QuickView from "./../components/ecommerce/QuickView";
// import SingleProduct from "./../components/ecommerce/SingleProduct";
import Layout from "./../components/layout/Layout";
import { GetProducts } from "../redux/action/apis/products/get";
import SingleProduct from "../components/ecommerce/SingleProduct";

const Products = ({ getProductsRespond, GetProducts }) => {

    const dir = 'rtl'

    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit = 10;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [currentPage, setCurrentPage] = useState(1);

    

    useEffect(() => {
        GetProducts({ limit: limit, page: currentPage, q: searchTerm });
    }, [limit, currentPage, searchTerm]);

    const next = () => {
        setCurrentPage((page) => page + 1);
    };

    const prev = () => {
        setCurrentPage((page) => page - 1);
    };

    const handleActive = (item) => {
        setCurrentPage(item);
    };

    const selectChange = (e) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    };
    const getPaginationGroup = () => {
        const totalPages = getProductsRespond.totalPages;

        if (totalPages <= 1) return [1]; // If there is only one page

        if (currentPage === 1) {
            // If the current page is the first page
            return [1, 2, 3].filter(page => page <= totalPages);
        } else if (currentPage === totalPages) {
            // If the current page is the last page
            return [totalPages - 2, totalPages - 1, totalPages].filter(page => page > 0);
        } else {
            // If the current page is a middle page
            return [currentPage - 1, currentPage, currentPage + 1].filter(page => page <= totalPages && page > 0);
        }
    };
return (
        <>
            <Layout noBreadcrumb="d-none">
                <Breadcrumb2 />
                <section className="mt-50 mb-50" dir={dir}>
                    <div className="container mb-30">
                        {getProductsRespond &&
                            <div className="row flex-row-reverse">
                                <div className="col-lg-4-5">
                                    <div className="shop-product-fillter">
                                        <div className="totall-product">
                                            <p>
                                                وجدنا
                                                <strong className="text-brand">
                                                    {getProductsRespond.totalProducts}
                                                </strong>
                                                منتجات لك!
                                            </p>
                                        </div>
                                        <div className="sort-by-product-area">
                                            <div className="sort-by-cover mr-10">
                                                <ShowSelect
                                                    selectChange={selectChange}
                                                    showLimit={limit}
                                                />
                                            </div>
                                            <div className="sort-by-cover">
                                                <SortSelect />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row product-grid">
                                        {getProductsRespond.products.length === 0 && (
                                            <h3>لم يتم العثور على منتجات</h3>
                                        )}
                                        {getProductsRespond.products.map((item, i) => (
                                            <div
                                                className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                                key={i}
                                            >
                                                <SingleProduct product={item} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                        <nav aria-label="Page navigation example">
                                            <Pagination
                                                getPaginationGroup={getPaginationGroup()}
                                                currentPage={currentPage}
                                                pages={getProductsRespond.totalPages}
                                                next={next}
                                                prev={prev}
                                                handleActive={handleActive}
                                            />
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                    <div className="sidebar-widget widget-category-2 mb-30">
                                        <h5 className="section-title style-1 mb-30">
                                            التصنيفات
                                        </h5>
                                        <CategoryProduct />
                                    </div>

                                    <div className="sidebar-widget price_range range mb-30">
                                        <h5 className="section-title style-1 mb-30">تصفية حسب السعر</h5>

                                        <div className="price-filter">
                                            <div className="price-filter-inner">
                                                <br />
                                                <PriceRangeSlider />
                                                <br />
                                            </div>
                                        </div>

                                        <div className="list-group">
                                            <div className="list-group-item mb-10 mt-10">
                                                <label className="fw-900">
                                                    اللون
                                                </label>
                                                <VendorFilter />
                                                <label className="fw-900 mt-15">
                                                    الحجم
                                                </label>
                                                <SizeFilter />
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                    <side />
                                </div>
                            </div>}

                    </div>
                </section>

                <QuickView />
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    getProductsRespond: state.api.GetProducts
});

const mapDidpatchToProps = {
    // openCart,
    GetProducts,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
