import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { ProductsFromUrl } from "../../redux/stores/apis";

export default function products() {

    const [product, setproduct] = useState(null);
    useEffect(() => {

        async function fetchData() {
            const { products } = await ProductsFromUrl({ slug: decodeURIComponent(window.location.pathname.replace("/products/", "")) })
            setproduct(products[0])
        }
        if (typeof window !== 'undefined') {
            fetchData();
        }
    }, []);



    return (
        <>
            {
                product &&
                <Layout parent="الرئيسية" sub="المتجر" subChild={product.title.ar}>
                    <div className="container">
                        <ProductDetails product={product} />
                    </div>
                </Layout>
            }
        </>
    );

}