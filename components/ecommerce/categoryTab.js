import React, { useEffect, useState } from "react";
import { server } from "../../config/index";
import Cat1Tab from '../elements/FeaturedTab';
import Cat2Tab from '../elements/NewArrivalTab';
import Cat3Tab from '../elements/TrendingTab';
import Link from "next/link"
import { useMyProducts } from "../../redux/stores/apis";
import { GET_All_PRODUCT } from "../../redux/_graphql";
import { storage } from '../../util/localStorage';

function CategoryTab() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState("1");

    var gender = products.length > 0 ? products[0].gender : -1

    useEffect(() => {

        async function fetchData() {
            try {
                const { products } = await useMyProducts({});
                setProducts(products)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [storage.gettypeid() != gender]);

    if (loading)
        return (
            <>
                <div>
                    loading....
                </div>
            </>
        )
    return (
        <>
            <div className="section-title style-2 wow animate__animated animate__fadeIn" dir="rtl">
                <h3>المنتجات الشائعة</h3>
            </div>

            <div className="tab-content wow fadeIn animated">
                <div
                    className={
                        active === "1"
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                    }
                >
                    <div className="product-grid-4 row flex-row-reverse">
                        <Cat1Tab products={products} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default CategoryTab;
