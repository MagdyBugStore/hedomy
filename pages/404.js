import Layout from "../components/layout/Layout";
import Link from "next/link"
function Custom404() {
    return (
        <>
            <Layout
                parent="الرئيسية"
                sub="الصفحات"
                subChild="404"
            >
                <main className="main page-404">
                    <div className="page-content pt-150 pb-150">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
                                    <p className="mb-20">
                                        <img
                                            src="assets/imgs/page/page-404.png"
                                            alt=""
                                            className="hover-up"
                                        />
                                    </p>
                                    <h1 className="display-2 mb-30">
                                        الصفحة غير موجودة
                                    </h1>
                                    <p className="font-lg text-grey-700 mb-30">
                                        الرابط الذي قمت بالنقر عليه قد يكون معطلاً أو قد تمت إزالة الصفحة.
                                        <br />
                                        زوروا{" "}
                                        <Link href="/"><a>
                                            {" "}
                                            <span>الصفحة الرئيسية</span>
                                        </a></Link>
                                        أو{" "}
                                        <Link href="/page-contact"><a>
                                            <span>تواصل معنا</span>
                                        </a></Link>
                                        بخصوص المشكلة
                                    </p>
                                    <div className="search-form">
                                        <form action="#">
                                            <input
                                                type="text"
                                                placeholder="البحث..."
                                            />
                                            <button type="submit">
                                                <i className="fi-rs-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <Link href="/"><a
                                        className="btn btn-default submit-auto-width font-xs hover-up mt-30"

                                    >
                                        <i className="fi-rs-home mr-5"></i> العودة إلى
                                        الصفحة الرئيسية
                                    </a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>

        </>
    );
}

export default Custom404;
