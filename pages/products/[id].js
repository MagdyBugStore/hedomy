import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/ecommerce/ProductDetails";
import Layout from '../../components/layout/Layout';
import { ProductsFromUrl } from "../../redux/stores/apis";
import { useRouter } from "next/router";
import { GetProduct } from "../../redux/action/apis/products/getOne";
import { connect } from "react-redux";


const products = ({ GetProduct, getProductRespond }) => {
    let Router = useRouter()

    useEffect(() => {
        if (Router.query.id)
            GetProduct(Router.query.id)
    }, [Router.query.id]);

    


    return (
        <>
        {getProductRespond &&   
            <Layout parent="الرئيسية" sub="المتجر" subChild={getProductRespond.name_ar || getProductRespond.name_en}>
                <div className="container">
                    <ProductDetails product={getProductRespond} />
                </div>
            </Layout>}

        </>
    );

}

const mapStateToProps = (state) => ({
    getProductRespond: state.api.GetProduct
});

const mapDidpatchToProps = {
    GetProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(products);
