

import React, { useEffect, useState } from "react";
import { useMyProducts } from "../../redux/stores/apis";
import {storage} from '../../util/localStorage'

export default function Side() {
    const [products, setProducts] = useState([]);

    const product = async () => {
        const data = await useMyProducts({})
        setProducts(data.products);
    };

    var gender =  products.length > 0 ? products[0].gender :  -1 
    useEffect(() => {
        product();
    }, [ storage.gettypeid() != gender ]);
    return (
    <>
        <div className="sidebar-widget product-sidebar  mb-30 p-30 bg-grey border-radius-10">
            <h5 className="section-title style-1 mb-30">منتجات متميزة</h5>
            <div className="bt-1 border-color-1"></div>

            {
                products && products.length > 0 &&
                products.slice(0, 3).map((product) => (
                    <div key={product._id} className="single-post clearfix">
                        <div className="image">
                            <img src={product.images[0].img} alt="#" />
                        </div>
                        <div className="content pt-10">
                            <h5>
                                <a>{product.title.ar}</a>
                            </h5>
                            <p className="price mb-0 mt-5">
                                {product.price}
                            </p>
                            <div className="product-rate">
                                <div
                                    className="product-rating"
                                    style={{ width: `${product.rating * 16}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
        </div></>
        )
}