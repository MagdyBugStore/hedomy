import React, { useEffect, useState } from "react";
import Cat1Tab from '../elements/FeaturedTab';
import { useMyProducts } from "../../redux/stores/apis";
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
