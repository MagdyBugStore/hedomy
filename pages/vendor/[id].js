import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../../components/ecommerce/Filter/PriceRangeSlider";
import ShowSelect from "../../components/ecommerce/Filter/ShowSelect";
import SizeFilter from "../../components/ecommerce/Filter/SizeFilter";
import SortSelect from "../../components/ecommerce/Filter/SortSelect";
import VendorFilter from "../../components/ecommerce/Filter/VendorFilter";
import Pagination from "../../components/ecommerce/Pagination";
import QuickView from "../../components/ecommerce/QuickView";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import Layout from "../../components/layout/Layout";
import { fetchProduct } from "../../redux/action/product";
import data from "../../util/storeData";
import Side from "../../components/ecommerce/right_side";

const Products = ({ products, productFilters, fetchProduct }) => {
    console.log(products);

    let Router = useRouter(),
        searchTerm = Router.query.search,
        showLimit = 12,
        showPagination = 4;

    let [pagination, setPagination] = useState([]);
    let [limit, setLimit] = useState(showLimit);
    let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
    let [currentPage, setCurrentPage] = useState(1);

    const [singleStore, setSingleStore] = useState(null);


    const { id } = Router.query;

    useEffect(() => {
        fetchProduct(searchTerm, "/static/product.json", productFilters);
        setSingleStore(data.find((data) => data.id == id));
        cratePagination();
    }, [productFilters, limit, pages, products.items.length, id]);

    const cratePagination = () => {
        // set pagination
        let arr = new Array(Math.ceil(products.items.length / limit))
            .fill()
            .map((_, idx) => idx + 1);

        setPagination(arr);
        setPages(Math.ceil(products.items.length / limit));
    };

    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
    const getPaginatedProducts = products.items.slice(startIndex, endIndex);

    let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
    let end = start + showPagination;
    const getPaginationGroup = pagination.slice(start, end);

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
        setPages(Math.ceil(products.items.length / Number(e.target.value)));
    };
    return (
        <>
            <Layout parent="Home" sub="Store  " subChild="About">
                <section className="mt-50 mb-50" dir="rtl">
                    <div className="container mb-30">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-4-5">
                                <div className="shop-product-fillter">
                                    <div className="totall-product">
                                        <p>
                                            لقد وجدنا
                                            <strong className="text-brand">
                                                {products.items.length}
                                            </strong>
                                            منتجات لك!
                                        </p>
                                    </div>
                                    <div className="sort-by-product-area">
                                        <div className="sort-by-cover mr-10">
                                            <ShowSelect selectChange={selectChange} showLimit={showLimit} />
                                        </div>
                                        <div className="sort-by-cover">
                                            <SortSelect />
                                        </div>
                                    </div>
                                </div>
                                <div className="row product-grid">
                                    {getPaginatedProducts.length === 0 && (
                                        <h3>لم يتم العثور على منتجات</h3>
                                    )}

                                    {getPaginatedProducts.map((item, i) => (
                                        <div
                                            className="col-lg-1-5 col-md-4 col-12 col-sm-6"
                                            key={i}
                                        >
                                            <SingleProduct product={item} />
                                            {/* <SingleProductList product={item}/> */}
                                        </div>
                                    ))}
                                </div>

                                <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                                    <nav aria-label="ملاحة الصفحات">
                                        <Pagination
                                            getPaginationGroup={
                                                getPaginationGroup
                                            }
                                            currentPage={currentPage}
                                            pages={pages}
                                            next={next}
                                            prev={prev}
                                            handleActive={handleActive}
                                        />
                                    </nav>
                                </div>
                            </div>

                            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
                                {singleStore && (
                                    <>
                                        <div className="sidebar-widget widget-store-info mb-30 bg-3 border-0">
                                            <div className="vendor-logo mb-30">
                                                <img src={`/assets/imgs/vendor/${singleStore.img}`} alt="" />
                                            </div>
                                            <div className="vendor-info">
                                                <div className="product-category">
                                                    <span className="text-muted">منذ {singleStore.joinYear}</span>
                                                </div>
                                                <h4 className="mb-5"><Link href="/vendor/1"><a className="text-heading">{singleStore.title}</a></Link></h4>

                                                <div className="product-rate-cover mb-15">
                                                    <div className="product-rate d-inline-block">
                                                        <div className="product-rating" style={{ "width": "87%" }} ></div>
                                                    </div>
                                                    <span className="ont-small ml-5 text-muted"> {singleStore.rating.toFixed(1)}</span>
                                                </div>

                                                <div className="vendor-des mb-30">
                                                    {singleStore.desc.split('\n').map((line, index) => (
                                                        <>
                                                            <p className="ont-sm text-heading mb-30" key={index}>
                                                                {line}
                                                            </p>
                                                            
                                                        </>

                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="sidebar-widget widget-category-2 mb-30">
                                    <h5 className="section-title style-1 mb-30">
                                        الفئة
                                    </h5>
                                    <CategoryProduct />
                                </div>

                                <div className="sidebar-widget price_range range mb-30">
                                    <h5 className="section-title style-1 mb-30">ملء حسب السعر</h5>

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

                                <Side />

                            </div>
                        </div>
                    </div>
                </section>
                {/* <WishlistModal /> */}
                {/* <CompareModal /> */}
                {/* <CartSidebar /> */}
                <QuickView />
                {/* <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <Search />
                        </div>
                        <div className="col-xl-6">
                            <SideBarIcons />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-xl-6">
                            <CategoryProduct />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3">
                            
                        </div>
                        <div className="col-md-9">
                            

                            

                            
                        </div>
                    </div>
                </div> */}
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
    productFilters: state.productFilters,
});

const mapDidpatchToProps = {
    // openCart,
    fetchProduct,
    // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
