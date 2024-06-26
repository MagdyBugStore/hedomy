import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const SortSelect = ({ updateProductFilters }) => {
    const Router = useRouter();
    const searchTerm = Router.query.search;

    const [featured, setFeatured] = useState("");

    useEffect(() => {
        const filters = {
            featured,
        };

        updateProductFilters(filters);
    }, [searchTerm, featured]);

    const seleceOption = (e) => {
        setFeatured(e.target.value);
    };

    return (
        <>
            <div className="sort-by-product-wrap">
                <div className="sort-by">
                    <strong>
                        <i className="fi-rs-apps-sort"></i>
                        ترتيب حسب :
                    </strong>
                </div>
                <div className="sort-by-dropdown-wrap custom-select">
                    <select onChange={(e) => seleceOption(e)}>
                        <option value="">الافتراضي</option>
                        <option value="featured">مميز</option>
                        <option value="trending">رائج</option>
                        <option value="lowToHigh">من الأدنى إلى الأعلى</option>
                        <option value="highToLow">من الأعلى إلى الأدنى</option>
                    </select>
                </div>
            </div>
        </>

    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(SortSelect);
