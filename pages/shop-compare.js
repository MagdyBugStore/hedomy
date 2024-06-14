import React from "react";
import { connect } from "react-redux";
import CompareTable from "../components/ecommerce/CompareTable";
import Layout from "../components/layout/Layout";
import { clearCompare, deleteFromCompare } from "../redux/action/compareAction";

const Compare = ({ compare, clearCompare, deleteFromCompare }) => {
    return (
        <>
            <Layout parent="الصفحة الرئيسية" sub="المتجر" subChild="المقارنة">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <h1 className="heading-2 mb-10">
                                    مقارنة المنتجات
                                </h1>
                                <h6 className="text-body mb-40">
                                    هناك <span className="text-brand">3</span> منتجات للمقارنة
                                </h6>
                                <div className="table-responsive">
                                    {compare.items.length > 0 ? (
                                        <>
                                            <CompareTable
                                                data={compare.items}
                                                features={[
                                                    "معاينة",
                                                    "الاسم",
                                                    "السعر",
                                                    "التقييم",
                                                    "الوصف",
                                                    // "اللون",
                                                    // "الأحجام",
                                                    "المخزون",
                                                    "الوزن",
                                                    "الأبعاد",
                                                    "شراء",
                                                    " ",
                                                ]}
                                                deleteFromCompare={deleteFromCompare}
                                            />
                                            <div className="text-right">
                                                <span
                                                    className="clear-btn cursor-pointer"
                                                    onClick={clearCompare}
                                                >
                                                    مسح الكل
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <h4>لا توجد منتجات</h4>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

        </>
    );
};

const mapStateToProps = (state) => ({
    compare: state.compare,
});

const mapDispatchToProps = {
    clearCompare,
    deleteFromCompare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
