import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../../redux/action/productFiltersAction";

const SizeFilter = ({ updateProductFilters }) => {
    // console.log(updateProductFilters);

    const sizes = [
        { value: "صغير" },
        { value: "متوسط" },
        { value: "كبير" },
        { value: "كبير جداً" },
    ];

    const [selectedSizes, setSizes] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const filters = {
            sizes: selectedSizes,
        };

        updateProductFilters(filters);
    }, [selectedSizes]);

    const handleClick = (i, target) => {
        setSizes(target);
        setActive(active === i ? 0 : i);
    };

    return (
        <>
            <ul className="list-filter size-filter font-small">
                {sizes.map((tag, i) => (
                    <li
                        className={active === i ? "active" : ""}
                        onClick={() => handleClick(i, tag.value)}
                        key={i}
                    >
                        <a>
                            {i === 0 ? "الكل" : `${tag.value}`}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
};



const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(null, mapDidpatchToProps)(SizeFilter);
