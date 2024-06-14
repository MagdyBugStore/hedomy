import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";
import {Categories , CategoriesHeader} from '../../../redux/stores/categories';

const Tags = ({ updateProductFilters }) => {
    const [Tags, setTags] = useState([]);
    const [selectedTags, setselectedTags] = useState([]);
    const [active, setActive] = useState(0);
    const [lastcategory, setLastcategory] = useState("");

    useEffect(() => {
        const filters = {
            tags: selectedTags,
        };

        updateProductFilters(filters);
    }, [selectedTags]);

    const handleClick = (i, target) => {
        setselectedTags(target);
        setActive(active === i ? 0 : i);
    };
    useSelector(state => {
        if(lastcategory != state.productFilters.category)
        {
            setTags(Categories(state.productFilters.category))
            setLastcategory(state.productFilters.category)
        }
    });
        return (
        <>
            <ul className="tags-list">
                {Tags.map((tag, i) => (
                    <li dir="ltr" className="hover-up" onClick={() => handleClick(i, tag)} key={i}>
                        <a
                            className={
                                active === i
                                    ? "cat-item text-brand-2"
                                    : "cat-item text-brand"
                            }
                        >
                            <i onClick={() => alert('thanks')} className="fi-rs-cross mr-10"></i>
                            {i === 0 ? "الكل" : `${tag}`}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};

const mapDispatchToProps = {
    updateProductFilters,
};



export default connect(null, mapDispatchToProps)(Tags);
